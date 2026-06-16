import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";
import {
  refreshPendingCount,
  syncPendingOrders,
} from "../services/posSyncService";

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const { t } = useTranslation();
  const [networkOffline, setNetworkOffline] = useState(!navigator.onLine);
  const [usingOfflineData, setUsingOfflineData] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const onSyncSuccessRef = useRef(null);
  const isSyncingRef = useRef(false);

  const tenantId = getUserDetailsInLocalStorage()?.tenant_id;
  const isOfflineMode = networkOffline || usingOfflineData;

  const loadPendingSyncCount = useCallback(async () => {
    if (!tenantId) return;
    const count = await refreshPendingCount(tenantId);
    setPendingSyncCount(count);
  }, [tenantId]);

  const runPendingSync = useCallback(
    async (showToast = true) => {
      if (!tenantId || !navigator.onLine || isSyncingRef.current) {
        return { synced: 0, failed: 0 };
      }

      isSyncingRef.current = true;

      if (showToast) toast.loading(t("pos.offline.syncing"));

      const { synced, failed } = await syncPendingOrders(tenantId);

      if (showToast) toast.dismiss();

      await loadPendingSyncCount();

      if (showToast) {
        if (synced > 0) {
          toast.success(t("pos.offline.sync_success", { count: synced }));
          onSyncSuccessRef.current?.(synced);
        }
        if (failed > 0) {
          toast.error(t("pos.offline.sync_failed", { count: failed }));
        }
      } else if (synced > 0) {
        onSyncSuccessRef.current?.(synced);
      }

      isSyncingRef.current = false;
      return { synced, failed };
    },
    [tenantId, loadPendingSyncCount, t],
  );

  useEffect(() => {
    loadPendingSyncCount();

    if (navigator.onLine) {
      runPendingSync(false);
    }

    const handleOnline = () => {
      setNetworkOffline(false);
      runPendingSync(true);
    };

    const handleOffline = () => {
      setNetworkOffline(true);
      toast(t("pos.offline.mode_active"), { icon: "⚠️" });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [tenantId, loadPendingSyncCount, runPendingSync, t]);

  const registerSyncSuccess = useCallback((callback) => {
    onSyncSuccessRef.current = callback;
    return () => {
      if (onSyncSuccessRef.current === callback) {
        onSyncSuccessRef.current = null;
      }
    };
  }, []);

  return (
    <OfflineContext.Provider
      value={{
        isOfflineMode,
        networkOffline,
        usingOfflineData,
        setUsingOfflineData,
        pendingSyncCount,
        loadPendingSyncCount,
        runPendingSync,
        registerSyncSuccess,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error("useOffline must be used within OfflineProvider");
  }
  return context;
}

export default OfflineContext;
