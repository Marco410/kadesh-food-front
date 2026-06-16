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

export const LANDING_ANCHORS = {
  inicio: "#inicio",
  comoFunciona: "#como-funciona",
  plataforma: "#plataforma",
  planes: "#planes",
  beneficios: "#beneficios",
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
      "Pantalla de cocina con órdenes organizadas por mesa y tipo de servicio. Reduce errores y acelera la preparación.",
    image: "/images/food/kitchen.png",
    imageAlt:
      "Sistema de pantalla de cocina con órdenes en tiempo real",
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
    id: "team",
    label: "Equipo de sala",
    title: "Atiende más rápido, con menos errores",
    benefits: [
      "POS intuitivo en tablet o pantalla táctil",
      "Menú digital con QR para autoservicio",
      "Pedidos claros para cocina",
      "Acceso por rol: cada quien ve lo suyo",
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
      "Sí. Los planes incluyen periodo de prueba gratuita. Crea tu cuenta en /register y empieza a explorar las funciones.",
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
    problem: "Clientes que no vuelves a ver",
    solution: "CRM integrado: guarda datos y construye relación con tus comensales.",
  },
];

export const SOFTWARE_FEATURE_LIST = LANDING_SHOWCASE_MODULES.map(
  (m) => m.title
);
