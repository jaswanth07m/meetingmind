# MeetingMind — Technical Implementation Plan

## Architecture Overview

```
[Browser UI]
     │  HTTP (localhost only)
     ▼
[FastAPI App — api.py]
     │
     ├──► [Upload Handler] ──► uploads/ directory
     │
     ├──► [Transcriber — transcribe.py]
     │         └── faster-whisper (CPU, INT8)
     │               └── ggml-base.bin
     │
     ├──► [Extractor — extract.py]
     │         └── llama-cpp-python
     │               └── Mistral-7B-Instruct Q4_K_M GGUF
     │
     └──► [Database — db.py]
               └── SQLite → data/meetingmind.db
```

---

## Folder Structure

```
meetingmind/
├── .specify/                  # spec-kit config (do not edit)
├── .claude/                   # Claude Code config (do not edit)
├── specs/
│   └── 001-meetingmind/
│       ├── spec.md
│       ├── plan.md
│       ├── data-model.md
│       ├── research.md
│       └── tasks.md
├── src/
│   ├── api.py                 # FastAPI app — routes and file upload
│   ├── transcribe.py          # whisper.cpp wrapper via faster-whisper
│   ├── extract.py             # llama.cpp extraction via llama-cpp-python
│   ├── schema.py              # Pydantic models for JSON validation
│   └── db.py                  # SQLite read/write helpers
├── templates/
│   └── index.html             # Jinja2 HTML templates
├── static/
│   └── style.css              # Minimal CSS
├── models/
│   └── .gitkeep               # GGUF models go here (not committed to git)
├── uploads/
│   └── .gitkeep               # Audio uploads go here
├── data/
│   └── .gitkeep               # SQLite database goes here
├── logs/
│   └── .gitkeep               # App logs go here
├── tests/
│   ├── test_schema.py
│   ├── test_db.py
│   └── test_extract.py
├── .env.example               # Environment variable template
├── .gitignore
├── .gitlab-ci.yml             # CI pipeline (Phase 3)
├── .pre-commit-config.yaml    # Pre-commit hooks (Phase 3)
├── requirements.txt
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE                    # GPL-3.0
```

---

## Implementation Phases

### Phase 1 — Core Pipeline (MVP)

#### 1.1 Project scaffold
- Create folder structure above
- `requirements.txt` with pinned versions
- `.gitignore` (models/, uploads/, data/, __pycache__)
- `.env.example` with `MODEL_ASR`, `MODEL_LLM`, `MAX_UPLOAD_MB`

#### 1.2 Schema — `src/schema.py`
Define Pydantic models matching data-model.md:
```python
class ActionItem(BaseModel):
    owner: Optional[str] = "Unknown"
    task: str
    due_date: Optional[str] = None

class MeetingRecord(BaseModel):
    meeting_id: str
    title: str
    date: Optional[str]
    duration_secs: Optional[int]
    audio_file: str
    transcript_file: Optional[str]
    attendees: List[str] = []
    summary: str
    decisions: List[str] = []
    action_items: List[ActionItem] = []
    model_asr: str
    model_llm: str
    processed_at: str
```

#### 1.3 Database — `src/db.py`
- `init_db()` — creates tables if not exists
- `save_meeting(record: MeetingRecord)` — insert meeting + action items
- `get_all_meetings()` — list for home page
- `get_meeting(meeting_id)` — single meeting detail

#### 1.4 Transcription — `src/transcribe.py`
```python
def transcribe(audio_path: str, model_size: str = "base") -> tuple[str, int]:
    """Returns (transcript_text, duration_secs)"""
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, beam_size=5)
    text = " ".join([s.text.strip() for s in segments])
    return text, int(info.duration)
```

#### 1.5 Extraction — `src/extract.py`
```python
def extract(transcript: str, model_path: str) -> dict:
    """Returns parsed JSON dict from LLM extraction"""
    llm = Llama(model_path=model_path, n_ctx=4096, n_threads=8, verbose=False)
    prompt = build_prompt(transcript)
    response = llm(prompt, max_tokens=1024, temperature=0.1, stop=["</s>"])
    raw = response["choices"][0]["text"].strip()
    return json.loads(raw)  # validate against schema
```

#### 1.6 API — `src/api.py`
Routes:
- `GET /` — home page, list past meetings
- `POST /upload` — accept audio file, trigger pipeline
- `GET /meeting/{meeting_id}` — show results
- `GET /api/meeting/{meeting_id}/json` — raw JSON download

---

### Phase 2 — Web UI

- `templates/index.html` — home page with meeting list + upload form
- `templates/result.html` — results page with summary, decisions, action items table
- HTMX for progress polling during long transcription jobs
- Upload progress bar using `fetch` with `ReadableStream`

---

### Phase 3 — CI/CD & Repo Audit

See `tasks.md` for the full `.gitlab-ci.yml` with 10 checks.

Pre-commit hooks:
- `black` — Python formatting
- `ruff` — linting
- `mypy` — type checking
- `bandit` — security scan
- `markdownlint` — docs formatting

---

## Key Technical Decisions

| Decision | Choice | Reason |
|---|---|---|
| ASR model | faster-whisper base INT8 | Best CPU speed/accuracy for meetings |
| LLM | Mistral-7B Q4_K_M | Fits 8GB RAM, follows JSON prompts well |
| LLM runtime | llama-cpp-python | Native CPU, no CUDA dependency |
| Web framework | FastAPI + Jinja2 | Async, lightweight, no JS build step |
| Database | SQLite stdlib | Zero setup, fully offline |
| UI interactivity | HTMX | Dynamic UI without React |
| Python version | 3.11 | Required by faster-whisper |

---

## Model Setup (One-Time)

```bash
# Create models directory
mkdir models

# Download whisper model (~142 MB)
pip install huggingface-hub
huggingface-cli download ggerganov/whisper.cpp \
    ggml-base.bin --local-dir models/

# Download Mistral GGUF (~4.1 GB)
huggingface-cli download TheBloke/Mistral-7B-Instruct-v0.2-GGUF \
    Mistral-7B-Instruct-v0.2.Q4_K_M.gguf \
    --local-dir models/
```

---

## Requirements

```
fastapi==0.111.0
uvicorn==0.29.0
jinja2==3.1.4
python-multipart==0.0.9
faster-whisper==1.0.3
llama-cpp-python==0.2.77
pydantic==2.7.1
python-dotenv==1.0.1
httpx==0.27.0
```