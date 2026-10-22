const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = API_BASE_URL.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}${normalizedPath}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(getResponseMessage(data));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function getResponseMessage(data) {
  if (!data) return "The request failed. Please try again.";

  if (typeof data === "string") return data;

  return Object.values(data)
    .flat()
    .map(String)
    .join(" ");
}
