"""
routes.py — Flask API routes for MeetingMind.

Endpoints:
    GET  /          — project info
    GET  /health    — backend + model status
    POST /upload    — save uploaded audio file, return filename
    POST /transcribe — transcribe audio → text (faster-whisper, CPU)
    POST /analyze   — analyze transcript → summary/attendees/decisions/actions
    POST /process   — single-call: upload + transcribe + analyze in one request
"""

import os
import uuid

from flask import Blueprint, jsonify, request

from analyzer import analyze

api = Blueprint("api", __name__)

# ── Upload directory ──────────────────────────────────────────────────────
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".m4a", ".ogg", ".flac", ".mp4", ".webm"}
MAX_FILE_BYTES = 500 * 1024 * 1024  # 500 MB

# ── Lazy transcriber import ───────────────────────────────────────────────
# We import the transcriber lazily so the server starts even if the Whisper
# model has not been downloaded yet (setup_models.py not yet run).
_transcriber = None


def _get_transcriber():
    global _transcriber
    if _transcriber is None:
        try:
            import transcriber as t

            _transcriber = t
        except Exception as exc:
            return None, str(exc)
    return _transcriber, None


# ── Helpers ───────────────────────────────────────────────────────────────
def _ext(filename: str) -> str:
    return os.path.splitext(filename)[1].lower()


def _err(msg: str, code: int = 400):
    return jsonify({"error": msg}), code


# ── Routes ────────────────────────────────────────────────────────────────


@api.route("/", methods=["GET"])
def home():
    return jsonify(
        {
            "project": "MeetingMind",
            "version": "1.0.0",
            "status": "running",
            "mode": "offline CPU AI",
            "runtime": "faster-whisper + sumy LSA",
        }
    )


@api.route("/health", methods=["GET"])
def health():
    t, err = _get_transcriber()
    model_ready = t is not None
    return jsonify(
        {
            "status": "healthy",
            "model_ready": model_ready,
            "model_error": err,
            "upload_dir": UPLOAD_DIR,
        }
    )


@api.route("/upload", methods=["POST"])
def upload():
    """
    Accept an audio file upload.
    Returns: { "filename": "<uuid>.ext", "size_bytes": int }
    """
    if "file" not in request.files:
        return _err("No file in request. Send multipart/form-data with key 'file'.")

    f = request.files["file"]
    if not f.filename:
        return _err("Empty filename.")

    ext = _ext(f.filename)
    if ext not in ALLOWED_EXTENSIONS:
        return _err(
            f"Unsupported file type {ext!r}. " f"Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
        )

    # Read into memory to check size before writing to disk
    data = f.read()
    if len(data) > MAX_FILE_BYTES:
        return _err(f"File too large ({len(data)} bytes). Max: {MAX_FILE_BYTES}.")

    saved_name = f"{uuid.uuid4().hex}{ext}"
    saved_path = os.path.join(UPLOAD_DIR, saved_name)
    with open(saved_path, "wb") as out:
        out.write(data)

    return jsonify({"filename": saved_name, "size_bytes": len(data)})


@api.route("/transcribe", methods=["POST"])
def transcribe():
    """
    Transcribe an uploaded audio file.
    Body: { "filename": "<uuid>.ext" }
    Returns: { "transcript": str, "language": str, "segments": [...] }
    """
    body = request.get_json(silent=True) or {}
    filename = body.get("filename", "").strip()
    if not filename:
        return _err("Missing 'filename' in JSON body.")

    audio_path = os.path.join(UPLOAD_DIR, os.path.basename(filename))
    if not os.path.isfile(audio_path):
        return _err(f"File not found: {filename!r}. Upload it first via POST /upload.", 404)

    t, err = _get_transcriber()
    if t is None:
        return _err(
            f"Whisper model not ready: {err}. "
            "Run `python setup_models.py` to download the model.",
            503,
        )

    try:
        result = t.transcribe(audio_path)
    except Exception as exc:
        return _err(f"Transcription failed: {exc}", 500)

    return jsonify(
        {
            "filename": filename,
            "transcript": result["text"],
            "language": result["language"],
            "segments": result["segments"],
        }
    )


@api.route("/analyze", methods=["POST"])
def analyze_route():
    """
    Analyze a transcript text offline (LSA summarization + rule-based NLP).
    Body: { "transcript": str }
    Returns: { "summary", "attendees", "decisions", "action_items" }
    """
    body = request.get_json(silent=True) or {}
    transcript = body.get("transcript", "").strip()
    if not transcript:
        return _err("Missing or empty 'transcript' in JSON body.")

    try:
        result = analyze(transcript)
    except Exception as exc:
        return _err(f"Analysis failed: {exc}", 500)

    return jsonify(result)


@api.route("/process", methods=["POST"])
def process():
    """
    All-in-one endpoint: upload + transcribe + analyze in a single request.
    Body: multipart/form-data with key 'file'.
    Returns the full meeting result object.
    """
    if "file" not in request.files:
        return _err("No file in request. Send multipart/form-data with key 'file'.")

    f = request.files["file"]
    if not f.filename:
        return _err("Empty filename.")

    ext = _ext(f.filename)
    if ext not in ALLOWED_EXTENSIONS:
        return _err(f"Unsupported file type {ext!r}.")

    data = f.read()
    if len(data) > MAX_FILE_BYTES:
        return _err(f"File too large ({len(data)} bytes).")

    # Save
    saved_name = f"{uuid.uuid4().hex}{ext}"
    saved_path = os.path.join(UPLOAD_DIR, saved_name)
    with open(saved_path, "wb") as out:
        out.write(data)

    # Transcribe
    t, err = _get_transcriber()
    if t is None:
        return _err(f"Whisper model not ready: {err}. Run setup_models.py first.", 503)

    try:
        transcription = t.transcribe(saved_path)
    except Exception as exc:
        return _err(f"Transcription failed: {exc}", 500)

    transcript_text = transcription["text"]

    # Analyze
    try:
        analysis = analyze(transcript_text)
    except Exception as exc:
        return _err(f"Analysis failed: {exc}", 500)

    return jsonify(
        {
            "filename": f.filename,
            "transcript": transcript_text,
            "language": transcription["language"],
            "segments": transcription["segments"],
            "summary": analysis["summary"],
            "attendees": analysis["attendees"],
            "decisions": analysis["decisions"],
            "action_items": analysis["action_items"],
        }
    )