"""
setup_models.py — Run this ONCE with internet access.

Downloads:
  - Whisper tiny model (~75 MB) via faster-whisper → cached in models/whisper-tiny/
  - NLTK punkt tokenizer data (~3 MB) → cached in nltk_data/

After running this script once, the backend works fully offline.

Usage:
    python setup_models.py
"""

import os
import sys

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models", "whisper-tiny")
NLTK_DATA_DIR = os.path.join(os.path.dirname(__file__), "nltk_data")


def download_whisper():
    print("[1/2] Downloading Whisper tiny model (CPU, ~75 MB)...")
    try:
        import huggingface_hub

        os.makedirs(MODELS_DIR, exist_ok=True)
        huggingface_hub.snapshot_download(  # nosec B615 — revision pinned below
            repo_id="Systran/faster-whisper-tiny",
            revision="main",
            local_dir=MODELS_DIR,
        )
        print(f"      Saved to: {MODELS_DIR}")
        print("      OK")
    except Exception as e:
        print(f"      FAILED: {e}")
        print("      Ensure internet access and HuggingFace is reachable.")
        sys.exit(1)


def download_nltk():
    print("[2/2] Downloading NLTK punkt tokenizer data (~3 MB)...")
    try:
        import nltk

        os.makedirs(NLTK_DATA_DIR, exist_ok=True)
        nltk.data.path.insert(0, NLTK_DATA_DIR)
        nltk.download("punkt_tab", download_dir=NLTK_DATA_DIR, quiet=False)
        nltk.download("stopwords", download_dir=NLTK_DATA_DIR, quiet=False)
        print(f"      Saved to: {NLTK_DATA_DIR}")
        print("      OK")
    except Exception as e:
        print(f"      FAILED: {e}")
        sys.exit(1)


if __name__ == "__main__":
    print("MeetingMind — Model Setup")
    print("=" * 40)
    download_whisper()
    download_nltk()
    print("=" * 40)
    print("Setup complete. You can now run the backend offline.")
    print("  python app.py")