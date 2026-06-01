import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Page from "../components/Page";
import {
  IconArrowLeft,
  IconChevronRight,
  IconDownload,
  IconFileSpreadsheet,
  IconLoader2,
  IconSearch,
  IconFilter
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { iconStroke } from "../config/config";
import { CURRENCIES } from "../config/currencies.config";
import { REPORT_CATALOG, REPORT_CATEGORIES } from "../config/reportCatalog";
import { useReport } from "../controllers/reports.controller";
import {
  exportReportToExcel,
  exportReportToPdf,
  formatReportValue,
} from "../utils/reportExports.jsx";
import { getReportPageComponent } from "./reports/reportPageRegistry.jsx";
import { DATE_FILTER_KEYS, useReportLabels } from "../helpers/reportI18n";

const ALL_REPORTS_CATEGORY = "All";

const READY_REPORTS = new Set([
  "sales-summary", "gross-sales", "net-sales", "sales-by-hour", "sales-by-day",
  "sales-by-month", "sales-by-order-type", "sales-by-table", "invoice-detail",
  "voids-cancellations", "average-order-value", "payment-summary", "cash-report",
  "card-report", "unpaid-orders", "payment-type-mix", "top-selling-items",
  "low-selling-items", "item-sales", "category-sales", "variant-sales",
  "addon-sales", "menu-price-audit", "customer-summary", "new-customers",
  "returning-customers", "top-customers", "customer-birthdays", "member-customers",
  "order-status", "kitchen-performance", "token-report", "qr-order-report",
  "table-turnover", "staff-created-orders", "inventory-summary", "low-stock",
  "stock-movements", "wastage", "recipe-usage", "stock-reorder", "tax-summary",
  "tax-by-item", "service-charge", "daily-close", "invoice-register",
  "reservation-summary", "upcoming-reservations", "reservation-no-show",
  "feedback-summary", "negative-feedback", "recommendation-score",
]);

const categoryAccentClasses = [
  "text-restro-green bg-restro-green-10",
  "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
  "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-950/30",
  "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30",
  "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
  "text-violet-600 bg-violet-50 dark:bg-violet-950/30",
  "text-teal-600 bg-teal-50 dark:bg-teal-950/30",
];

const getDefaultDate = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

function getCurrencySymbol(currencyCode) {
  return CURRENCIES.find((currency) => currency.cc === currencyCode)?.symbol || "";
}

function ReportStatus({ status }) {
  const { t } = useTranslation();
  const isReady = status === "ready";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${isReady ? "bg-restro-green-10 text-restro-green" : "bg-restro-bg-gray text-restro-text"}`}>
      {isReady ? t("reports.status.ready") : t("reports.status.planned")}
    </span>
  );
}

function ReportCard({ report, onOpen, reportTitle, reportDescription }) {
  const { t } = useTranslation();
  const Icon = report.icon;

  return (
    <button
      type="button"
      onClick={() => onOpen(report)}
      className="group relative flex h-full flex-col items-start rounded-xl border border-restro-border-green bg-background p-5 text-left transition-all hover:-translate-y-1 hover:border-restro-green hover:shadow-md"
    >
      <div className="flex w-full items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-restro-bg-gray text-restro-text transition-colors group-hover:bg-restro-green-10 group-hover:text-restro-green">
          <Icon size={20} stroke={iconStroke} />
        </span>
        <ReportStatus status={report.status} />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="font-bold text-foreground group-hover:text-restro-green">{reportTitle(report)}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-restro-text">{reportDescription(report)}</p>
      </div>

      <div className="mt-4 flex w-full items-center justify-end">
        <span className="flex items-center gap-1 text-xs font-bold text-restro-text opacity-0 transition-all group-hover:text-restro-green group-hover:opacity-100">
          {t("reports.index.open_report")} <IconChevronRight size={14} stroke={iconStroke} />
        </span>
      </div>
    </button>
  );
}

function ReportsIndex() {
  const { t } = useTranslation();
  const { categoryLabel, reportTitle, reportDescription } = useReportLabels();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_REPORTS_CATEGORY);
  const normalizedQuery = query.trim().toLowerCase();

  const groupedReports = useMemo(() => {
    return REPORT_CATEGORIES.map((categoryName) => {
      const reports = REPORT_CATALOG.filter((report) => {
        if (report.category !== categoryName) return false;
        if (category !== ALL_REPORTS_CATEGORY && report.category !== category) return false;
        if (!normalizedQuery) return true;

        const searchable = [
          report.title,
          report.category,
          report.description,
          report.priority,
          reportTitle(report),
          reportDescription(report),
          categoryLabel(report.category),
          ...(report.keywords || []),
        ].join(" ").toLowerCase();

        return searchable.includes(normalizedQuery);
      });

      return { category: categoryName, reports };
    }).filter((group) => group.reports.length > 0);
  }, [category, normalizedQuery, categoryLabel, reportTitle, reportDescription]);

  const readyReports = REPORT_CATALOG.filter((report) => report.status === "ready").length;

  return (
    <Page className="min-h-[calc(100vh-10rem)] bg-restro-bg-gray/20 px-4 py-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-6 lg:gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-60 lg:w-64 shrink-0">
          <div className="sticky top-20 md:top-24">
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("reports.title")}</h1>
              <p className="mt-2 text-sm text-restro-text">
                {t("reports.index.subtitle")}{" "}
                <span className="font-medium text-foreground">
                  {t("reports.index.available_count", { count: readyReports })}
                </span>
                .
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-3 hidden text-xs font-bold uppercase tracking-wider text-restro-text md:block">
                {t("reports.index.categories_heading")}
              </h3>
              <div className="custom-scroll-wrapper flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0 md:after:hidden">
                <button
                  type="button"
                  onClick={() => setCategory(ALL_REPORTS_CATEGORY)}
                  className={`flex h-10 shrink-0 items-center justify-between rounded-lg px-4 text-sm font-semibold transition md:h-auto md:shrink md:py-2.5 ${category === ALL_REPORTS_CATEGORY ? "bg-restro-green text-white shadow-md md:shadow-sm" : "bg-restro-bg-gray text-restro-text hover:bg-restro-border-green hover:text-foreground md:bg-transparent md:hover:bg-restro-bg-gray"}`}
                >
                  <span>{t("reports.index.all_reports")}</span>
                  <span className={`hidden md:block rounded-full px-2 py-0.5 text-[10px] ${category === ALL_REPORTS_CATEGORY ? "bg-white/20" : "bg-restro-border-green"}`}>{REPORT_CATALOG.length}</span>
                </button>
                {REPORT_CATEGORIES.map((categoryName) => {
                  const isSelected = category === categoryName;
                  const count = REPORT_CATALOG.filter((r) => r.category === categoryName).length;
                  return (
                    <button
                      key={categoryName}
                      type="button"
                      onClick={() => setCategory(categoryName)}
                      className={`flex h-10 shrink-0 items-center justify-between rounded-lg px-4 text-sm font-semibold transition md:h-auto md:shrink md:py-2.5 ${isSelected ? "bg-restro-text text-white shadow-md md:shadow-sm" : "bg-restro-bg-gray text-restro-text hover:bg-restro-border-green hover:text-foreground md:bg-transparent md:hover:bg-restro-bg-gray"}`}
                    >
                      <span>{categoryLabel(categoryName)}</span>
                      <span className={`hidden md:block rounded-full px-2 py-0.5 text-[10px] ${isSelected ? "bg-white/20 text-white" : "bg-restro-border-green text-restro-text"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Search */}
          <div className="sticky top-20 z-10 mb-8 rounded-2xl border border-restro-border-green bg-background/80 p-2 shadow-sm backdrop-blur-md md:top-24">
            <div className="relative">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-restro-text" size={20} stroke={iconStroke} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full rounded-xl border-none bg-transparent pl-11 pr-4 text-sm outline-none transition focus:ring-0 md:h-12"
                placeholder={t("reports.index.search_placeholder")}
              />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="space-y-10">
            {groupedReports.map((group) => (
              <section key={group.category}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">{categoryLabel(group.category)}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.reports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      reportTitle={reportTitle}
                      reportDescription={reportDescription}
                      onOpen={(selectedReport) => navigate(`/dashboard/reports/${selectedReport.id}`)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {groupedReports.length === 0 && (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-restro-border-green bg-background py-20 text-center">
              <IconSearch className="mb-4 text-restro-text opacity-50" size={48} stroke={iconStroke} />
              <h3 className="text-lg font-bold text-foreground">{t("reports.index.no_results_title")}</h3>
              <p className="mt-1 text-restro-text">{t("reports.index.no_results_message")}</p>
              <button
                onClick={() => { setQuery(""); setCategory(ALL_REPORTS_CATEGORY); }}
                className="mt-4 rounded-lg bg-restro-bg-gray px-4 py-2 text-sm font-bold text-foreground hover:bg-restro-border-green"
              >
                {t("reports.index.clear_filters")}
              </button>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

function SummaryGrid({ summary, currency }) {
  if (!summary?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map((item) => (
        <div key={item.label} className="flex flex-col justify-center rounded-xl border border-restro-border-green bg-background p-5 shadow-sm">
          <p className="text-sm font-medium text-restro-text">{item.label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{formatReportValue(item.value, item.type, currency)}</p>
        </div>
      ))}
    </div>
  );
}

function DataTable({ table, currency }) {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-xl border border-restro-border-green bg-background shadow-sm">
      <div className="border-b border-restro-border-green bg-restro-bg-gray/30 px-5 py-4">
        <h2 className="font-bold text-foreground">{table.title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background">
            <tr className="border-b border-restro-border-green text-restro-text">
              {(table.columns || []).map((column) => (
                <th key={column.key} className={`whitespace-nowrap px-5 py-3 font-semibold ${column.type === "money" || column.type === "number" || column.type === "quantity" ? "text-right" : ""}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-restro-border-green">
            {(table.rows || []).length === 0 && (
              <tr>
                <td colSpan={(table.columns || []).length || 1} className="py-12 text-center text-restro-text">
                  {t("reports.detail.no_table_data")}
                </td>
              </tr>
            )}
            {(table.rows || []).map((row, rowIndex) => (
              <tr key={row.id || row.invoice_id || row.order_item_id || rowIndex} className="transition-colors hover:bg-restro-bg-gray/30">
                {(table.columns || []).map((column) => (
                  <td key={column.key} className={`whitespace-nowrap px-5 py-3 ${column.type === "money" || column.type === "number" || column.type === "quantity" ? "text-right tabular-nums" : ""}`}>
                    {formatReportValue(row[column.key], column.type, currency)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportFilterBar({ state, setState, isLoading }) {
  const { t } = useTranslation();
  const isCustom = state.filter === "custom";

  return (
    <div className="rounded-xl border border-restro-border-green bg-background p-2 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="custom-scroll-wrapper flex gap-1 overflow-x-auto pb-1 xl:pb-0">
          {DATE_FILTER_KEYS.map((filterKey) => (
            <button
              key={filterKey}
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (filterKey === "custom") {
                  setState((current) => ({
                    filter: "custom",
                    fromDate: current.fromDate || getDefaultDate(-6),
                    toDate: current.toDate || getDefaultDate(),
                  }));
                  return;
                }
                setState({ filter: filterKey, fromDate: null, toDate: null });
              }}
              className={`h-10 shrink-0 rounded-lg px-4 text-sm font-semibold transition ${state.filter === filterKey ? "bg-restro-text text-white shadow-md" : "text-restro-text hover:bg-restro-bg-gray hover:text-foreground"} disabled:opacity-50`}
            >
              {t(`reports.filters.${filterKey}`)}
            </button>
          ))}
        </div>

        {isCustom && (
          <div className="flex items-center gap-2 xl:w-auto">
            <div className="flex items-center rounded-lg border border-restro-border-green bg-background px-2 focus-within:border-restro-green">
              <span className="text-xs font-bold text-restro-text">{t("reports.from")}</span>
              <input
                type="date"
                value={state.fromDate || getDefaultDate(-6)}
                onChange={(event) => setState((current) => ({ ...current, fromDate: event.target.value }))}
                className="h-10 border-none bg-transparent px-2 text-sm outline-none"
              />
            </div>
            <span className="text-restro-text">-</span>
            <div className="flex items-center rounded-lg border border-restro-border-green bg-background px-2 focus-within:border-restro-green">
              <span className="text-xs font-bold text-restro-text">{t("reports.to")}</span>
              <input
                type="date"
                value={state.toDate || getDefaultDate()}
                onChange={(event) => setState((current) => ({ ...current, toDate: event.target.value }))}
                className="h-10 border-none bg-transparent px-2 text-sm outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExportMenu({ isExporting, data, onExport }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={isExporting || !data}
        onClick={() => onExport("excel")}
        className="flex h-10 items-center gap-2 rounded-lg border border-restro-border-green bg-background px-4 text-sm font-bold text-foreground transition hover:bg-restro-bg-gray disabled:opacity-50"
      >
        <IconFileSpreadsheet size={18} stroke={iconStroke} /> {t("reports.detail.export_excel")}
      </button>
      <button
        type="button"
        disabled={isExporting || !data}
        onClick={() => onExport("pdf")}
        className="flex h-10 items-center gap-2 rounded-lg bg-restro-green px-4 text-sm font-bold text-white transition hover:bg-restro-green/90 disabled:opacity-50"
      >
        <IconDownload size={18} stroke={iconStroke} /> {t("reports.detail.export_pdf")}
      </button>
    </div>
  );
}

function PlannedReport({ report }) {
  const { t } = useTranslation();
  const { categoryLabel, reportTitle, reportDescription } = useReportLabels();
  const Icon = report.icon;
  const navigate = useNavigate();

  return (
    <Page className="bg-restro-bg-gray/20 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <button type="button" onClick={() => navigate("/dashboard/reports")} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-restro-text transition hover:text-foreground">
          <IconArrowLeft size={18} stroke={iconStroke} /> {t("reports.detail.back")}
        </button>

        <div className="rounded-2xl border border-restro-border-green bg-background p-8 shadow-sm md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-restro-bg-gray text-restro-text">
              <Icon size={32} stroke={iconStroke} />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-restro-green">{categoryLabel(report.category)}</p>
              <h1 className="mt-1 text-3xl font-bold text-foreground">{reportTitle(report)}</h1>
              <p className="mt-3 text-lg text-restro-text">{reportDescription(report)}</p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-xl border border-dashed border-restro-border-green bg-restro-bg-gray/30 p-5 text-restro-text">
            <IconLoader2 className="animate-spin text-restro-green" size={24} />
            <p>
              {t("reports.detail.planned_message")}{" "}
              <span className="font-bold text-foreground">{t("reports.detail.planned_doc")}</span>.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ReportDetail({ report }) {
  const { t } = useTranslation();
  const { categoryLabel, reportTitle } = useReportLabels();
  const navigate = useNavigate();
  const ReportPageComponent = getReportPageComponent(report.id);
  const [filterState, setFilterState] = useState({ filter: "today", fromDate: null, toDate: null });
  const [isExporting, setIsExporting] = useState(false);
  const { data, error, isLoading } = useReport({
    reportId: report.id,
    type: filterState.filter,
    from: filterState.fromDate,
    to: filterState.toDate,
  });

  const filterLabel = t(`reports.filters.${filterState.filter}`, {
    defaultValue: filterState.filter,
  });
  const currency = getCurrencySymbol(data?.currency);

  const exportReport = async (format) => {
    try {
      setIsExporting(true);
      if (format === "excel") {
        await exportReportToExcel(data, currency);
      } else {
        await exportReportToPdf(data, currency, filterLabel);
      }
      const formatLabel =
        format === "excel" ? t("reports.detail.export_excel") : t("reports.detail.export_pdf");
      toast.success(t("reports.detail.export_success", { format: formatLabel }));
    } catch (error) {
      console.error(error);
      toast.error(t("reports.detail.export_error"));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Page className="bg-restro-bg-gray/20 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <button type="button" onClick={() => navigate("/dashboard/reports")} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-restro-text transition hover:text-foreground">
          <IconArrowLeft size={18} stroke={iconStroke} /> {t("reports.detail.back")}
        </button>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-restro-green-10 text-restro-green">
                <report.icon size={18} stroke={iconStroke} />
              </span>
              <p className="text-sm font-bold uppercase tracking-wider text-restro-green">{categoryLabel(report.category)}</p>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{reportTitle(report)}</h1>
            <p className="mt-2 text-restro-text">
              {t("reports.detail.showing_data_for")}{" "}
              <span className="font-semibold text-foreground">{filterLabel}</span>
            </p>
          </div>

          <ExportMenu isExporting={isExporting} data={data} onExport={exportReport} />
        </div>

        <div className="mt-8">
          <ReportFilterBar state={filterState} setState={setFilterState} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="mt-10 flex min-h-[40vh] flex-col items-center justify-center gap-4 text-restro-text">
            <IconLoader2 className="animate-spin text-restro-green" size={40} stroke={iconStroke} />
            <p className="font-medium">{t("reports.detail.loading")}</p>
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-2xl border border-dashed border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900/50 dark:bg-red-950/20">
            <h3 className="text-lg font-bold">{t("reports.detail.load_error_title")}</h3>
            <p className="mt-1 text-sm opacity-80">{t("reports.detail.load_error_message")}</p>
          </div>
        )}

        {data && (
          <ReportPageComponent
            report={report}
            data={data}
            currency={currency}
            filterLabel={filterLabel}
            components={{ SummaryGrid, DataTable }}
          />
        )}
      </div>
    </Page>
  );
}

export default function ReportsPage() {
  const { t } = useTranslation();
  const { reportId } = useParams();
  const selectedReport = REPORT_CATALOG.find((report) => report.id === reportId);

  if (reportId && !selectedReport) {
    return (
      <Page className="flex min-h-[50vh] items-center justify-center px-4 py-8">
        <div className="rounded-xl border border-restro-border-green bg-background p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-foreground">{t("reports.detail.not_found_title")}</h2>
          <p className="mt-2 text-restro-text">{t("reports.detail.not_found_message")}</p>
        </div>
      </Page>
    );
  }

  if (selectedReport && (!READY_REPORTS.has(selectedReport.id) || selectedReport.status !== "ready")) {
    return <PlannedReport report={selectedReport} />;
  }

  if (selectedReport) {
    return <ReportDetail report={selectedReport} />;
  }

  return <ReportsIndex />;
}
