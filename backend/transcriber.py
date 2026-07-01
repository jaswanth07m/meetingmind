"""
transcriber.py — Offline speech-to-text using faster-whisper (CPU).

Runtime: CPU-only (int8 quantisation, no CUDA).
Model:   Whisper tiny (~75 MB), pre-downloaded to models/whisper-tiny/.

The model is loaded once at module import and reused across requests.
If the model directory is missing, a clear error is raised on startup
directing the user to run setup_models.py first.
"""

import os

from faster_whisper import WhisperModel

# ── Model path ────────────────────────────────────────────────────────────
_MODEL_DIR = os.path.join(os.path.dirname(__file__), "models", "whisper-tiny")
_MODEL_SIZE = "tiny"  # fallback name if local dir not found


def _load_model() -> WhisperModel:
    """
    Load Whisper model strictly from local disk (offline).
    Raises FileNotFoundError with setup instructions if model not cached.
    """
    if os.path.isdir(_MODEL_DIR):
        # ── Fully offline: load from pre-downloaded local directory ──────
        return WhisperModel(
            "small",
            device="cpu",
            compute_type="int8",
            local_files_only=True,
        )

    # ── Model not cached — try HuggingFace (first-run with internet) ──────
    print(
        "[transcriber] Model not found locally. "
        "Run `python setup_models.py` to download it first."
    )
    print("[transcriber] Attempting online download (requires internet)...")
    try:
        return WhisperModel(
            "small",
            device="cpu",
            compute_type="int8",
        )
    except Exception as exc:
        raise FileNotFoundError(
            f"Whisper model not found at {_MODEL_DIR!r} and could not be "
            "downloaded. Run `python setup_models.py` once with internet "
            "access, then restart the server."
        ) from exc


# Load once at import time so the first request is not slow
print("[transcriber] Loading Whisper model on CPU...")
_model = _load_model()
print("[transcriber] Whisper model ready.")


def transcribe(audio_path: str) -> dict:
    """
    Transcribe an audio file to text using Whisper on CPU.

    Args:
        audio_path: Absolute path to a .wav or .mp3 file.

    Returns:
        {
            "text":     str   — full transcript
            "language": str   — detected language code (e.g. "en")
            "segments": [     — word-level segments
                {"start": float, "end": float, "text": str}
            ]
        }

    Raises:
        FileNotFoundError: if audio_path does not exist.
        RuntimeError:      if transcription fails.
    """
    if not os.path.isfile(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path!r}")

    segments_iter, info = _model.transcribe(
        audio_path,
        beam_size=5,
        best_of=5,
        language=None,  # auto-detect language
        vad_filter=True,  # skip silence — faster + cleaner output
        vad_parameters={
            "min_silence_duration_ms": 500,
        },
        condition_on_previous_text=True
    )

    segments = []
    full_text_parts = []

    for seg in segments_iter:
        text = seg.text.strip()
        if text:
            segments.append({"start": round(seg.start, 2), "end": round(seg.end, 2), "text": text})
            full_text_parts.append(text)

    return {
        "text": " ".join(full_text_parts),
        "language": info.language,
        "segments": segments,
    }