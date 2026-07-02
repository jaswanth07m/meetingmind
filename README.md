# 🎙️ MeetingMind

# Offline AI-Powered Meeting Transcriber & Action Extractor

MeetingMind is an offline-first, CPU-powered AI application that converts meeting recordings into structured, actionable insights.

It transcribes audio, summarizes discussions, identifies attendees, extracts key decisions, and generates action items—all while running entirely on your own machine without relying on cloud AI services.

---

# 🌐 Live Demo

### Frontend (Vercel)

https://meetingmind-sepia.vercel.app

### Backend (Render)

https://meetingmind-backend-j9m5.onrender.com

**Status:** ✅ Deployed

---

# 🚀 Overview

Meetings often produce valuable information, but manually documenting discussions, assigning tasks, and tracking decisions is tedious and error-prone.

MeetingMind automates this workflow using local AI models running on the CPU. It transforms meeting recordings into structured information while keeping user data private.

The application supports:

- Online deployment using the hosted backend
- Offline processing using a local backend
- Progressive Web App (PWA) installation

---

# ❗ Problem Statement

Existing meeting transcription platforms often depend on cloud services, resulting in:

- Privacy concerns
- Internet dependency
- Subscription costs
- Vendor lock-in
- High latency

Organizations need a solution that keeps sensitive meeting data on-device while producing structured outputs automatically.

---

# 💡 Solution

MeetingMind provides an end-to-end AI pipeline:

1. Upload a meeting recording (.wav/.mp3)
2. Transcribe speech using Faster Whisper (Whisper Tiny)
3. Analyze the transcript using Python NLP
4. Generate:

   - Meeting summary
   - Attendees
   - Key decisions
   - Action items

5. Export structured JSON

No cloud AI APIs are used.

---

# ✨ Features

- 🎤 Offline speech-to-text transcription
- 🧠 AI-generated meeting summaries
- 👥 Automatic attendee extraction
- ✅ Decision detection
- 📌 Action item extraction
- 📄 Structured JSON output
- ⚡ CPU-only inference
- 🌐 Progressive Web App (PWA)
- 🔒 Privacy-first architecture
- 🔁 Automatic Localhost → Render backend fallback

---

# 🏗 Architecture

```text
                 Meeting Audio
                      │
                      ▼
              React + Vite PWA
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
 localhost:5000          Render Backend
          │
          ▼
      Flask Backend
          │
          ▼
 Faster Whisper (CPU)
          │
          ▼
     Transcript
          │
          ▼
      Python NLP
          │
  ┌───────┴────────┐
  │                │
  ▼                ▼
Summary      Attendees
  │
  ▼
Action Items + Decisions
  │
  ▼
 Structured JSON
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- vite-plugin-pwa

## Backend

- Python
- Flask

## AI

- Faster Whisper (Whisper Tiny)
- NLTK
- Sumy

## Deployment

- Vercel
- Render

## CI/CD

- GitLab CI
- GitLab Runner
- Docker

---

# 📂 Project Structure

```text
MeetingMind
│
├── frontend/
│
├── backend/
│   ├── analyzer.py
│   ├── app.py
│   ├── routes.py
│   ├── transcriber.py
│   ├── setup_models.py
│   ├── requirements.txt
│   ├── uploads/
│   └── models/
│
├── specs/
│
├── .gitlab-ci.yml
│
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>

cd MeetingMind
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

python setup_models.py

python app.py
```

---

## Frontend

```bash
cd frontend

npm install

npm run build

npm run preview
```

---

# 📶 Offline Usage

MeetingMind is designed to support offline AI processing.

## Start Backend

```bash
cd backend

python app.py
```

## Start Frontend

```bash
cd frontend

npm run build

npm run preview
```

Install the PWA.

Disconnect Wi-Fi.

Launch the installed application.

Upload a meeting recording.

All AI inference runs locally on the CPU.

If a local backend is available, the frontend automatically connects to it.

Otherwise it falls back to the deployed Render backend.

---

# 📥 Input

Supported formats

- WAV
- MP3

---

# 📤 Output

Example

```json
{
  "summary": "Project timeline discussed.",
  "attendees": [
    "Alice",
    "Bob"
  ],
  "decisions": [
    "Deploy next Friday."
  ],
  "action_items": [
    {
      "task": "Prepare deployment checklist",
      "owner": "Bob"
    }
  ]
}
```

---

# 🧠 CPU-First Design

MeetingMind is built specifically for CPU inference.

It uses:

- Faster Whisper Tiny
- Python NLP
- NLTK
- Sumy

No GPU or CUDA is required.

No cloud AI inference is used.

---

# 🔒 Privacy

MeetingMind follows a privacy-first architecture.

- Audio never leaves your machine when using the local backend.
- No OpenAI API.
- No cloud LLMs.
- No third-party AI services.
- Local CPU inference.

---

# 🏆 Hackathon Highlights

- ✅ CPU-first inference
- ✅ Offline-first architecture
- ✅ Progressive Web App
- ✅ Local AI processing
- ✅ Faster Whisper transcription
- ✅ Meeting summarization
- ✅ Action item extraction
- ✅ Decision detection
- ✅ GitLab CI/CD (10+ real checks)
- ✅ GPL-3.0 Open Source

---

# 🚀 Future Scope

- Speaker diarization
- Multi-language transcription
- Calendar integration
- PDF meeting reports
- Email action-item delivery
- Searchable meeting history
- Browser-side Whisper inference
- Fully offline browser inference without a local backend

---

# 👥 Team

**Team Name:** MeetingMind

Members:

- Jaswanth Mucherla
- (Add remaining members)

---

# 📜 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the LICENSE file for complete license information.