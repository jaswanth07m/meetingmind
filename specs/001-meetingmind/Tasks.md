# MeetingMind — Task Breakdown

## US1: Upload a meeting recording

- [x] T001 [P1] [US1] Create `src/` folder structure with empty `__init__.py` files
- [x] T002 [P1] [US1] Create `requirements.txt` with all pinned dependencies
- [x] T003 [P1] [US1] Create `.gitignore` (exclude models/, uploads/, data/, logs/, __pycache__, .env)
- [x] T004 [P1] [US1] Create `.env.example` with MODEL_ASR, MODEL_LLM, MAX_UPLOAD_MB=200
- [ ] T005 [P1] [US1] Implement `POST /upload` route in `src/api.py` — accept multipart audio file
- [ ] T006 [P1] [US1] Validate file extension (.wav, .mp3 only) and size (< MAX_UPLOAD_MB)
- [ ] T007 [P1] [US1] Save uploaded file to `uploads/{uuid}_{original_name}`
- [ ] T008 [P1] [US1] Return JSON response with `upload_id` and `filename`

---

## US2: Transcribe audio locally

- [ ] T009 [P1] [US2] Implement `src/transcribe.py` — `transcribe(audio_path, model_size)` function
- [ ] T010 [P1] [US2] Load faster-whisper model with `device="cpu"` and `compute_type="int8"`
- [ ] T011 [P1] [US2] Segment audio and join transcript text
- [ ] T012 [P1] [US2] Return `(transcript_text, duration_secs)` tuple
- [ ] T013 [P1] [US2] Save transcript as `.txt` file alongside audio in `uploads/`
- [ ] T014 [P1] [US2] Write unit test `tests/test_transcribe.py` using a 5-second sample WAV

---

## US3: Extract structured data from transcript

- [ ] T015 [P1] [US3] Implement `src/schema.py` — Pydantic models: `ActionItem`, `MeetingRecord`, `ExtractionResult`
- [ ] T016 [P1] [US3] Implement `src/extract.py` — `extract(transcript, model_path)` function
- [ ] T017 [P1] [US3] Build extraction prompt using template from data-model.md
- [ ] T018 [P1] [US3] Load llama-cpp-python with `n_threads=8`, `n_ctx=4096`, `verbose=False`
- [ ] T019 [P1] [US3] Parse LLM JSON output and validate against `ExtractionResult` Pydantic model
- [ ] T020 [P1] [US3] Handle JSON parse errors — retry with stricter prompt, then return safe defaults
- [ ] T021 [P1] [US3] Write unit test `tests/test_extract.py` using a mock transcript string

---

## US4: Store results in SQLite

- [ ] T022 [P1] [US4] Implement `src/db.py` — `init_db()` creates both tables if not exist
- [ ] T023 [P1] [US4] Implement `save_meeting(record: MeetingRecord)` — insert into meetings + action_items
- [ ] T024 [P1] [US4] Implement `get_all_meetings()` — returns list sorted by processed_at DESC
- [ ] T025 [P1] [US4] Implement `get_meeting(meeting_id)` — returns full record with action items joined
- [ ] T026 [P1] [US4] Write unit test `tests/test_db.py` — insert and retrieve a sample record
- [ ] T027 [P1] [US4] Call `init_db()` on FastAPI app startup event

---

## US5: View structured output in UI

- [ ] T028 [P2] [US5] Create `templates/result.html` — Jinja2 template with summary, decisions, action items table
- [ ] T029 [P2] [US5] Implement `GET /meeting/{meeting_id}` route — render result.html
- [ ] T030 [P2] [US5] Implement `GET /api/meeting/{meeting_id}/json` — return raw JSON for download
- [ ] T031 [P2] [US5] Add "Copy JSON" button with clipboard JS
- [ ] T032 [P2] [US5] Add basic CSS in `static/style.css` — clean table styling, readable font

---

## US6: View past meetings (home page)

- [ ] T033 [P2] [US6] Create `templates/index.html` — upload form + past meetings list
- [ ] T034 [P2] [US6] Implement `GET /` route — render index.html with all past meetings
- [ ] T035 [P2] [US6] Show processing progress via polling `GET /status/{upload_id}`
- [ ] T036 [P2] [US6] Empty state message when no meetings processed yet

---

## US7: Graceful failure handling

- [ ] T037 [P3] [US7] Wrap transcription in try/except — return error JSON on failure
- [ ] T038 [P3] [US7] Wrap extraction in try/except — return partial result with error field
- [ ] T039 [P3] [US7] Check model files exist on startup — log warning with download instructions if missing
- [ ] T040 [P3] [US7] Configure logging to `logs/meetingmind.log` with rotation

---

## Phase 3: CI/CD & Repo Audit

- [ ] T041 [P3] Create `.pre-commit-config.yaml` with: black, ruff, mypy, bandit, markdownlint
- [ ] T042 [P3] Create `.gitlab-ci.yml` with 10 real checks (no stubs):
  - check-1: `black --check src/ tests/`
  - check-2: `ruff check src/ tests/`
  - check-3: `mypy src/`
  - check-4: `bandit -r src/`
  - check-5: `pytest tests/ -v`
  - check-6: `markdownlint specs/**/*.md README.md`
  - check-7: `python -c "import json; json.load(open('specs/001-meetingmind/data-model-sample.json'))"`
  - check-8: semantic commit message lint (`commitlint`)
  - check-9: `pip-audit` — dependency vulnerability scan
  - check-10: validate `.env.example` has all required keys
- [ ] T043 [P3] Write `CONTRIBUTING.md` with branch naming and commit style guide
- [ ] T044 [P3] Update `CHANGELOG.md` with all changes
- [ ] T045 [P3] Confirm LICENSE is GPL-3.0
- [ ] T046 [P3] Run all CI checks locally via GitLab Runner and confirm all green

---

## Task Summary

| Phase | Total Tasks | Priority |
|---|---|---|
| US1 — Upload | T001–T008 | P1 |
| US2 — Transcribe | T009–T014 | P1 |
| US3 — Extract | T015–T021 | P1 |
| US4 — Database | T022–T027 | P1 |
| US5 — Results UI | T028–T032 | P2 |
| US6 — Home page | T033–T036 | P2 |
| US7 — Error handling | T037–T040 | P3 |
| CI/CD | T041–T046 | P3 |
| **Total** | **46 tasks** | |

## Work Division

| Member | Tasks |
|---|---|
| You (Manohar) | Spec kit, T001–T008, T022–T027, T041–T046 |
| Teammate | T009–T021, T028–T040 |