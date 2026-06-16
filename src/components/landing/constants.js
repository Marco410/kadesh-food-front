export const FOOD_BRAND_COLORS = {
  primary: "#70B56A",
  primaryHover: "#629c5d",
  primaryLight: "#ECF1EB",
  primaryMuted: "#70b56a18",
  text: "#111827",
  textMuted: "#6B7280",
  background: "#FFFFFF",
  surface: "#F9FAFB",
  border: "#DCE7DB",
};

export const LANDING_DOMAIN = "https://food.kadesh.com.mx";

export const LANDING_WHATSAPP = {
  phone: "524439382330",
  message: "Hola, tengo una duda sobre Kadesh FOOD.",
  label: "Escríbenos por WhatsApp",
};

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${LANDING_WHATSAPP.phone}?text=${encodeURIComponent(message)}`;
}

export function buildDemoWhatsAppMessage(day, time) {
  return `Hola, me gustaría agendar una demo en vivo de Kadesh FOOD (15 min).\n\nDía: ${day}\nHorario: ${time}\n\n¡Gracias!`;
}

export const LANDING_DEMO = {
  title: "Agenda una demo en vivo (15 min)",
  subtitle:
    "En una sesión corta te mostramos cómo Kadesh FOOD puede ayudar a tu restaurante. Elige día y horario; te llevamos a WhatsApp con el mensaje listo.",
  dayLabel: "Día (lunes — viernes)",
  timeLabel: "Horario",
  hint: "Selecciona un día y una hora para continuar.",
  ctaLabel: "Agendar demo",
  days: [
    { id: "lunes", label: "Lunes" },
    { id: "martes", label: "Martes" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
  ],
  times: [
    { id: "09:00", label: "9:00 a. m." },
    { id: "09:30", label: "9:30 a. m." },
    { id: "11:30", label: "11:30 a. m." },
    { id: "12:00", label: "12:00 p. m." },
    { id: "15:30", label: "3:30 p. m." },
    { id: "16:00", label: "4:00 p. m." },
    { id: "16:30", label: "4:30 p. m." },
  ],
};

export const LANDING_ANCHORS = {
  inicio: "#inicio",
  demo: "#demo",
  comoFunciona: "#como-funciona",
  plataforma: "#plataforma",
  dashboard: "#dashboard",
  pos: "#pos",
  cocina: "#cocina",
  pedidos: "#pedidos",
  reservaciones: "#reservaciones",
  clientes: "#clientes",
  menuQr: "#menu-qr",
  offline: "#modo-offline",
  planes: "#planes",
  beneficios: "#beneficios",
  inventario: "#inventario",
  configuracion: "#configuracion",
  faq: "#faq",
  registro: "#registro",
};

export const LANDING_SHOWCASE_MODULES = [
  {
    id: "control",
    title: "Control del negocio",
    headline: "Toma el control de tu negocio de comida",
    description:
      "Visualiza ingresos, tendencias y operación en un solo panel. Información en la nube, siempre accesible desde cualquier dispositivo.",
    image: "/images/food/hero-control.png",
    imageAlt:
      "Dashboard de Kadesh FOOD con gráficas de ingresos y operación de restaurante",
  },
  {
    id: "reports",
    title: "Informes",
    headline: "¿Vendes mucho pero no sabes cuánto ganas?",
    description:
      "Reportes reales de ventas, tickets promedio y productos más vendidos. Toma decisiones con datos, no con suposiciones.",
    image: "/images/food/reports.png",
    imageAlt:
      "Pantalla de informes de ventas y reportes financieros de restaurante",
  },
  {
    id: "kitchen",
    title: "Cocina (KDS)",
    headline: "Cocina recibe las órdenes en tiempo real",
    description:
      "Pantalla de cocina con órdenes organizadas por mesa y tipo de servicio. Reduce errores y acelera la preparación — incluso con pedidos offline mientras no hay internet.",
    image: "/images/food/kitchen.png",
    imageAlt:
      "Sistema de pantalla de cocina con órdenes en tiempo real",
  },
  {
    id: "offline",
    title: "Modo offline",
    headline: "¿Se cayó el internet? Sigue vendiendo sin parar",
    description:
      "Toma pedidos, cobra en efectivo y consulta comandas en cocina aunque falle la red. Al reconectar, todo se sincroniza automáticamente con el servidor.",
    image: "/images/food/kitchen.png",
    imageAlt:
      "Modo sin conexión de Kadesh FOOD con pedidos offline visibles en cocina",
  },
  {
    id: "customers",
    title: "Clientes",
    headline: "Tus clientes comen y se van, ¿sabes quiénes son?",
    description:
      "Registra y gestiona clientes con historial de visitas. Construye relaciones y fideliza a quienes ya confían en tu restaurante.",
    image: "/images/food/customers.png",
    imageAlt:
      "Módulo de registro y gestión de clientes en tablet de restaurante",
  },
  {
    id: "invoices",
    title: "Facturas",
    headline: "Administra todo desde un solo lugar",
    description:
      "Facturas, subtotales, impuestos y cargos de envío en una vista clara. Sincroniza tu operación digital con tus reportes.",
    image: "/images/food/invoices.png",
    imageAlt: "Módulo de facturas y administración de ventas de restaurante",
  },
  {
    id: "users",
    title: "Usuarios por rol",
    headline: "Dale acceso a tus colaboradores por función",
    description:
      "Define permisos para meseros, cocina, caja y gerencia. Cada persona ve solo lo que necesita para trabajar.",
    image: "/images/food/users-roles.png",
    imageAlt:
      "Equipo de restaurante con accesos por rol en Kadesh FOOD",
  },
  {
    id: "digital-menu",
    title: "Menú digital QR",
    headline: "Menú digital interactivo: atiende rápido y vende más",
    description:
      "Tus comensales escanean el QR, ven el menú y ordenan desde su celular. Pago seguro y menos filas en el salón.",
    image: "/images/food/digital-menu.png",
    imageAlt:
      "Menú digital con código QR para pedidos desde el celular",
  },
  {
    id: "inventory",
    title: "Inventario",
    headline: "Inventario en tiempo real con alertas de stock",
    description:
      "Controla insumos, cantidades y alertas de bajo stock. Evita quedarte sin ingredientes en horas pico.",
    image: "/images/food/inventory.png",
    imageAlt:
      "Panel de inventario con alertas de stock en restaurante",
  },
  {
    id: "multi-channel",
    title: "Pedidos multicanal",
    headline: "Atiende en mesas, auto y domicilio, todo organizado",
    description:
      "Un solo sistema para salón, para llevar y delivery. Todos los pedidos fluyen al mismo lugar sin caos.",
    image: "/images/food/multi-channel.png",
    imageAlt:
      "Punto de venta multicanal para mesas, auto y domicilio",
  },
];

export const LANDING_MARQUEE_CATEGORIES = [
  "Restaurantes",
  "Cafés",
  "Bares",
  "Food trucks",
  "Hoteles",
  "Catering",
  "Banquetes",
  "Panaderías",
  "Taquerías",
  "Bistrós",
];

export const LANDING_DEMO_STEPS = [
  {
    id: "order",
    title: "Toma el pedido",
    description: "El mesero registra la orden en el POS desde tablet o computadora.",
    image: "/images/food/multi-channel.png",
  },
  {
    id: "kitchen",
    title: "Cocina prepara",
    description: "La orden llega al KDS en tiempo real. Cocina marca avance por platillo.",
    image: "/images/food/kitchen.png",
  },
  {
    id: "invoice",
    title: "Cobra y factura",
    description: "Cierra la cuenta, emite factura y registra el pago al instante.",
    image: "/images/food/invoices.png",
  },
  {
    id: "report",
    title: "Analiza resultados",
    description: "Revisa ventas del día, productos top y rentabilidad en informes.",
    image: "/images/food/reports.png",
  },
];

export const LANDING_FEATURES = [
  { id: "offline", label: "Modo sin conexión", isNew: true },
  { id: "reservations", label: "Reservaciones" },
  { id: "pos", label: "Punto de venta" },
  { id: "tickets", label: "Comprobantes" },
  { id: "customers", label: "Clientes" },
  { id: "desktop", label: "Escritorio" },
  { id: "kitchen", label: "Cocina" },
  { id: "inventory", label: "Inventario" },
  { id: "stock-alerts", label: "Alertas de stock" },
  { id: "order-alerts", label: "Aviso de pedidos" },
  { id: "realtime", label: "Tiempo real" },
  { id: "tablet", label: "Tablet" },
  { id: "multi-display", label: "Múltiples pantallas" },
  { id: "qr-menu", label: "Menú QR / Digital", isNew: true },
];

export const LANDING_INVENTORY = {
  title: "Inventario",
  isNew: true,
  tagline: "Controla tu stock de forma simple, inteligente y sin complicaciones",
  description:
    "Gestionar el inventario de tu restaurante es más fácil. El módulo de inventario te ayuda a estar al día con tus insumos, reducir mermas y mejorar la rentabilidad — sin dolores de cabeza.",
  image: "/images/food/inventory.png",
  imageAlt: "Panel de inventario con alertas de stock en restaurante",
  features: [
    {
      title: "Seguimiento en tiempo real",
      description:
        "Monitorea cantidades, unidades y estados de stock al instante en tu restaurante, café o bar.",
    },
    {
      title: "Deducciones automáticas",
      description:
        "El inventario se ajusta con cada venta según la receta del platillo, variante o complemento.",
    },
    {
      title: "Gestión de recetas",
      description:
        "Define ingredientes por producto del menú y deja que el sistema calcule el consumo por ti.",
    },
    {
      title: "Alertas inteligentes",
      description:
        "Recibe avisos de stock bajo o agotado en tu panel antes de quedarte sin insumos clave.",
    },
    {
      title: "Informes y análisis",
      description:
        "Consulta movimientos de entrada y salida, mermas, uso por receta y sugerencias de reorden.",
    },
  ],
};

export const LANDING_DASHBOARD = {
  title: "Panel de control",
  description:
    "Tu centro de mando diario. El panel te mantiene al día con métricas clave como reservaciones, artículos más vendidos y tendencias de clientes. Toma decisiones con datos, optimiza la operación y sorprende a cada comensal — todo desde un solo lugar.",
  image: "/images/food/dashboard.png",
  imageAlt: "Panel de control de Kadesh FOOD con ingresos, pedidos y métricas del restaurante",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Ingresos, pedidos y ticket promedio con comparación vs. ayer",
    "Tendencia de ingresos y artículos más vendidos",
    "Reservaciones del día y alertas de stock bajo",
    "Horas pico, tipos de pedido y mezcla de pagos",
    "Comentarios recientes de tus clientes",
  ],
};

export const LANDING_POS = {
  title: "Punto de venta",
  description:
    "Toma el control de tu proceso de pedidos con nuestra pantalla de POS intuitiva. Tu equipo registra órdenes más rápido, con menos errores y todo sincronizado con cocina y caja en tiempo real.",
  image: "/images/food/pos.png",
  imageAlt: "Pantalla de punto de venta de Kadesh FOOD con menú, mesas y cobro",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Menú con categorías, variantes y complementos",
    "Pedidos de mesa, para llevar y menú QR en un solo lugar",
    "Modo sin conexión: toma pedidos y cobra aunque falle internet",
    "Borradores, notas por platillo y envío directo a cocina",
    "Cobro con múltiples formas de pago y recibo al instante",
    "Vista compacta o detallada para tablet o pantalla táctil",
  ],
};

export const LANDING_OFFLINE = {
  eyebrow: "Modo sin conexión",
  isNew: true,
  title: "Tu restaurante no se detiene si falla internet",
  tagline: "Toma pedidos, cobra y sigue operando — aunque se caiga la red",
  description:
    "Kadesh FOOD guarda tu menú y configuración localmente. Si pierdes conexión en pleno servicio, el POS sigue funcionando: registras pedidos, cobras, imprimes tickets y cocina ve las comandas. Cuando vuelve internet, todo se sincroniza solo.",
  image: "/images/food/kitchen.png",
  imageAlt:
    "Modo sin conexión de Kadesh FOOD con banner de alerta y pedidos offline en cocina",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  steps: [
    {
      title: "Carga el menú con internet",
      description:
        "Abre el POS al menos una vez con conexión para guardar categorías, productos y formas de pago en el dispositivo.",
    },
    {
      title: "Opera sin conexión",
      description:
        "Toma pedidos, envía a cocina y cobra en efectivo u otros métodos offline. Cada orden recibe un token local (O-001, O-002…).",
    },
    {
      title: "Sincroniza al reconectar",
      description:
        "Al volver internet, los pedidos pendientes se envían al servidor automáticamente. Un banner te avisa en todo el sistema.",
    },
  ],
  features: [
    {
      title: "Banner global de alerta",
      description:
        "Todo el equipo ve cuándo el sistema está offline o hay pedidos pendientes de sincronizar.",
    },
    {
      title: "Visible en Pedidos y Cocina",
      description:
        "Las comandas offline aparecen con badge «Pedido offline» para que salón y cocina sigan coordinados.",
    },
    {
      title: "Tickets imprimibles",
      description:
        "Imprime comprobantes con aviso de sincronización pendiente para entregar al cliente.",
    },
  ],
};

export const LANDING_KITCHEN = {
  title: "Cocina",
  description:
    "La pantalla de cocina (KDS) recibe comandas del POS al instante. Tu equipo ve qué preparar, en qué orden y con las notas de cada platillo — sin gritos ni papeles perdidos.",
  image: "/images/food/kitchen.png",
  imageAlt: "Pantalla de cocina de Kadesh FOOD con comandas y estado de pedidos",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Comandas en tiempo real con número de token y mesa",
    "Pedidos offline visibles con badge mientras no hay internet",
    "Estados por platillo: pendiente, en preparación y listo",
    "Notas y complementos visibles en cada ítem",
    "Aviso sonoro y actualización automática con nuevos pedidos",
    "Vista en grid para tablet o monitor en cocina",
  ],
};

export const LANDING_ORDERS = {
  title: "Pedidos",
  description:
    "Nunca pierdas de vista un pedido. La pantalla de pedidos activos te da una vista en tiempo real de todas las órdenes en curso: da seguimiento, actualiza estados en todas las pantallas y reimprime comprobantes cuando lo necesites.",
  image: "/images/food/orders.png",
  imageAlt: "Pantalla de pedidos de Kadesh FOOD con tokens y estado de órdenes activas",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Vista en tiempo real con token, mesa y estado de pago",
    "Cola de pedidos offline mientras no hay conexión",
    "Actualiza estados: en preparación, listo, entregado y completado",
    "Sincronización instantánea entre cocina, POS y pantallas",
    "Reimpresión de comprobantes bajo demanda",
    "Cobro y cierre de pedidos desde un solo lugar",
  ],
};

export const LANDING_RESERVATIONS = {
  title: "Reservaciones",
  description:
    "Simplifica la gestión de reservas con nuestra página dedicada. Registra citas directamente en el sistema, consulta las próximas reservaciones con filtros flexibles y adminístralas sin esfuerzo para una experiencia impecable.",
  image: "/images/food/reservations.png",
  imageAlt: "Pantalla de reservaciones de Kadesh FOOD con gestión de mesas y clientes",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Registro de reservas con cliente, mesa y número de comensales",
    "Filtros por hoy, mañana, semana o rango personalizado",
    "Edición, cancelación y notas por cada reservación",
    "Asignación de mesa y seguimiento del estado",
    "Vista centralizada también en el panel de control",
  ],
};

export const LANDING_CUSTOMERS = {
  title: "Clientes",
  description:
    "Conoce mejor a tus comensales. Busca clientes, consulta y edita sus datos, identifica clientes recurrentes y construye relaciones más sólidas desde un solo lugar.",
  image: "/images/food/customers.png",
  imageAlt: "Pantalla de clientes de Kadesh FOOD con búsqueda y gestión de contactos",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Ficha con teléfono, correo, género y fecha de nacimiento",
    "Búsqueda rápida con paginación de resultados",
    "Alta, edición y eliminación de clientes",
    "Importación masiva desde archivo",
    "Vinculación con reservaciones, POS y facturas",
  ],
};

export const LANDING_QR_MENU = {
  title: "Menú QR / Digital",
  isNew: true,
  description:
    "Olvídate de los menús en papel. Tus clientes escanean el código QR o acceden al menú en línea para una experiencia sin contacto e interactiva. Mejora la higiene, causa buena impresión y mantén tu carta siempre actualizada.",
  footnote:
    "Comparte el enlace o descarga el QR e imprímelo en tus mesas y señalización.",
  image: "/images/food/qr-menu.png",
  imageAlt: "Menú digital en celular con platillos, precios y variantes",
  cta: {
    label: "Probar gratis",
    href: "/register",
  },
  highlights: [
    "Menú con búsqueda, categorías y fotos de cada platillo",
    "Variantes y complementos visibles para el comensal",
    "Pedidos desde el celular que llegan al POS y cocina",
    "QR por mesa o enlace general para todo el local",
    "Descarga e impresión del código para tus mesas",
  ],
};

export const LANDING_SETUP = {
  title: "Configuración recomendada",
  subtitle:
    "Conecta tus dispositivos en minutos. El punto de venta es el centro: desde ahí fluyen tickets, comandas y estados de pedido.",
  defaultNode: "pos",
  connections: [
    { from: "printer", to: "pos", label: "Tickets y comprobantes" },
    { from: "pos", to: "kitchen", label: "Comandas a cocina" },
    { from: "pos", to: "orders", label: "Estado de pedidos" },
  ],
  nodes: [
    {
      id: "printer",
      label: "Impresora",
      description:
        "Imprime tickets, comandas y comprobantes al instante. Se conecta directo al punto de venta sin configuraciones complicadas.",
      highlights: [
        "Tickets de cocina y caja",
        "Comprobantes para el cliente",
        "Compatible con impresoras térmicas",
      ],
    },
    {
      id: "pos",
      label: "Punto de venta",
      description:
        "El corazón de tu operación. Toma pedidos en tablet o pantalla táctil y sincroniza todo con cocina, pedidos e impresora en tiempo real.",
      highlights: [
        "Tablet o pantalla táctil",
        "Mesas, menú y pagos en un solo lugar",
        "Sincronización instantánea",
      ],
      isHub: true,
    },
    {
      id: "kitchen",
      label: "Cocina",
      description:
        "Pantalla de cocina (KDS) que recibe comandas del POS al momento. Los chefs ven qué preparar, en qué orden y con qué prioridad.",
      highlights: [
        "Comandas en tiempo real",
        "Prioridad y tiempos visibles",
        "Funciona en tablet o monitor",
      ],
    },
    {
      id: "orders",
      label: "Pedidos",
      description:
        "Pantalla de estado para el salón o mostrador. Tus clientes y equipo ven cuándo está listo cada pedido sin preguntar.",
      highlights: [
        "Estado en vivo del pedido",
        "Ideal para mostrador o autoservicio",
        "Menos interrupciones al personal",
      ],
    },
  ],
};

export const LANDING_PERSONAS = [
  {
    id: "owner",
    label: "Dueño",
    title: "Visibilidad total de tu negocio",
    benefits: [
      "Reportes de ventas e ingresos en tiempo real",
      "Control de inventario y costos",
      "Usuarios y dispositivos ilimitados",
      "Sin instalaciones complicadas",
    ],
  },
  {
    id: "manager",
    label: "Gerente",
    title: "Operación ordenada cada día",
    benefits: [
      "Reservaciones y mesas organizadas",
      "Cocina sincronizada con el salón",
      "Facturas y pagos centralizados",
      "Alertas de stock antes de quedarte sin insumos",
    ],
  },
  {
    id: "chef",
    label: "Chef",
    title: "Cocina bajo control, sin papeles",
    benefits: [
      "Pedidos offline visibles aunque no haya internet",
      "Pedidos en tiempo real desde el salón",
      "Pantalla de cocina (KDS) ordenada por prioridad",
      "Recetas y costos por platillo",
      "Alertas cuando falta un ingrediente",
    ],
  },
  {
    id: "waiter",
    label: "Mesero",
    title: "Toma pedidos sin ir y venir",
    benefits: [
      "POS en tablet, rápido y claro",
      "Mesas y comandas en un solo lugar",
      "Menú digital con modificadores",
      "Envía a cocina al instante, sin errores",
    ],
  },
  {
    id: "cashier",
    label: "Cajero",
    title: "Cobros rápidos y sin filas",
    benefits: [
      "Modo sin conexión: sigue cobrando aunque falle internet",
      "Múltiples formas de pago en un solo flujo",
      "Facturación y tickets al momento",
      "Cierre de caja con totales claros",
      "Propinas y divisiones de cuenta sencillas",
    ],
  },
  {
    id: "accountant",
    label: "Contador",
    title: "Números claros para tu contabilidad",
    benefits: [
      "Reportes de ventas e impuestos exportables",
      "Control de costos e inventario valorizado",
      "Conciliación de pagos y cierres de turno",
      "Datos listos para declaraciones y auditorías",
    ],
  },
  {
    id: "host",
    label: "Host",
    title: "La primera impresión, bien organizada",
    benefits: [
      "Reservaciones y lista de espera en un solo panel",
      "Asignación de mesas según capacidad y turno",
      "Estado del salón visible al instante",
      "Menú digital con QR para que los clientes ordenen",
    ],
  },
];

export const LANDING_FAQ = [
  {
    question: "¿Qué tipo de negocios puede usar Kadesh FOOD?",
    answer:
      "Restaurantes, cafés, bares, food trucks, hoteles, catering y cualquier negocio de comida en México que necesite POS, cocina, inventario y reportes en un solo sistema.",
  },
  {
    question: "¿Necesito instalar software en cada dispositivo?",
    answer:
      "No. Kadesh FOOD funciona en la nube desde navegador. Accede desde computadora, tablet o celular sin procesos de instalación largos.",
  },
  {
    question: "¿Puedo probar el sistema antes de pagar?",
    answer:
      "Sí. Los planes incluyen periodo de prueba gratuita. Crea tu cuenta gratis y empieza a explorar las funciones.",
  },
  {
    question: "¿Funciona para pedidos en mesa, para llevar y domicilio?",
    answer:
      "Sí. El sistema organiza pedidos de salón, auto-servicio y delivery en un solo flujo hacia cocina y caja.",
  },
  {
    question: "¿Tiene menú digital con código QR?",
    answer:
      "Sí. Tus comensales pueden escanear el QR de la mesa, ver el menú y ordenar desde su celular con pago seguro.",
  },
  {
    question: "¿Cuántos usuarios y dispositivos puedo conectar?",
    answer:
      "Depende del plan, pero los planes Premium incluyen usuarios y dispositivos ilimitados para equipos en crecimiento.",
  },
  {
    question: "¿Puedo controlar qué ve cada empleado?",
    answer:
      "Sí. Asignas roles y permisos por función: mesero, cocina, caja, gerencia y más.",
  },
  {
    question: "¿El inventario avisa cuando se acaba un producto?",
    answer:
      "Sí. Recibes alertas de bajo stock y puedes ver movimientos de inventario en tiempo real.",
  },
  {
    question: "¿Emito facturas desde el mismo sistema?",
    answer:
      "Sí. Administra facturas, impuestos y cargos desde el módulo de facturación integrado.",
  },
  {
    question: "¿Qué pasa si se cae el internet en pleno servicio?",
    answer:
      "Kadesh FOOD entra en modo sin conexión. Puedes seguir tomando pedidos, cobrar e imprimir tickets; cocina y pedidos muestran las órdenes locales. Al reconectar, todo se sincroniza automáticamente con el servidor.",
  },
  {
    question: "¿En qué ciudades de México está disponible?",
    answer:
      "Kadesh FOOD está disponible en todo México, incluyendo CDMX, Guadalajara, Monterrey y cualquier ciudad con acceso a internet.",
  },
  {
    question: "¿Qué pasa si ya tengo una suscripción activa?",
    answer:
      "Si ya tienes cuenta, inicia sesión en /login y accede directamente a tu panel. La landing es para conocer el producto y registrarte.",
  },
];

export const LANDING_PAIN_POINTS = [
  {
    problem: "Pedidos dispersos en apps con comisiones altas",
    solution: "Centraliza mesa, auto y domicilio en tu propio sistema sin depender solo de terceros.",
  },
  {
    problem: "Cocina y salón desincronizados",
    solution: "Órdenes en tiempo real al KDS. Menos errores y tiempos de espera más cortos.",
  },
  {
    problem: "No sabes cuánto ganas realmente",
    solution: "Informes de ventas, tickets y productos top para decisiones con datos.",
  },
  {
    problem: "Se va el internet y no puedes cobrar",
    solution:
      "Modo offline: sigue vendiendo, imprime tickets y sincroniza automáticamente al reconectar.",
  },
  {
    problem: "Clientes que no vuelves a ver",
    solution: "CRM integrado: guarda datos y construye relación con tus comensales.",
  },
];

export const SOFTWARE_FEATURE_LIST = LANDING_SHOWCASE_MODULES.map(
  (m) => m.title
);
