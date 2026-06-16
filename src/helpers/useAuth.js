import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserDetailsInLocalStorage,
  saveUserDetailsInLocalStorage,
} from "./UserDetails";
import { saveAuthTokens } from "./AuthTokens";
import { isAuthError, isNetworkError } from "./networkError";
import apiClient from "./ApiClient";

const REFRESH_DEBOUNCE_MS = 30_000;

export default function useAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const lastRefreshRef = useRef(0);
  const isRefreshingRef = useRef(false);

  const user = getUserDetailsInLocalStorage();
  const role = user?.role || "";

  const safeRefresh = async ({ force = false } = {}) => {
    if (!navigator.onLine) return;

    const now = Date.now();
    if (!force && now - lastRefreshRef.current < REFRESH_DEBOUNCE_MS) return;
    if (isRefreshingRef.current) return;

    isRefreshingRef.current = true;
    lastRefreshRef.current = now;

    try {
      if (role == "superadmin") {
        const res = await apiClient.post("/superadmin/refresh-token");
        const token = res.data.accessToken || res.data.newAccessToken;
        if (token) {
          saveAuthTokens({ accessToken: token });
        }
      } else {
        const res = await apiClient.post("/auth/refresh-token");
        const userDetails = res.data.userDetails;
        if (userDetails) {
          saveUserDetailsInLocalStorage(userDetails);
        }
        const token = res.data.newAccessToken || res.data.accessToken;
        if (token) {
          saveAuthTokens({ accessToken: token });
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);

      if (isNetworkError(error)) {
        return;
      }

      if (isAuthError(error) && location.pathname !== "/refresh") {
        navigate("/refresh", { replace: true });
      }
    } finally {
      isRefreshingRef.current = false;
    }
  };

  useEffect(() => {
    safeRefresh({ force: true });

    const id = setInterval(() => {
      safeRefresh({ force: true });
    }, 13 * 60 * 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      safeRefresh();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        safeRefresh();
      }
    };

    const handleOnline = () => {
      safeRefresh({ force: true });
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    safeRefresh();
  }, [location.pathname]);
}
