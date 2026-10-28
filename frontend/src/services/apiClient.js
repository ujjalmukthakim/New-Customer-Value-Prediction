import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not configured.");
}

const apiClient = axios.create({
  baseURL: baseURL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiRequest(path, options = {}) {
  try {
    const response = await apiClient.request({ url: path, ...options });
    return response.data;
  } catch (error) {
    const apiError = new Error(getResponseMessage(error.response?.data));
    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    throw apiError;
  }
}

function getResponseMessage(data) {
  if (!data) return "The request failed. Please try again.";
  if (typeof data === "string") return data;

  return Object.values(data)
    .flat()
    .map(String)
    .join(" ");
}
