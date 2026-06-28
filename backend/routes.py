from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import os

api = Blueprint("api", __name__)

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
        "status": "healthy"
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
            "message": "Upload Successful",
            "filename": filename,
            "path": filepath
        })

    return jsonify({"error": "Only .wav and .mp3 files are allowed"}), 400