import apiClient from "./apiClient";

export async function loginRequest(credentials) {
  const response = await apiClient.post("login/", credentials);
  return response.data;
}

export async function registerRequest(registrationData) {
  const response = await apiClient.post("register/", registrationData);
  return response.data;
}
