import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REPORT_CATALOG, REPORT_CATEGORIES } from "../src/config/reportCatalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const categoryEs = {
  sales: "Ventas",
  payments: "Pagos",
  menu: "Menú",
  customers: "Clientes",
  operations: "Operaciones",
  inventory: "Inventario",
  accounting: "Contabilidad",
  reservations: "Reservaciones",
  feedback: "Comentarios",
};

const catalogEs = {
  "sales-summary": {
    title: "Resumen de ventas",
    description:
      "Ingresos, ventas netas, impuestos, cargo por servicio, pedidos, ticket promedio, clientes, artículos destacados y reparto de pagos.",
  },
  "gross-sales": {
    title: "Ventas brutas",
    description:
      "Ventas totales de artículos antes de impuestos, cargos por servicio, reembolsos, anulaciones y descuentos.",
  },
  "net-sales": {
    title: "Ventas netas",
    description:
      "Ventas después de descuentos y anulaciones, separadas por impuesto, cargo por servicio y total de pago.",
  },
  "sales-by-hour": {
    title: "Ventas por hora",
    description:
      "Tendencia de ventas por hora para entender horas pico y periodos tranquilos.",
  },
  "sales-by-day": {
    title: "Ventas por día",
    description:
      "Totales diarios de ventas, cantidad de pedidos, ticket promedio y número de clientes.",
  },
  "sales-by-month": {
    title: "Ventas por mes",
    description: "Tendencia mensual de ingresos para revisión del negocio.",
  },
  "sales-by-order-type": {
    title: "Ventas por tipo de pedido",
    description:
      "Rendimiento de consumo en local, para llevar, entrega, pedidos QR y otros tipos de servicio.",
  },
  "sales-by-table": {
    title: "Ventas por mesa",
    description:
      "Ingresos, pedidos y ticket promedio agrupados por mesa y zona.",
  },
  "invoice-detail": {
    title: "Detalle de facturas",
    description:
      "Totales de factura línea por línea con método de pago, impuesto, cargo por servicio y cliente.",
  },
  "voids-cancellations": {
    title: "Anulaciones y cancelaciones",
    description:
      "Pedidos cancelados y artículos cancelados con cantidades y valor de venta perdido.",
  },
  "average-order-value": {
    title: "Valor promedio del pedido",
    description:
      "Tendencia del ticket promedio en los periodos y tipos de servicio seleccionados.",
  },
  "payment-summary": {
    title: "Resumen de pagos",
    description:
      "Pagos agrupados por efectivo, tarjeta, billetera, en línea y tipos de pago personalizados.",
  },
  "cash-report": {
    title: "Informe de efectivo",
    description:
      "Cobros en efectivo, facturas en efectivo y participación del efectivo en el total de pagos.",
  },
  "card-report": {
    title: "Informe de tarjeta",
    description:
      "Volumen de pagos con tarjeta y cantidad de transacciones por fecha y factura.",
  },
  "unpaid-orders": {
    title: "Pedidos sin pagar",
    description:
      "Pedidos con pago pendiente para seguimiento y cierre de cuentas.",
  },
  "payment-type-mix": {
    title: "Mezcla de tipos de pago",
    description:
      "Participación de ingresos por método de pago con tendencia y comparación.",
  },
  "top-selling-items": {
    title: "Artículos más vendidos",
    description:
      "Artículos del menú más vendidos por cantidad, ingresos, categoría y rango de fechas.",
  },
  "low-selling-items": {
    title: "Artículos de baja venta",
    description:
      "Artículos con poco movimiento para simplificar el menú.",
  },
  "item-sales": {
    title: "Ventas por artículo",
    description:
      "Ingresos detallados por artículo, cantidad vendida, precio neto, impuesto y categoría.",
  },
  "category-sales": {
    title: "Ventas por categoría",
    description:
      "Rendimiento de ventas por categoría: comida, bebidas, postres y personalizadas.",
  },
  "variant-sales": {
    title: "Ventas por variante",
    description:
      "Rendimiento de ventas por tamaño, preparación y variantes.",
  },
  "addon-sales": {
    title: "Ventas de complementos",
    description: "Ingresos y cantidad de complementos y modificadores de pago.",
  },
  "menu-price-audit": {
    title: "Auditoría de precios del menú",
    description:
      "Precio actual de artículos, variantes, complementos, precio neto e impuestos para revisión del menú.",
  },
  "customer-summary": {
    title: "Resumen de clientes",
    description:
      "Rendimiento de clientes totales, nuevos, recurrentes, miembros e invitados.",
  },
  "new-customers": {
    title: "Clientes nuevos",
    description:
      "Clientes creados en el periodo seleccionado con datos de contacto.",
  },
  "returning-customers": {
    title: "Clientes recurrentes",
    description: "Clientes que realizaron pedidos en el periodo seleccionado.",
  },
  "top-customers": {
    title: "Mejores clientes",
    description:
      "Mejores clientes por gasto, visitas y ticket promedio.",
  },
  "customer-birthdays": {
    title: "Cumpleaños de clientes",
    description:
      "Próximos cumpleaños para campañas y fidelización.",
  },
  "member-customers": {
    title: "Clientes miembros",
    description: "Lista de membresía y contribución de ventas de miembros.",
  },
  "order-status": {
    title: "Estado de pedidos",
    description:
      "Movimiento de pedidos creados, completados, cancelados, pagados y pendientes.",
  },
  "kitchen-performance": {
    title: "Rendimiento de cocina",
    description:
      "Volumen de artículos preparados, completados, cancelados y entregados.",
  },
  "token-report": {
    title: "Informe de fichas",
    description:
      "Secuencia de fichas y flujo de pedidos para mostrador y food trucks.",
  },
  "qr-order-report": {
    title: "Informe de pedidos QR",
    description:
      "Volumen de pedidos QR, estado, mesa y mezcla de clientes.",
  },
  "table-turnover": {
    title: "Rotación de mesas",
    description:
      "Pedidos y ventas por mesa para identificar zonas de alto uso.",
  },
  "staff-created-orders": {
    title: "Pedidos creados por personal",
    description:
      "Actividad de pedidos y facturas por personal cuando hay seguimiento de usuario.",
  },
  "inventory-summary": {
    title: "Resumen de inventario",
    description: "Stock actual, unidades, umbrales y estado de inventario.",
  },
  "low-stock": {
    title: "Stock bajo",
    description: "Ingredientes y artículos por debajo del umbral mínimo.",
  },
  "stock-movements": {
    title: "Movimientos de stock",
    description:
      "Registros de ENTRADA, SALIDA y MERMA con cantidades antes y después.",
  },
  wastage: {
    title: "Merma",
    description:
      "Cantidad de merma por ingrediente, fecha, nota y personal.",
  },
  "recipe-usage": {
    title: "Uso de recetas",
    description:
      "Estimación de uso de ingredientes según recetas, variantes y complementos.",
  },
  "stock-reorder": {
    title: "Lista de reorden",
    description:
      "Lista sugerida de reabastecimiento según stock actual y umbrales mínimos.",
  },
  "tax-summary": {
    title: "Resumen de impuestos",
    description:
      "Impuestos cobrados por periodo con configuración inclusiva y exclusiva.",
  },
  "tax-by-item": {
    title: "Impuesto por artículo",
    description:
      "Configuración de impuestos y ventas gravables agrupadas por artículo del menú.",
  },
  "service-charge": {
    title: "Cargo por servicio",
    description: "Total de cargo por servicio y participación en los ingresos.",
  },
  "daily-close": {
    title: "Cierre diario",
    description:
      "Resumen de fin de día: ventas, pagos, impuestos, cargo por servicio y pedidos sin pagar.",
  },
  "invoice-register": {
    title: "Registro de facturas",
    description: "Libro cronológico de facturas para revisión contable.",
  },
  "reservation-summary": {
    title: "Resumen de reservaciones",
    description:
      "Reservaciones por estado, número de personas, fecha y mesa.",
  },
  "upcoming-reservations": {
    title: "Próximas reservaciones",
    description:
      "Reservas futuras con cliente, mesa, número de personas y notas.",
  },
  "reservation-no-show": {
    title: "Reservaciones no presentadas",
    description:
      "Reservas que no generaron actividad en mesa cuando hay datos disponibles.",
  },
  "feedback-summary": {
    title: "Resumen de comentarios",
    description:
      "Calificación promedio, comida, servicio, personal, ambiente y recomendación.",
  },
  "negative-feedback": {
    title: "Comentarios negativos",
    description:
      "Comentarios de baja calificación y observaciones para recuperación del servicio.",
  },
  "recommendation-score": {
    title: "Puntuación de recomendación",
    description:
      "Tendencia y distribución de la calificación de recomendación por periodo.",
  },
};

