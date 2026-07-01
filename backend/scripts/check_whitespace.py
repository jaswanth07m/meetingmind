#!/usr/bin/env python3

import os
import sys

ROOT = os.environ.get("FRONTEND_DIR", "frontend")
SRC = os.path.join(ROOT, "src")

EXTENSIONS = (
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".css",
    ".html",
)

errors = []

if not os.path.isdir(SRC):
    print(f"FAIL: Directory not found: {SRC}")
    sys.exit(1)

for root, _, files in os.walk(SRC):
    for filename in files:
        if filename.endswith(EXTENSIONS):
            path = os.path.join(root, filename)

            with open(path, "r", encoding="utf-8", errors="replace") as f:
                for lineno, line in enumerate(f, start=1):
                    if line.rstrip("\n\r") != line.rstrip():
                        errors.append(f"{path}:{lineno}")

if errors:
    print("FAIL: Trailing whitespace detected.\n")

    for item in errors:
        print(item)

    sys.exit(1)

print("PASS: No trailing whitespace detected.")