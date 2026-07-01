#!/usr/bin/env python3

import os
import re
import sys

PATTERN = re.compile(
    r"^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)"
    r"(\([^)]+\))?!?:\s.{1,100}$"
)

commit = os.environ.get("CI_COMMIT_MESSAGE", "").strip()

if not commit:
    print("INFO: CI_COMMIT_MESSAGE is not available. Skipping commit validation.")
    sys.exit(0)

subject = commit.splitlines()[0].strip()

if PATTERN.fullmatch(subject):
    print("PASS: Conventional Commit message verified.")
    sys.exit(0)

print("FAIL: Commit message does not follow Conventional Commits.")
print(f"Found: {subject}")
print("Expected format: feat(scope): message")
sys.exit(1)