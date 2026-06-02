import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useScopeLabel() {
  const { t } = useTranslation();

  return useCallback(
    (scopeKey) => t(`scope_labels.${scopeKey}`, { defaultValue: scopeKey }),
    [t]
  );
}
