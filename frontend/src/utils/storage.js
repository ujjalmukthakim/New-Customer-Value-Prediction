const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "currentUser";

export function saveSession(authResponse) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, authResponse.access);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, authResponse.refresh);
  sessionStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
}

export function getStoredUser() {
  const value = sessionStorage.getItem(USER_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    clearSession();
    return null;
  }
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearSession() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}