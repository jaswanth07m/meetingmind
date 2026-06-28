# MeetingMind — Feature Specification

## Feature Name
`001-meetingmind` — Offline Meeting Audio → Structured Action Items

---

## Problem Statement

Meeting recordings are unstructured audio. Extracting action items, decisions, and summaries manually is slow and error-prone. All existing tools (Otter.ai, Fireflies, Notion AI) require a cloud connection and send audio to external servers. MeetingMind solves this by running the entire pipeline locally on CPU — no internet, no GPU, no data leaving the machine.

---

## Goals

- Transform a raw meeting audio file into a clean, structured JSON record
- Work completely offline (air-gapped demo must pass)
- Run on any modern laptop CPU — no NVIDIA GPU required
- Store all outputs locally in SQLite

---

## User Stories

### US1 [P1] — Upload a meeting recording
As a user, I want to upload a `.wav` or `.mp3` meeting recording through a web UI so that MeetingMind can process it locally.

**Acceptance criteria:**
- [ ] User can upload `.wav` and `.mp3` files via a drag-and-drop or file picker UI
- [ ] File is saved to a local `uploads/` directory
- [ ] UI shows upload confirmation with file name and size
- [ ] Files larger than 500MB are rejected with a clear error message

---

### US2 [P1] — Transcribe audio locally
As a user, I want my audio transcribed locally using whisper.cpp so that no audio data is sent to any external server.

**Acceptance criteria:**
- [ ] Transcription runs via `whisper.cpp` (CPU mode, no CUDA)
- [ ] Model used: `ggml-base.bin` (default) or `ggml-small.bin` (user config)
- [ ] Transcription output is a plain text `.txt` file saved alongside the upload
- [ ] Progress indicator shown in UI during transcription
- [ ] Transcription completes within 3× audio duration on an 8-core CPU
- [ ] App works with network completely disabled during this step

---

### US3 [P1] — Extract structured data from transcript
As a user, I want the transcript automatically analysed by a local LLM so that I get a structured summary without reading the full transcript.

**Acceptance criteria:**
- [ ] Extraction runs via `llama-cpp-python` with Mistral-7B-Instruct Q4_K_M GGUF
- [ ] Output is valid JSON matching the defined schema (see data-model.md)
- [ ] Fields extracted: summary, attendees, decisions, action_items
- [ ] Each action item includes: owner, task description, due_date (if mentioned)
- [ ] Extraction completes in under 60 seconds on an 8-core CPU
- [ ] No HTTP calls made during extraction

---

### US4 [P1] — Store results in local SQLite database
As a user, I want all meeting records saved locally so that I can retrieve past meetings without re-processing.

**Acceptance criteria:**
- [ ] Each processed meeting is saved as a row in SQLite `meetings` table
- [ ] Action items saved in a separate `action_items` table linked by `meeting_id`
- [ ] Database file stored at `data/meetingmind.db`
- [ ] Records persist across app restarts

---

### US5 [P2] — View structured meeting output in UI
As a user, I want to see the extracted summary, decisions, and action items displayed cleanly in the web UI after processing.

**Acceptance criteria:**
- [ ] Results page shows: meeting title, date, duration, attendees
- [ ] Summary displayed as a readable paragraph
- [ ] Decisions shown as a bulleted list
- [ ] Action items shown as a table: owner | task | due date
- [ ] User can copy the JSON output to clipboard

---

### US6 [P2] — View past meetings
As a user, I want to browse previously processed meetings from the home page so that I don't need to re-upload files.

**Acceptance criteria:**
- [ ] Home page lists all past meetings sorted by date descending
- [ ] Each row shows: title, date, number of action items
- [ ] Clicking a meeting opens its results page
- [ ] Empty state shown when no meetings exist yet

---

### US7 [P3] — Graceful failure handling
As a user, I want clear error messages when something goes wrong so that I understand what happened and what to do next.

**Acceptance criteria:**
- [ ] Corrupt or unsupported audio file → clear error message, no crash
- [ ] Model file missing → message with download instructions
- [ ] Transcript too long for LLM context → automatic chunking or clear warning
- [ ] All errors logged to `logs/meetingmind.log`

---

## Out of Scope (this version)

- Speaker diarization (who said what)
- Real-time / streaming transcription
- Cloud sync or backup
- Mobile app
- Multi-language support (English only for v1)
- Authentication / login

---

## Review & Acceptance Checklist

- [ ] All P1 user stories implemented and manually tested
- [ ] Demo runs with Wi-Fi turned off
- [ ] No HTTP calls made during transcription or extraction (verified via network monitor)
- [ ] Output JSON validates against schema in data-model.md
- [ ] SQLite database persists correctly across restarts
- [ ] LICENSE file is GPL-3.0