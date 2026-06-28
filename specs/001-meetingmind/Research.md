# MeetingMind — Research & Technology Decisions

## 1. ASR (Speech-to-Text): whisper.cpp

### Why whisper.cpp
- Port of OpenAI Whisper to C++ using ggml — runs entirely on CPU
- No CUDA, no GPU drivers needed
- On a modern 8-core laptop CPU, `ggml-base.bin` processes audio at ~2–3× real-time
- On Raspberry Pi 5 (CPU only), achieves 3–5× real-time on the tiny model

### Model choice: `ggml-base.bin`
| Model | Size | Speed (CPU) | Accuracy |
|---|---|---|---|
| ggml-tiny.bin | 75 MB | 10× real-time | Good for clear audio |
| **ggml-base.bin** | **142 MB** | **3–5× real-time** | **Best speed/accuracy balance** |
| ggml-small.bin | 466 MB | 1–2× real-time | Better for noisy audio |
| ggml-medium.bin | 1.5 GB | 0.5× real-time | Overkill for most meetings |

**Default:** `ggml-base.bin`. User can override via `config.json`.

### Python integration
Use `faster-whisper` (CTranslate2 backend) as Python binding — up to 4× faster than openai/whisper on CPU with INT8 quantization.

```bash
pip install faster-whisper
```

```python
from faster_whisper import WhisperModel
model = WhisperModel("base", device="cpu", compute_type="int8")
segments, info = model.transcribe("meeting.wav")
transcript = " ".join([s.text for s in segments])
```

---

## 2. LLM Extraction: llama.cpp + Mistral-7B

### Why Mistral-7B-Instruct Q4_K_M
- Fits in ~4.1 GB RAM — runs on any laptop with 8 GB RAM
- Instruction-tuned: follows JSON extraction prompts reliably
- Q4_K_M quantization: best accuracy/size tradeoff in the Q4 family
- IQ4_XS saves ~400 MB vs Q4_K_M with comparable accuracy (alternative)

### CPU performance (Mistral-7B Q4_K_M)
| Hardware | Token generation speed |
|---|---|
| Apple M2 (8-core) | ~25–35 tok/s |
| Intel i7-12th gen (8-core) | ~12–18 tok/s |
| AMD Ryzen 7 (8-core) | ~14–20 tok/s |
| AWS Graviton4 (24 vCPU) | ~18–22 tok/s |

At ~15 tok/s, a 512-token extraction response takes ~34 seconds — within our 60s target.

### Python integration
```bash
pip install llama-cpp-python
```

```python
from llama_cpp import Llama

llm = Llama(
    model_path="models/Mistral-7B-Instruct-v0.2.Q4_K_M.gguf",
    n_ctx=4096,
    n_threads=8,
    verbose=False
)

response = llm(prompt, max_tokens=1024, temperature=0.1)
json_text = response["choices"][0]["text"]
```

### Model download
```bash
# Download from Hugging Face (one-time setup)
pip install huggingface-hub
huggingface-cli download TheBloke/Mistral-7B-Instruct-v0.2-GGUF \
    Mistral-7B-Instruct-v0.2.Q4_K_M.gguf \
    --local-dir models/
```

---

## 3. Web Framework: FastAPI

### Why FastAPI
- Async support — non-blocking while transcription runs
- Built-in file upload handling
- Auto-generates OpenAPI docs (useful for hackathon judges)
- Lightweight — no React, no Node.js build step needed

### UI approach
Vanilla HTML + HTMX for dynamic updates without JavaScript frameworks. Single-page feel without the build complexity.

---

## 4. Storage: SQLite

### Why SQLite
- Zero setup — stdlib `sqlite3` module in Python
- Single file database — easy to demo, easy to reset
- Fully offline — no database server process
- Sufficient for hackathon scale (< 10,000 meetings)

---

## 5. Offline Guarantee — Verification Method

To prove offline operation during demo:

**Windows:**
```powershell
# Disable Wi-Fi adapter
netsh interface set interface "Wi-Fi" disabled
# Run the app and process a meeting
# Re-enable after demo
netsh interface set interface "Wi-Fi" enabled
```

**Linux/Mac:**
```bash
sudo ifconfig en0 down   # or nmcli networking off
```

Alternative: Use browser DevTools → Network tab → set to "Offline" — shows zero network requests during processing.

---

## 6. CPU Compliance Checklist

- ✅ `faster-whisper` with `device="cpu"` — no CUDA path
- ✅ `llama-cpp-python` compiled without CUDA (`CMAKE_ARGS="-DLLAMA_CUBLAS=off"`)
- ✅ No calls to OpenAI, Anthropic, or any external API
- ✅ All models stored in local `models/` directory
- ✅ `requirements.txt` contains no GPU-dependent packages