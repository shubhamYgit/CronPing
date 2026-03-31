const TOKEN_KEY = "cronping.token";
const EMAIL_KEY = "cronping.email";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredEmail() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(EMAIL_KEY);
}

export function saveSession(token: string, email: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}

