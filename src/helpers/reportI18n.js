import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const CATEGORY_KEYS = {
  Sales: "sales",
  Payments: "payments",
  Menu: "menu",
  Customers: "customers",
  Operations: "operations",
  Inventory: "inventory",
  Accounting: "accounting",
  Reservations: "reservations",
  Feedback: "feedback",
};

export function useReportLabels() {
  const { t } = useTranslation();

  const categoryLabel = useCallback(
    (categoryName) => {
      const key = CATEGORY_KEYS[categoryName];
      return key
        ? t(`reports.categories.${key}`, { defaultValue: categoryName })
        : categoryName;
    },
    [t]
  );

  const reportTitle = useCallback(
    (report) =>
      t(`reports.catalog.${report.id}.title`, { defaultValue: report.title }),
    [t]
  );

  const reportDescription = useCallback(
    (report) =>
      t(`reports.catalog.${report.id}.description`, {
        defaultValue: report.description,
      }),
    [t]
  );

  return { categoryLabel, reportTitle, reportDescription };
}

export const DATE_FILTER_KEYS = [
  "today",
  "yesterday",
  "last_7days",
  "this_month",
  "last_month",
  "custom",
];
