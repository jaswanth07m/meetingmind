"""
app.py — MeetingMind Flask application.

CPU-first, offline-first meeting intelligence backend.
  Transcription : faster-whisper tiny (CPU, int8)
  Analysis      : sumy LSA + rule-based NLP
  Runtime       : Python 3.11, no GPU required

Usage:
    # One-time setup (with internet):
    python setup_models.py

    # Run server (offline after setup):
    python app.py
"""

from flask import Flask
from flask_cors import CORS

from routes import api

app = Flask(__name__)

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False,
    )

# Allow requests from the Vite dev server and any deployed frontend
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(api)
