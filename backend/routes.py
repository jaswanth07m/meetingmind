from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import os

api = Blueprint("api", __name__, url_prefix="/api")

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"wav", "mp3","mpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@api.route("/", methods=["GET"])
def home():
    return jsonify({
        "project": "MeetingMind",
        "status": "Running",
        "mode": "Offline CPU AI"
    })


@api.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "backend": "connected"
    })


@api.route("/upload", methods=["POST"])
def upload_audio():

    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["audio"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)

        filepath = os.path.join(UPLOAD_FOLDER, filename)

        file.save(filepath)

        return jsonify({
            "success": True,
            "filename": filename,
            "filepath": filepath
        })

    return jsonify({"error": "Only .wav and .mp3 files are allowed"}), 400
@api.route("/transcribe", methods=["POST"])
def transcribe():

    data = request.get_json()

    filename = data.get("filename", "")

    return jsonify({
        "status": "success",
        "transcript":
        f"""
Meeting recording processed successfully.

Filename: {filename}

Discussion:
The frontend implementation has been completed.
Backend APIs are under development.
The team plans to integrate whisper.cpp for speech recognition.
llama.cpp will be used for meeting summarization.
GitLab CI/CD is the next milestone.
"""
    })

@api.route("/analyze", methods=["POST"])
def analyze():

    return jsonify({

        "summary":
        "The meeting reviewed the current MeetingMind implementation. The frontend is complete and backend AI integration is in progress.",

        "attendees": [
            "Jaswanth",
            "Manohar"
        ],

        "decisions": [
            "Use whisper.cpp for transcription",
            "Use llama.cpp for summarization",
            "Deploy with offline CPU inference"
        ],

        "action_items": [
            "Finish backend endpoints",
            "Configure GitLab CI/CD",
            "Test offline demo"
        ],

        "json": {
            "project": "MeetingMind",
            "status": "Completed Demo",
            "offline": True
        }

    })

