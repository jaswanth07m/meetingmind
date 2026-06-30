from flask import Flask
from flask_cors import CORS
from routes import api

import os

app = Flask(__name__)

CORS(app)

app.register_blueprint(api)

if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=int(os.environ.get("PORT", 5000))
)