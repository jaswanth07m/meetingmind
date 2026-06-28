# MeetingMind — Data Model

## JSON Output Schema

Every processed meeting produces one JSON object matching this schema:

```json
{
  "meeting_id": "uuid-v4-string",
  "title": "string (filename without extension, or first sentence of transcript)",
  "date": "ISO 8601 datetime — e.g. 2026-06-28T10:00:00",
  "duration_secs": 3720,
  "audio_file": "uploads/standup_2026-06-28.wav",
  "transcript_file": "uploads/standup_2026-06-28.txt",
  "attendees": [
    "Alice",
    "Bob",
    "Manohar"
  ],
  "summary": "The team discussed the Q3 roadmap, agreed to delay the payment feature by one sprint, and assigned three action items for the upcoming week.",
  "decisions": [
    "Payment feature delayed to Sprint 14",
    "Design review scheduled for Friday",
    "Manohar will own the offline demo preparation"
  ],
  "action_items": [
    {
      "owner": "Alice",
      "task": "Update the API contract document",
      "due_date": "2026-07-02"
    },
    {
      "owner": "Bob",
      "task": "Fix the login bug on mobile",
      "due_date": null
    },
    {
      "owner": "Manohar",
      "task": "Prepare offline demo for hackathon",
      "due_date": "2026-06-28"
    }
  ],
  "model_asr": "ggml-base.bin",
  "model_llm": "Mistral-7B-Instruct-v0.2.Q4_K_M.gguf",
  "processed_at": "ISO 8601 datetime"
}
```

---

## SQLite Schema

Database file: `data/meetingmind.db`

### Table: `meetings`

```sql
CREATE TABLE meetings (
    meeting_id    TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    date          TEXT,
    duration_secs INTEGER,
    audio_file    TEXT NOT NULL,
    transcript_file TEXT,
    attendees     TEXT,          -- JSON array stored as string
    summary       TEXT,
    decisions     TEXT,          -- JSON array stored as string
    model_asr     TEXT,
    model_llm     TEXT,
    processed_at  TEXT NOT NULL
);
```

### Table: `action_items`

```sql
CREATE TABLE action_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    meeting_id  TEXT NOT NULL REFERENCES meetings(meeting_id),
    owner       TEXT,
    task        TEXT NOT NULL,
    due_date    TEXT,
    done        INTEGER DEFAULT 0  -- 0 = pending, 1 = completed
);
```

---

## LLM Extraction Prompt Template

The following prompt is sent to Mistral-7B-Instruct to extract structured data from the transcript:

```
You are a meeting analyst. Given the transcript below, extract the following information and return ONLY valid JSON. No explanation, no markdown, no extra text.

Return this exact JSON structure:
{
  "attendees": ["list of names mentioned"],
  "summary": "2-3 sentence summary of the meeting",
  "decisions": ["list of decisions made"],
  "action_items": [
    {"owner": "name or Unknown", "task": "what they need to do", "due_date": "YYYY-MM-DD or null"}
  ]
}

TRANSCRIPT:
{transcript_text}
```

---

## Field Validation Rules

| Field | Type | Required | Notes |
|---|---|---|---|
| meeting_id | UUID string | Yes | Generated with `uuid.uuid4()` |
| title | string | Yes | Max 255 chars |
| date | ISO 8601 | No | Parsed from filename or file metadata |
| duration_secs | integer | No | Calculated from audio file |
| attendees | string[] | No | Empty array if none detected |
| summary | string | Yes | Min 10 chars |
| decisions | string[] | No | Empty array if none |
| action_items | object[] | No | Empty array if none |
| owner | string | No | "Unknown" if not mentioned |
| due_date | YYYY-MM-DD | No | null if not mentioned |