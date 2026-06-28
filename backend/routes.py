from flask import Blueprint, jsonify

api = Blueprint("api", __name__)

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