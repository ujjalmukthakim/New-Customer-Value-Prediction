import { apiRequest } from "./apiClient";

export function loginRequest(credentials) {
  return apiRequest("/auth/login/", { method: "POST", data: credentials });
}

export function registerRequest(registrationData) {
  return apiRequest("/auth/register/", { method: "POST", data: registrationData });
}
