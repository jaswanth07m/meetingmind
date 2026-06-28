# 🎙️ MeetingMind

**Offline AI-Powered Meeting Transcriber & Action Extractor**

MeetingMind is an offline-first AI application that converts meeting recordings into structured, actionable insights. It transcribes audio, summarizes discussions, identifies attendees, extracts key decisions, and generates action items with assigned owners—all without requiring an internet connection.

---

## 🚀 Overview

Meetings often produce valuable information, but manually taking notes, tracking decisions, and assigning tasks is time-consuming and error-prone.

MeetingMind automates this entire workflow by processing meeting recordings locally on the user's device, ensuring complete privacy while delivering structured outputs that are easy to store, search, and integrate into other systems.

---

## ❗ Problem Statement

Organizations spend countless hours documenting meetings. Existing cloud-based transcription services introduce concerns regarding:

* Data privacy
* Internet dependency
* Subscription costs
* Delayed processing

There is a need for an offline solution that can accurately transcribe meetings and automatically organize important information into structured data.

---

## 💡 Solution

MeetingMind provides an end-to-end offline AI pipeline:

1. Upload a meeting recording (.wav or .mp3)
2. Convert speech to text using **whisper.cpp**
3. Process the transcript using a **GGUF Small Language Model**
4. Extract:

   * Meeting summary
   * Attendees
   * Key decisions
   * Action items
   * Responsible owners
5. Store structured results in SQLite
6. Export the final output as JSON

Everything runs locally on CPU without internet access.

---

# ✨ Features

* 🎤 Offline speech-to-text transcription
* 🧠 AI-generated meeting summaries
* 👥 Automatic attendee extraction
* ✅ Decision detection
* 📌 Action item extraction
* 🙋 Owner assignment
* 📄 Structured JSON output
* 💾 SQLite storage
* 🔒 Privacy-first architecture
* 🌐 No internet required

---

# 🏗 Architecture

```text
Meeting Audio (.wav/.mp3)
          │
          ▼
    whisper.cpp
(Audio → Transcript)
          │
          ▼
 GGUF Small Language Model
          │
          ├─────────────┐
          │             │
          ▼             ▼
Meeting Summary    Named Entity Recognition
          │             │
          └──────┬──────┘
                 ▼
      Decision & Action Extraction
                 │
                 ▼
          Structured JSON
                 │
                 ▼
             SQLite Database
```

---

# 🛠 Tech Stack

## AI Models

* whisper.cpp
* GGUF Small Language Model

## Backend

* Python

## Database

* SQLite

## Data Format

* JSON

## Audio Processing

* WAV
* MP3

---

# 📂 Project Structure

```text
MeetingMind/
│
├── app/
│   ├── transcriber.py
│   ├── extractor.py
│   ├── summarizer.py
│   ├── database.py
│   └── main.py
│
├── models/
│   ├── whisper.cpp/
│   └── gguf-model/
│
├── database/
│   └── meetings.db
│
├── samples/
│   └── sample_meeting.wav
│
├── output/
│   ├── transcript.txt
│   ├── summary.json
│   └── actions.json
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/MeetingMind.git

cd MeetingMind
```

Install dependencies

```bash
pip install -r requirements.txt
```

Download the required Whisper and GGUF models and place them inside the `models/` directory.

Run the application

```bash
python app/main.py
```

---

# 📥 Input

Supported formats:

* .wav
* .mp3

Example

```text
meeting.wav
```

---

# 📤 Output

Example JSON

```json
{
  "summary": "Discussed Q3 product roadmap and deployment timeline.",
  "attendees": [
    "Alice",
    "Bob",
    "Charlie"
  ],
  "decisions": [
    "Launch postponed to next Friday."
  ],
  "action_items": [
    {
      "task": "Prepare deployment checklist",
      "owner": "Bob"
    },
    {
      "task": "Update project documentation",
      "owner": "Alice"
    }
  ]
}
```

---

# 🎯 Future Scope

* Speaker diarization
* Multi-language transcription
* Calendar integration
* PDF meeting reports
* Email action-item delivery
* Searchable meeting history
* Meeting analytics dashboard

---

# 🔒 Privacy

MeetingMind is designed with privacy as its highest priority.

* No internet connection required
* No cloud uploads
* All processing happens locally
* Complete ownership of meeting data

---

# 🏆 Hackathon Highlights

* Fully Offline AI Pipeline
* CPU-Optimized Inference
* End-to-End Local Processing
* Automatic Knowledge Extraction
* Real-World Business Use Case

---

# 👥 Team

**Team Name:** *[Your Team Name]*

Members:

* Member 1
* Member 2
* Member 3
* Member 4

---

## 📜 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the LICENSE file for details.