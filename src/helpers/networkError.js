export function isNetworkError(error) {
  if (!error) return false;
  if (error.code === "ERR_NETWORK") return true;
  if (error.message === "Network Error") return true;
  return !error.response && Boolean(error.request);
}

export function isAuthError(error) {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}
