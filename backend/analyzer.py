"""
analyzer.py — Offline NLP analysis of meeting transcripts.

Runtime: CPU-only. No network calls.
Models: NLTK punkt tokenizer (bundled in nltk_data/).

Provides:
    analyze(transcript: str) -> dict
        summary      : str    — extractive summary (LSA, 4 sentences)
        attendees    : [str]  — person names found in transcript
        decisions    : [str]  — sentences containing decision language
        action_items : [str]  — sentences describing someone's assigned task
"""

import os
import re

import nltk

# ── NLTK data path ────────────────────────────────────────────────────────
# Point NLTK at our bundled data directory (offline, no download at runtime)
_NLTK_DATA = os.path.join(os.path.dirname(__file__), "nltk_data")
if os.path.isdir(_NLTK_DATA):
    nltk.data.path.insert(0, _NLTK_DATA)

# ── Sumy imports ──────────────────────────────────────────────────────────
from sumy.nlp.stemmers import Stemmer  # noqa: E402
from sumy.nlp.tokenizers import Tokenizer  # noqa: E402
from sumy.parsers.plaintext import PlaintextParser  # noqa: E402
from sumy.summarizers.lsa import LsaSummarizer  # noqa: E402
from sumy.utils import get_stop_words  # noqa: E402

# ── Constants ─────────────────────────────────────────────────────────────
_LANG = "english"
_SUMMARY_SENTENCES = 4

# Words that look like "Firstname Lastname" but are NOT person names
_NAME_BLACKLIST = frozenset(
    [
        "Action Item",
        "Meeting Notes",
        "New Feature",
        "Next Steps",
        "Follow Up",
        "Q1 Q2",
        "Q3 Q4",
    ]
)

# Patterns that strongly indicate a decision was made
_DECISION_PATTERNS = re.compile(
    r"\b(decided|agreed|approved|confirmed|resolved|concluded|voted|chosen|selected)\b",
    re.IGNORECASE,
)

# Patterns that indicate an action item (someone will do something)
_ACTION_PATTERNS = re.compile(
    r"\b(will|shall|needs to|is going to|has to|must|is responsible for|is assigned to)\b",
    re.IGNORECASE,
)

# Capitalized "Firstname Lastname" — rough heuristic for person names
_NAME_PATTERN = re.compile(r"\b([A-Z][a-z]{1,20})\s+([A-Z][a-z]{1,20})\b")

# Deadline / ownership keywords that strengthen action-item confidence
_DEADLINE_PATTERN = re.compile(
    r"\b(by\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|"
    r"next week|end of (week|day|month)|\d+\s*(jan|feb|mar|apr|may|jun|"
    r"jul|aug|sep|oct|nov|dec)))\b",
    re.IGNORECASE,
)


def _sentences(text: str) -> list[str]:
    """Split text into sentences using NLTK punkt."""
    try:
        from nltk.tokenize import sent_tokenize

        return sent_tokenize(text)
    except LookupError:
        # Fallback: split on period/exclamation/question
        return [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]


def summarize(text: str, n: int = _SUMMARY_SENTENCES) -> str:
    """
    Extractive summarization using Latent Semantic Analysis.
    Runs fully on CPU with no external model.
    """
    if not text or not text.strip():
        return ""

    try:
        parser = PlaintextParser.from_string(text, Tokenizer(_LANG))
        stemmer = Stemmer(_LANG)
        summarizer = LsaSummarizer(stemmer)
        summarizer.stop_words = get_stop_words(_LANG)
        sentences = summarizer(parser.document, min(n, len(parser.document.sentences)))
        return " ".join(str(s) for s in sentences)
    except Exception:
        # Ultra-safe fallback: first N sentences
        sents = _sentences(text)
        return " ".join(sents[: min(n, len(sents))])


def extract_attendees(text: str) -> list[str]:
    """
    Heuristic person-name extraction.
    Finds "Firstname Lastname" patterns (both words capitalized).
    Deduplicates preserving first-mention order.
    """
    matches = _NAME_PATTERN.findall(text)
    seen: set[str] = set()
    result: list[str] = []

    for first, last in matches:
        full = f"{first} {last}"
        if full in _NAME_BLACKLIST:
            continue
        if full not in seen:
            seen.add(full)
            result.append(full)

    return result


def extract_decisions(text: str) -> list[str]:
    """
    Returns sentences that express a decision.
    Looks for: decided, agreed, approved, confirmed, etc.
    """
    results: list[str] = []
    seen: set[str] = set()

    for sent in _sentences(text):
        stripped = sent.strip()
        if not stripped:
            continue
        if _DECISION_PATTERNS.search(stripped) and stripped not in seen:
            seen.add(stripped)
            results.append(stripped)

    return results


def extract_action_items(text: str) -> list[str]:
    """
    Returns sentences that assign a task to someone.
    Looks for: will, shall, needs to, is going to, etc.
    Boosts confidence when the sentence also contains a name or deadline.
    """
    results: list[str] = []
    seen: set[str] = set()

    for sent in _sentences(text):
        stripped = sent.strip()
        if not stripped:
            continue
        if _ACTION_PATTERNS.search(stripped) and stripped not in seen:
            # Extra signal: sentence contains a person name or deadline
            has_name = bool(_NAME_PATTERN.search(stripped))
            has_deadline = bool(_DEADLINE_PATTERN.search(stripped))
            # Accept if it has "will/shall" AND (name OR deadline)
            # OR just has a stronger explicit assignment phrase
            strong_phrase = re.search(
                r"\b(is responsible for|is assigned to|has to|must)\b",
                stripped,
                re.IGNORECASE,
            )
            if has_name or has_deadline or strong_phrase:
                seen.add(stripped)
                results.append(stripped)

    return results


def analyze(transcript: str) -> dict:
    """
    Full offline analysis of a meeting transcript.

    Returns:
        {
            "summary":      str,
            "attendees":    [str],
            "decisions":    [str],
            "action_items": [str],
        }
    """
    if not transcript or not transcript.strip():
        return {
            "summary": "",
            "attendees": [],
            "decisions": [],
            "action_items": [],
        }

    return {
        "summary": summarize(transcript),
        "attendees": extract_attendees(transcript),
        "decisions": extract_decisions(transcript),
        "action_items": extract_action_items(transcript),
    }