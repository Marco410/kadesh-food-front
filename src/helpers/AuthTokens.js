const ACCESS_TOKEN_KEY = "kadeshfood_access_token";
const REFRESH_TOKEN_KEY = "kadeshfood_refresh_token";

export function saveAuthTokens({ accessToken, refreshToken } = {}) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function getAccessToken() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token && token !== "undefined" ? token : null;
}

export function getRefreshToken() {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);
  return token && token !== "undefined" ? token : null;
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