function buildCatalog(locale) {
  const catalog = {};
  for (const report of REPORT_CATALOG) {
    if (locale === "es" && catalogEs[report.id]) {
      catalog[report.id] = catalogEs[report.id];
    } else {
      catalog[report.id] = { title: report.title, description: report.description };
    }
  }
  return catalog;
}

function buildCategories(locale) {
  const categories = {};
  for (const name of REPORT_CATEGORIES) {
    const key = name.toLowerCase();
    categories[key] = locale === "es" ? categoryEs[key] : name;
  }
  return categories;
}

function mergeLocale(locale) {
  const filePath = path.join(root, "public/locales", locale, "translation.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  data.reports = {
    ...data.reports,
    index: {
      subtitle: locale === "es" ? "Analiza tu rendimiento." : "Analyze your performance.",
      available_count:
        locale === "es" ? "{{count}} disponibles" : "{{count}} available",
      categories_heading: locale === "es" ? "Categorías" : "Categories",
      all_reports: locale === "es" ? "Todos los informes" : "All Reports",
      all_filter: "All",
      search_placeholder:
        locale === "es"
          ? "Buscar informes por nombre, palabra clave o categoría..."
          : "Search reports by name, keyword, or category...",
      no_results_title:
        locale === "es" ? "No se encontraron informes" : "No reports found",
      no_results_message:
        locale === "es"
          ? "Prueba ajustar tu búsqueda o los filtros."
          : "Try adjusting your search or filter criteria.",
      clear_filters: locale === "es" ? "Limpiar filtros" : "Clear Filters",
      open_report: locale === "es" ? "Abrir informe" : "Open Report",
    },
    status: {
      ready: locale === "es" ? "Listo" : "Ready",
      planned: locale === "es" ? "Planificado" : "Planned",
    },
    detail: {
      back: locale === "es" ? "Volver a informes" : "Back to Reports",
      showing_data_for:
        locale === "es" ? "Mostrando datos de" : "Showing data for",
      loading:
        locale === "es" ? "Procesando los números..." : "Crunching the numbers...",
      load_error_title:
        locale === "es" ? "Error al cargar el informe" : "Failed to load report",
      load_error_message:
        locale === "es"
          ? "Hubo un problema al obtener estos datos. Inténtalo más tarde."
          : "There was a problem fetching this data. Please try again later.",
      no_table_data:
        locale === "es"
          ? "No hay datos disponibles para este periodo."
          : "No data available for this period.",
      not_found_title:
        locale === "es" ? "Informe no encontrado" : "Report Not Found",
      not_found_message:
        locale === "es"
          ? "El informe que buscas no existe o fue movido."
          : "The report you are looking for doesn't exist or has been moved.",
      planned_message:
        locale === "es"
          ? "Este informe está planificado para una fase posterior y se está siguiendo en"
          : "This report is planned for a later phase and is currently being tracked in",
      planned_doc: "docs/reports-roadmap.md",
      export_excel: "Excel",
      export_pdf: "PDF",
      export_success:
        locale === "es"
          ? "Informe {{format}} exportado"
          : "{{format}} report exported",
      export_error:
        locale === "es"
          ? "No se pudo exportar el informe. Inténtalo de nuevo."
          : "Could not export report. Please try again.",
    },
    categories: buildCategories(locale),
    catalog: buildCatalog(locale),
  };

  data.dashboard = {
    ...data.dashboard,
    greeting_morning: locale === "es" ? "Buenos días" : "Good Morning",
    greeting_afternoon: locale === "es" ? "Buenas tardes" : "Good Afternoon",
    greeting_evening: locale === "es" ? "Buenas noches" : "Good Evening",
    view_reports: locale === "es" ? "Ver informes" : "View Reports",
    todays_revenue: locale === "es" ? "Ingresos de hoy" : "Today's Revenue",
    avg_order_value:
      locale === "es" ? "Ticket promedio" : "Avg Order Value",
    new_customers_short:
      locale === "es" ? "Clientes nuevos" : "New Customers",
    order_type_breakdown:
      locale === "es" ? "Desglose por tipo de pedido" : "Order Type Breakdown",
    payment_mix: locale === "es" ? "Mezcla de pagos" : "Payment Mix",
    cancelled_orders:
      locale === "es" ? "Pedidos cancelados" : "Cancelled Orders",
    tax_collected: locale === "es" ? "Impuestos cobrados" : "Tax Collected",
    service_charge: locale === "es" ? "Cargo por servicio" : "Service Charge",
    vs_yesterday: locale === "es" ? "vs ayer" : "vs yesterday",
    revenue_trend: locale === "es" ? "Tendencia de ingresos" : "Revenue Trend",
    last_7_days: locale === "es" ? "Últimos 7 días" : "Last 7 days",
    no_revenue_7_days:
      locale === "es"
        ? "No hay datos de ingresos en los últimos 7 días."
        : "No revenue data for the last 7 days.",
    peak_hours: locale === "es" ? "Horas pico" : "Peak Hours",
    no_sales_today:
      locale === "es"
        ? "Aún no hay datos de ventas hoy."
        : "No sales data yet today.",
    today: locale === "es" ? "Hoy" : "Today",
    chart_revenue: locale === "es" ? "Ingresos" : "Revenue",
    chart_orders: locale === "es" ? "Pedidos" : "Orders",
    chart_orders_tooltip:
      locale === "es" ? "{{count}} pedidos" : "{{count}} orders",
    other: locale === "es" ? "Otro" : "Other",
    total: locale === "es" ? "Total" : "Total",
    no_data: locale === "es" ? "No hay datos disponibles." : "No data available.",
    top_selling_items_today:
      locale === "es" ? "Artículos más vendidos" : "Top Selling Items",
    no_items_sold_today:
      locale === "es"
        ? "Aún no se han vendido artículos hoy."
        : "No items sold yet today.",
    low_stock_alerts:
      locale === "es" ? "Alertas de stock bajo" : "Low Stock Alerts",
    all_stocked_up:
      locale === "es" ? "¡Todo en stock!" : "All stocked up!",
    no_items_below_threshold:
      locale === "es"
        ? "Ningún artículo por debajo del umbral."
        : "No items below threshold.",
    recent_feedback:
      locale === "es" ? "Comentarios recientes" : "Recent Feedback",
    no_feedback_yet:
      locale === "es" ? "Aún no hay comentarios." : "No feedback yet.",
    todays_reservations:
      locale === "es" ? "Reservaciones de hoy" : "Today's Reservations",
    no_reservations_today:
      locale === "es"
        ? "No hay reservaciones hoy."
        : "No reservations today.",
  };

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${filePath}`);
}

mergeLocale("en");
mergeLocale("es");
