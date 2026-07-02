const REMOTE_API = import.meta.env.VITE_API_URL;
const LOCAL_API = "http://localhost:5000";

let API_BASE = REMOTE_API;
let initialized = false;

async function initializeApi() {
  if (initialized) return;

  initialized = true;

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(`${LOCAL_API}/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      API_BASE = LOCAL_API;
      console.log("✅ Using local backend");
      return;
    }
  } catch {
    console.log("Local backend unavailable, using remote backend.");
  }

  API_BASE = REMOTE_API;
  console.log("🌐 Using remote backend");
}

async function request(endpoint, options = {}) {
  await initializeApi();

  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  if (config.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));

    throw new Error(
      error.error || error.message || `HTTP ${response.status}`
    );
  }

  return response.json();
}

export async function health() {
  return request("/health");
}

export async function upload(file, onProgress) {
  await initializeApi();

  const formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_BASE}/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(
            new Error(
              error.error ||
                error.message ||
                `HTTP ${xhr.status}`
            )
          );
        } catch {
          reject(new Error(`Upload failed: HTTP ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () =>
      reject(new Error("Network error during upload"));

    xhr.send(formData);
  });
}

export async function transcribe(filename) {
  return request("/transcribe", {
    method: "POST",
    body: { filename },
  });
}

export async function analyze(transcript) {
  return request("/analyze", {
    method: "POST",
    body: { transcript },
  });
}

export default {
  health,
  upload,
  transcribe,
  analyze,
};
