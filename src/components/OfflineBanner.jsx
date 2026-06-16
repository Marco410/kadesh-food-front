import React from "react";
import { useTranslation } from "react-i18next";
import { IconCloudOff, IconRefresh } from "@tabler/icons-react";
import { iconStroke } from "../config/config";
import { useOffline } from "../contexts/OfflineContext";

export default function OfflineBanner() {
  const { t } = useTranslation();
  const { isOfflineMode, pendingSyncCount, runPendingSync } = useOffline();

  if (!isOfflineMode && pendingSyncCount <= 0) {
    return null;
  }

  return (
    <div
      className={`border-b px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isOfflineMode
          ? "border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-700"
          : "border-restro-border-green bg-restro-green-light/50 text-gray-800 dark:bg-restro-green/10 dark:text-gray-100"
      }`}
    >
      <div className="flex items-start gap-3">
        {isOfflineMode ? (
          <IconCloudOff size={22} className="flex-shrink-0 mt-0.5" stroke={iconStroke} />
        ) : (
          <IconRefresh size={22} className="flex-shrink-0 mt-0.5" stroke={iconStroke} />
        )}
        <div>
          <p className="font-semibold text-sm">
            {isOfflineMode
              ? t("pos.offline.banner_title")
              : t("pos.offline.pending_title")}
          </p>
          <p className="text-sm opacity-90">
            {isOfflineMode
              ? t("pos.offline.banner_message")
              : t("pos.offline.pending_message", { count: pendingSyncCount })}
          </p>
        </div>
      </div>
      {!isOfflineMode && pendingSyncCount > 0 && (
        <button
          type="button"
          onClick={() => runPendingSync(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-restro-green px-4 py-2 text-sm font-semibold text-white hover:bg-restro-green-button-hover shrink-0"
        >
          <IconRefresh size={16} stroke={iconStroke} />
          {t("pos.offline.sync_now")}
        </button>
      )}
    </div>
  );
}
