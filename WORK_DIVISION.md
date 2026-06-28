# WORK_DIVISION.md

# Team Work Division

**Project:** MeetingMind – Offline Meeting Transcriber & Action Extractor

---

## Member 1 – AI & Backend Developer

### Responsibilities

#### AI Integration

* Integrate whisper.cpp for offline speech-to-text.
* Load and run the GGUF Small Language Model.
* Process transcripts using the local LLM.

#### Backend Development

* Develop audio upload and processing pipeline.
* Generate meeting summaries.
* Extract attendees using Named Entity Recognition (NER).
* Detect meeting decisions.
* Extract action items and assign owners.
* Generate structured JSON output.

#### Database

* Design SQLite schema.
* Store transcripts and extracted meeting data.
* Implement database CRUD operations.

#### Testing

* Validate transcription accuracy.
* Test JSON output.
* Test offline execution.

---

## Member 2 – Frontend, DevOps & Documentation

### Responsibilities

#### Frontend

* Design responsive web interface.
* Implement audio upload page.
* Display transcript.
* Display meeting summary.
* Display action items and decisions.
* Show JSON output.

#### Documentation

* README.md
* SPEC.md
* CONTRIBUTING.md
* CHANGELOG.md
* LICENSE (GPL-3.0)

#### DevOps

* Configure GitLab repository.
* Create GitLab Issues.
* Set up pre-commit hooks.
* Configure GitLab CI/CD.
* Add formatting checks.
* Add linting.
* Add type checking.
* Add security scanning.
* Verify all CI jobs pass on the local GitLab Runner.

#### Final Integration

* Connect frontend with backend.
* Prepare hackathon demo.
* Verify offline execution with Wi-Fi disabled.

---

# Shared Responsibilities

Both members will:

* Review each other's code.
* Perform integration testing.
* Fix bugs.
* Prepare the final presentation.
* Demonstrate offline functionality.
* Submit all deliverables before deadlines.

---

## Timeline

### Phase 1 (Planning)

Member 1

* AI architecture
* Backend design
* Database design

Member 2

* Documentation
* GitLab setup
* Issue creation

---

### Phase 2 (MVP)

Member 1

* AI pipeline
* JSON generation
* SQLite integration

Member 2

* UI development
* Integration
* Demo preparation

---

### Phase 3 (Repository Audit)

Member 1

* Testing
* Bug fixing

Member 2

* CI/CD
* Documentation
* Security checks
* Final repository audit