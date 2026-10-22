import { apiRequest } from "./apiClient";

export function loginRequest(credentials) {
  return apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function registerRequest(registrationData) {
  return apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(registrationData),
  });
}