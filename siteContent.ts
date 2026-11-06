import { CategoryId, Language, SITE_CONFIG } from './config';

export interface CategoryContent {
  id: CategoryId;
  name: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPageContent {
  slug: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export interface SiteLocaleStrings {
  langCode: Language;
  langLabel: string;
  switchLangLabel: string;
  tagline: string;
  nav: {
    home: string;
    allTools: string;
    categories: string;
    about: string;
    contact: string;
  };
  home: {
    seoTitle: string;
    metaDescription: string;
    kicker: string;
    h1: string;
    subtitle: string;
    searchPlaceholder: string;
    searchLabel: string;
    searchNoResults: string;
    clearSearch: string;
    popularTitle: string;
    popularSubtitle: string;
    allToolsTitle: string;
    allToolsSubtitle: string;
    categoriesTitle: string;
    categoriesSubtitle: string;
    filterAll: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    howItWorksSteps: { title: string; description: string }[];
    faqTitle: string;
    faqSubtitle: string;
    faqs: { question: string; answer: string }[];
  };
  allToolsPage: {
    seoTitle: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
  };
  categories: Record<CategoryId, CategoryContent>;
  calculatorUI: {
    currencyLabel: string;
    currencyNote: string;
    calculateBtn: string;
    resetBtn: string;
    loadExampleBtn: string;
    copyResultsBtn: string;
    copiedFeedback: string;
    clearTextBtn: string;
    resultsHeading: string;
    formulaHeading: string;
    instructionsHeading: string;
    exampleHeading: string;
    relatedToolsHeading: string;
    faqHeading: string;
    openToolCta: string;
    backToAllTools: string;
    adPlaceholderLabel: string;
    adPlaceholderNote: string;
    toggleAdSlotsLabel: string;
  };
  footer: {
    description: string;
    toolsColumn: string;
    legalColumn: string;
    languagesColumn: string;
    aboutLink: string;
    contactLink: string;
    privacyLink: string;
    termsLink: string;
    disclaimerLink: string;
    copyright: string;
    noRegistrationNote: string;
  };
  legalPages: {
    about: LegalPageContent;
    contact: LegalPageContent;
    privacy: LegalPageContent;
    terms: LegalPageContent;
    disclaimer: LegalPageContent;
  };
}

export const SITE_CONTENT: Record<Language, SiteLocaleStrings> = {
  es: {
    langCode: 'es',
    langLabel: 'Español (ES)',
    switchLangLabel: 'Cambiar idioma a Inglés (EN)',
    tagline: 'Calcula fácil. Herramientas gratis para tu día a día.',
    nav: {
      home: 'Inicio',
      allTools: 'Herramientas',
      categories: 'Categorías',
      about: 'Sobre nosotros',
      contact: 'Contacto',
    },
    home: {
      seoTitle: 'CalculaFácil — Calculadoras y Herramientas Online Gratis',
      metaDescription:
        'Calcula fácil. Herramientas gratis para tu día a día. Calculadoras de margen de beneficio, precio de venta, punto de equilibrio, préstamos, salario y contadores de texto.',
      kicker: 'Calculadoras de negocios, finanzas y texto · Sin registro · 100% gratis',
      h1: 'Calcula fácil. Herramientas gratis para tu día a día.',
      subtitle:
        'Calculadoras financieras, comerciales y utilidades de texto diseñadas para funcionar al instante en tu móvil u ordenador. Sin suscripciones, sin registros y con fórmulas transparentes.',
      searchPlaceholder:
        'Buscar herramienta (ej. margen, préstamo, salario, descuento, palabras)...',
      searchLabel: 'Buscar calculadora o herramienta',
      searchNoResults:
        'No hemos encontrado ninguna herramienta con ese término. Prueba con palabras como «margen», «préstamo», «salario» o «palabras».',
      clearSearch: 'Ver todas las herramientas',
      popularTitle: 'Calculadoras más utilizadas',
      popularSubtitle:
        'Acceso directo a las herramientas esenciales para el trabajo diario, ventas y finanzas personales.',
      allToolsTitle: 'Las 10 herramientas completas',
      allToolsSubtitle:
        'Selecciona cualquier calculadora para abrirla directamente. Todas funcionan en tu navegador sin enviar tus datos a servidores externos.',
      categoriesTitle: 'Explorar por categoría',
      categoriesSubtitle:
        'Filtra nuestras utilidades según el tipo de tarea que estés realizando hoy.',
      filterAll: 'Todas (10)',
      howItWorksTitle: 'Cómo utilizar CalculaFácil',
      howItWorksSubtitle:
        'Todas nuestras calculadoras siguen tres pasos sencillos para ahorrarte tiempo y evitar errores de cálculo.',
      howItWorksSteps: [
        {
          title: '01. Elige tu herramienta y moneda',
          description:
            'Selecciona la calculadora que necesitas y, si trabajas con importes monetarios, elige el formato de moneda (EUR, USD, MXN, ARS, COP, CLP, GBP o PKR).',
        },
        {
          title: '02. Introduce tus datos o carga un ejemplo',
          description:
            'Escribe tus cifras en los campos etiquetados o pulsa «Cargar ejemplo» para ver cómo funciona con un caso práctico real.',
        },
        {
          title: '03. Consulta fórmulas y copia tus resultados',
          description:
            'Obtén el desglose instantáneo junto con la fórmula matemática utilizada y copia el resumen al portapapeles con un solo clic.',
        },
      ],
      faqTitle: 'Preguntas frecuentes sobre CalculaFácil',
      faqSubtitle:
        'Respuestas claras sobre privacidad, monedas, precisión matemática y uso gratuito.',
      faqs: [
        {
          question: '¿Es realmente gratis usar todas las calculadoras de CalculaFácil?',
          answer:
            'Sí. Las diez herramientas son 100% gratuitas, sin límites de uso diario, sin planes de pago y sin necesidad de crear una cuenta ni facilitar datos personales.',
        },
        {
          question: '¿Se guardan mis datos financieros o textos en algún servidor?',
          answer:
            'No. Todos los cálculos matemáticos y conteos de texto se ejecutan exclusivamente en tu propio navegador web (del lado del cliente). Tus cifras comerciales, préstamos, salarios o textos nunca se transmiten ni almacenan en bases de datos.',
        },
        {
          question: '¿El selector de moneda convierte divisas con tipos de cambio en vivo?',
          answer:
            'No. El selector de moneda (EUR, USD, MXN, ARS, COP, CLP, GBP, PKR) sirve únicamente para dar el formato numérico y mostrar el símbolo monetario adecuado a tu país o documento. No realiza conversión de divisas ni utiliza tasas de cambio.',
        },
        {
          question: '¿Puedo usar estas calculadoras desde mi teléfono móvil?',
          answer:
            'Por supuesto. Todo el sitio ha sido diseñado con enfoque móvil (mobile-first), adaptado a pantallas desde 320px en adelante, tanto en teléfonos Android e iOS como en tabletas y ordenadores.',
        },
      ],
    },
    allToolsPage: {
      seoTitle: 'Todas las Calculadoras y Herramientas Online — CalculaFácil',
      metaDescription:
        'Directorio completo de nuestras 10 calculadoras de negocios, préstamos bancarios, salario, descuentos y contadores de palabras y caracteres en español.',
      h1: 'Catálogo completo de herramientas y calculadoras',
      subtitle:
        'Accede en un clic a nuestras 10 utilidades gratuitas de rentabilidad empresarial, finanzas personales y análisis de texto.',
    },
    categories: {
      business: {
        id: 'business',
        name: 'Negocios y Ventas',
        description:
          'Calcula márgenes de beneficio, precios de venta recomendados, punto de equilibrio, costes horarios y comisiones comerciales.',
      },
      finance: {
        id: 'finance',
        name: 'Finanzas y Ahorro',
        description:
          'Simula préstamos bancarios con tabla de amortización, convierte salarios entre períodos y calcula descuentos.',
      },
      text: {
        id: 'text',
        name: 'Texto y Redacción',
        description:
          'Cuenta palabras, párrafos, oraciones y controla límites exactos de caracteres para SEO y redes sociales.',
      },
    },
    calculatorUI: {
      currencyLabel: 'Moneda de visualización',
      currencyNote:
        'Nota: La selección de moneda cambia únicamente el símbolo y formato de visualización. No aplica tipos de cambio.',
      calculateBtn: 'Calcular ahora',
      resetBtn: 'Limpiar',
      loadExampleBtn: 'Cargar ejemplo',
      copyResultsBtn: 'Copiar resultados',
      copiedFeedback: '¡Resultados copiados!',
      clearTextBtn: 'Limpiar texto',
      resultsHeading: 'Resultados del cálculo',
      formulaHeading: 'Fórmula y método de cálculo',
      instructionsHeading: 'Instrucciones paso a paso',
      exampleHeading: 'Ejemplo práctico',
      relatedToolsHeading: 'Herramientas relacionadas',
      faqHeading: 'Preguntas frecuentes de esta herramienta',
      openToolCta: 'Abrir calculadora',
      backToAllTools: 'Todas las herramientas',
      adPlaceholderLabel: 'Espacio publicitario opcional (Contenedor reservado)',
      adPlaceholderNote:
        'Contenedor estático preparado para futura integración publicitaria, separado de los controles de la calculadora.',
      toggleAdSlotsLabel: 'Espacios AdSense',
    },
    footer: {
      description:
        'CalculaFácil ofrece calculadoras cotidianas de negocios, finanzas personales y utilidades de texto en español e inglés. Rápido, transparente y sin registro.',
      toolsColumn: 'Las 10 Herramientas',
      legalColumn: 'Información y Legal',
      languagesColumn: 'Idioma y Configuración',
      aboutLink: 'Sobre nosotros',
      contactLink: 'Contacto',
      privacyLink: 'Política de privacidad',
      termsLink: 'Términos y condiciones',
      disclaimerLink: 'Aviso legal',
      copyright: `© ${new Date().getFullYear()} ${SITE_CONFIG.siteName}. Todos los derechos reservados.`,
      noRegistrationNote:
        'Todas las herramientas se ejecutan localmente en tu navegador. No requiere registro ni suscripción.',
    },
    legalPages: {
      about: {
        slug: 'sobre-nosotros',
        url: '/es/sobre-nosotros.html',
        seoTitle: 'Sobre Nosotros — CalculaFácil',
        metaDescription:
          'Conoce el propósito de CalculaFácil: calculadoras y herramientas diarias gratuitas, rápidas, transparentes y bilingües en español e inglés.',
        h1: 'Sobre nosotros',
        lastUpdated: 'Noviembre de 2026',
        intro:
          'CalculaFácil nació con un objetivo claro: ofrecer calculadoras cotidianas y herramientas de texto que cualquier persona, estudiante, autónomo o pequeño negocio pueda utilizar al instante, gratis y sin complicaciones.',
        sections: [
          {
            heading: 'Nuestra misión',
            paragraphs: [
              'En internet abundan calculadoras lentas, confusas o que exigen registrarse para mostrar un resultado básico. En CalculaFácil creemos que calcular el margen de beneficio de un producto, estimar la cuota de un préstamo bancario o contar los caracteres de un texto debe ser inmediato, transparente y accesible desde cualquier dispositivo.',
              'Por ello hemos desarrollado diez herramientas completas, disponibles íntegramente tanto en español como en inglés, con explicaciones claras de cada fórmula matemática empleada.',
            ],
          },
          {
            heading: 'Principios de calidad y transparencia',
            paragraphs: [
              '1. Fórmulas abiertas y explicadas: Nunca mostramos un número sin explicar de dónde sale. Cada calculadora incluye la fórmula exacta, instrucciones paso a paso y un ejemplo verificado.',
              '2. Privacidad por diseño: Todos los cálculos se procesan localmente en el navegador del usuario mediante JavaScript estándar. No almacenamos los importes ni los textos que introduces.',
              '3. Honestidad informativa: Nuestras herramientas financieras (como la calculadora de préstamos o la calculadora de salario) indican con claridad sus supuestos matemáticos y advierten que no sustituyen cotizaciones bancarias oficiales ni asesoramiento fiscal.',
            ],
          },
          {
            heading: 'Para quién está pensado este sitio',
            paragraphs: [
              'Nuestro catálogo ayuda a comerciantes, emprendedores y profesionales independientes a fijar precios rentables, calcular puntos de equilibrio y comisiones; a familias y trabajadores a comprender préstamos, descuentos y salarios; y a redactores, estudiantes y especialistas en marketing a analizar la extensión de sus textos.',
            ],
          },
        ],
      },
      contact: {
        slug: 'contacto',
        url: '/es/contacto.html',
        seoTitle: 'Contacto — CalculaFácil',
        metaDescription:
          'Ponte en contacto con el equipo de CalculaFácil para enviar sugerencias, reportar errores o realizar consultas sobre nuestras calculadoras.',
        h1: 'Contacto',
        lastUpdated: 'Noviembre de 2026',
        intro:
          'Agradecemos tus comentarios, sugerencias de mejora y avisos sobre el funcionamiento de cualquiera de nuestras diez calculadoras en español o inglés.',
        sections: [
          {
            heading: 'Correo electrónico de contacto',
            paragraphs: [
              `Puedes escribirnos directamente a nuestra dirección de correo electrónico configurable: ${SITE_CONFIG.contactEmail}`,
              'Nota de configuración del sitio: Esta dirección de correo electrónico está definida como marcador de posición configurable en el archivo central de configuración del proyecto hasta que se active el buzón definitivo del dominio.',
            ],
          },
          {
            heading: '¿En qué podemos ayudarte?',
            paragraphs: [
              '• Reportar un problema técnico o visual en un navegador o teléfono móvil específico.',
              '• Sugerir mejoras en las explicaciones, ejemplos prácticos o preguntas frecuentes.',
              '• Realizar consultas relacionadas con nuestra Política de Privacidad, Términos de Uso o Aviso Legal.',
            ],
          },
          {
            heading: 'Protección de tu privacidad al escribirnos',
            paragraphs: [
              'Cuando nos envíes un mensaje, por favor no incluyas documentos bancarios confidenciales, contraseñas ni datos personales sensibles. Si deseas consultar una duda sobre un cálculo, basta con que nos indiques los valores numéricos de ejemplo que utilizaste.',
            ],
          },
        ],
      },
      privacy: {
        slug: 'politica-privacidad',
        url: '/es/politica-privacidad.html',
        seoTitle: 'Política de Privacidad — CalculaFácil',
        metaDescription:
          'Política de privacidad de CalculaFácil. Conoce cómo protegemos tu privacidad, el procesamiento local en navegador y el uso de almacenamiento local.',
        h1: 'Política de privacidad',
        lastUpdated: 'Noviembre de 2026',
        intro:
          'En CalculaFácil respetamos tu privacidad. Este sitio web ha sido diseñado para funcionar sin cuentas de usuario, sin formularios de registro y procesando todos los cálculos directamente en tu dispositivo.',
        sections: [
          {
            heading: '1. Datos introducidos en las calculadoras y herramientas de texto',
            paragraphs: [
              'Todos los valores numéricos (costes, precios, préstamos, salarios, descuentos) y los textos introducidos en el contador de palabras o caracteres se procesan exclusivamente en la memoria local de tu navegador web.',
              'CalculaFácil no envía, recoge ni guarda en ningún servidor ni base de datos los importes o textos que escribes en nuestras herramientas.',
            ],
          },
          {
            heading: '2. Almacenamiento local (localStorage)',
            paragraphs: [
              'Utilizamos el almacenamiento local del navegador (localStorage) únicamente para recordar preferencias opcionales de experiencia de usuario, como tu idioma seleccionado (español o inglés) y tu moneda de visualización preferida.',
              'Estos datos permanecen en tu propio navegador, no contienen información personal identificable y puedes borrarlos en cualquier momento desde la configuración de tu navegador.',
            ],
          },
          {
            heading: '3. Cookies y publicidad futura (Google AdSense)',
            paragraphs: [
              'En el futuro, este sitio web puede mostrar anuncios gestionados a través de Google AdSense u otros proveedores publicitarios autorizados. Los proveedores terceros, incluido Google, utilizan cookies para mostrar anuncios relevantes basados en las visitas previas de un usuario a este sitio web o a otros sitios de internet.',
              'El uso de cookies publicitarias permite a Google y a sus socios mostrar anuncios basados en tu visita a nuestros sitios y/o a otros sitios de Internet. Los usuarios pueden inhabilitar la publicidad personalizada accediendo a la Configuración de anuncios de Google (https://adssettings.google.com) o visitando https://www.aboutads.info.',
            ],
          },
          {
            heading: '4. Registros técnicos de alojamiento web',
            paragraphs: [
              'Como ocurre en cualquier sitio web estático alojado en infraestructuras estándar (como Cloudflare Pages), el proveedor de red puede procesar de forma técnica y temporal la dirección IP y el agente de usuario del navegador con fines exclusivos de seguridad, prevención de ataques y entrega del contenido.',
            ],
          },
          {
            heading: '5. Contacto sobre privacidad',
            paragraphs: [
              `Para cualquier duda relacionada con esta Política de Privacidad, puedes escribirnos a: ${SITE_CONFIG.contactEmail}`,
            ],
          },
        ],
      },
      terms: {
        slug: 'terminos-condiciones',
        url: '/es/terminos-condiciones.html',
        seoTitle: 'Términos y Condiciones de Uso — CalculaFácil',
        metaDescription:
          'Términos y condiciones de uso de CalculaFácil. Normas de uso gratuito, propiedad intelectual y alcance informativo de nuestras calculadoras.',
        h1: 'Términos y condiciones',
        lastUpdated: 'Noviembre de 2026',
        intro:
          'Al acceder y utilizar el sitio web CalculaFácil, aceptas los siguientes términos y condiciones de uso. Si no estás de acuerdo con alguno de estos puntos, te rogamos que no utilices el sitio.',
        sections: [
          {
            heading: '1. Uso gratuito y permitido',
            paragraphs: [
              'CalculaFácil proporciona acceso libre y gratuito a sus calculadoras online y herramientas de texto para uso personal, educativo y profesional. No se requiere registro ni suscripción.',
              'El usuario se compromete a utilizar el sitio de forma lícita, sin intentar vulnerar su disponibilidad técnica ni copiar de forma automatizada o fraudulenta su código y contenidos originales.',
            ],
          },
          {
            heading: '2. Carácter informativo de los resultados',
            paragraphs: [
              'Los resultados proporcionados por todas las calculadoras se basan estrictamente en las fórmulas matemáticas estándar descritas en cada página y en los datos introducidos por el propio usuario.',
              'El usuario es el único responsable de verificar que los datos de entrada y los supuestos del cálculo sean adecuados para su caso particular antes de tomar decisiones comerciales, laborales o financieras.',
            ],
          },
          {
            heading: '3. Propiedad intelectual',
            paragraphs: [
              'El diseño, la estructura, el código fuente, los textos explicativos originales en español e inglés y la marca CalculaFácil están protegidos por la normativa aplicable de propiedad intelectual. Puedes copiar y compartir libremente los resultados numéricos generados por tus propios cálculos.',
            ],
          },
          {
            heading: '4. Modificaciones del servicio',
            paragraphs: [
              'Nos reservamos el derecho de actualizar, mejorar o corregir las herramientas, fórmulas y textos del sitio en cualquier momento para mantener su precisión y calidad.',
            ],
          },
        ],
      },
      disclaimer: {
        slug: 'aviso-legal',
        url: '/es/aviso-legal.html',
        seoTitle: 'Aviso Legal y Descargo de Responsabilidad — CalculaFácil',
        metaDescription:
          'Aviso legal y descargo de responsabilidad financiera, fiscal y comercial sobre el uso de las calculadoras de CalculaFácil.',
        h1: 'Aviso legal y descargo de responsabilidad',
        lastUpdated: 'Noviembre de 2026',
        intro:
          'Por favor, lee atentamente este aviso legal sobre el alcance y las limitaciones de las calculadoras ofrecidas en CalculaFácil.',
        sections: [
          {
            heading: '1. Ausencia de asesoramiento financiero, bancario o fiscal',
            paragraphs: [
              'La información y los cálculos ofrecidos en CalculaFácil tienen una finalidad exclusivamente informativa, educativa y de apoyo práctico. Ningún contenido de este sitio web constituye asesoramiento financiero, bancario, contable, fiscal, legal ni laboral.',
            ],
          },
          {
            heading: '2. Advertencia específica sobre la Calculadora de Préstamos Bancarios',
            paragraphs: [
              'La Calculadora de préstamos bancarios utiliza la fórmula matemática estándar de amortización sobre saldo decreciente. NO constituye una oferta vinculante ni una cotización oficial de ninguna entidad bancaria. Los pagos reales de un préstamo pueden variar debido a comisiones bancarias, gastos de notaría, seguros vinculados, impuestos, criterios de redondeo y cambios en los tipos de interés.',
            ],
          },
          {
            heading: '3. Advertencia específica sobre la Calculadora de Salario',
            paragraphs: [
              'La Calculadora de salario realiza conversiones matemáticas entre períodos de pago basadas en las horas y días indicados por el usuario, y resta únicamente las deducciones introducidas de forma manual. No calcula impuestos sobre la renta ni cotizaciones sociales automáticas de ningún país, y el salario neto estimado NO representa un recibo de nómina oficial.',
            ],
          },
          {
            heading: '4. Monedas sin conversión de divisas',
            paragraphs: [
              'La selección de moneda (EUR, USD, MXN, ARS, COP, CLP, GBP, PKR) modifica únicamente el símbolo y el formato numérico en pantalla. El sitio no ofrece tipos de cambio en tiempo real ni convierte importes de una divisa a otra.',
            ],
          },
          {
            heading: '5. Limitación de responsabilidad',
            paragraphs: [
              'Aunque verificamos cuidadosamente todas las fórmulas matemáticas de nuestras herramientas, CalculaFácil se ofrece «tal cual», sin garantías expresas o implícitas respecto a la ausencia total de errores o la idoneidad para un propósito comercial específico. Para decisiones económicas relevantes, consulta siempre con un profesional cualificado o con tu entidad financiera.',
              `Para consultas legales o notificaciones, escríbenos a: ${SITE_CONFIG.contactEmail}`,
            ],
          },
        ],
      },
    },
  },

  en: {
    langCode: 'en',
    langLabel: 'English (EN)',
    switchLangLabel: 'Switch language to Spanish (ES)',
    tagline: 'Calculate easily. Free tools for everyday life.',
    nav: {
      home: 'Home',
      allTools: 'All Tools',
      categories: 'Categories',
      about: 'About',
      contact: 'Contact',
    },
    home: {
      seoTitle: 'CalculaFácil — Free Online Calculators & Everyday Tools',
      metaDescription:
        'Calculate easily. Free tools for everyday life. Fast, accurate online calculators for profit margin, selling price, break-even, bank loans, salary, and text counting.',
      kicker: 'Business, finance & text utilities · No registration · 100% free',
      h1: 'Calculate easily. Free tools for everyday life.',
      subtitle:
        'Practical business calculators, loan and salary estimators, and live text utilities built for mobile and desktop. No sign-ups, no subscriptions, and transparent mathematical formulas.',
      searchPlaceholder:
        'Search for a tool (e.g., profit margin, loan, salary, discount, words)...',
      searchLabel: 'Search for a calculator or tool',
      searchNoResults:
        'No tools matched your search. Try keywords like "margin", "loan", "salary", "discount", or "word".',
      clearSearch: 'Show all tools',
      popularTitle: 'Popular calculators',
      popularSubtitle:
        'Quick access to our most frequently used business, pricing, and personal finance calculators.',
      allToolsTitle: 'All 10 complete tools',
      allToolsSubtitle:
        'Choose any tool to start calculating immediately. Every tool runs directly in your browser without sending your data to external servers.',
      categoriesTitle: 'Browse by category',
      categoriesSubtitle:
        'Filter our calculators and utilities by the task you are working on today.',
      filterAll: 'All Tools (10)',
      howItWorksTitle: 'How to use CalculaFácil',
      howItWorksSubtitle:
        'Every calculator is designed around three straightforward steps so you get reliable answers in seconds.',
      howItWorksSteps: [
        {
          title: '01. Pick your tool and display currency',
          description:
            'Open any calculator within two clicks and select your preferred display currency (EUR, USD, MXN, ARS, COP, CLP, GBP, or PKR).',
        },
        {
          title: '02. Enter your numbers or load a sample',
          description:
            'Fill in the clearly labelled inputs—or click "Load example" to test the calculator with realistic pre-filled numbers.',
        },
        {
          title: '03. Review the formula and copy results',
          description:
            'See instant results alongside the exact mathematical formula used, then copy a formatted summary to your clipboard in one click.',
        },
      ],
      faqTitle: 'Frequently asked questions',
      faqSubtitle:
        'Clear answers about privacy, display currencies, formula accuracy, and free access.',
      faqs: [
        {
          question: 'Are all ten tools on CalculaFácil completely free?',
          answer:
            'Yes. Every calculator and text counter on this website is 100% free to use with no usage caps, no paid subscriptions, and no registration required.',
        },
        {
          question: 'Are my financial numbers or text drafts stored on a server?',
          answer:
            'No. All calculations and text counts happen locally inside your web browser using client-side JavaScript. Your inputs are never uploaded to a database.',
        },
        {
          question: 'Does changing the currency convert amounts using exchange rates?',
          answer:
            'No. Selecting a currency (EUR, USD, MXN, ARS, COP, CLP, GBP, or PKR) changes the display symbol and number formatting only. It never performs foreign exchange conversion or implies live exchange rates.',
        },
        {
          question: 'Can I use these calculators on mobile phones and small screens?',
          answer:
            'Yes. The entire website is built with a mobile-first responsive layout that works smoothly on Android phones, iPhones, tablets, laptops, and desktops down to 320px screen width.',
        },
      ],
    },
    allToolsPage: {
      seoTitle: 'All Online Calculators & Text Tools — CalculaFácil',
      metaDescription:
        'Complete directory of all 10 free online tools: profit margin, selling price, break-even, hourly cost, commission, discount, loan EMI, salary, and word counters.',
      h1: 'All calculators and everyday tools',
      subtitle:
        'Access all ten business, finance, and text utilities in one place. Fast, accurate, and completely free.',
    },
    categories: {
      business: {
        id: 'business',
        name: 'Business & Sales',
        description:
          'Calculate profit margins, target selling prices, break-even volume, hourly project costs, and sales commissions.',
      },
      finance: {
        id: 'finance',
        name: 'Finance & Personal Money',
        description:
          'Estimate monthly bank loan EMI payments with amortization schedules, convert salaries across periods, and calculate discounts.',
      },
      text: {
        id: 'text',
        name: 'Text & Writing Tools',
        description:
          'Count words, sentences, and paragraphs in real time, and track custom character limits for SEO and social media.',
      },
    },
    calculatorUI: {
      currencyLabel: 'Display currency',
      currencyNote:
        'Note: Currency selection changes display formatting and symbol only. It does not perform foreign exchange conversion.',
      calculateBtn: 'Calculate now',
      resetBtn: 'Reset',
      loadExampleBtn: 'Load example',
      copyResultsBtn: 'Copy results',
      copiedFeedback: 'Results copied!',
      clearTextBtn: 'Clear text',
      resultsHeading: 'Calculation results',
      formulaHeading: 'Formula and calculation method',
      instructionsHeading: 'Step-by-step instructions',
      exampleHeading: 'Practical example',
      relatedToolsHeading: 'Related tools',
      faqHeading: 'Frequently asked questions for this tool',
      openToolCta: 'Open calculator',
      backToAllTools: 'All tools',
      adPlaceholderLabel: 'Optional advertisement space (Reserved container)',
      adPlaceholderNote:
        'Clean static placeholder container reserved for future ad integration, kept well away from calculator inputs and results.',
      toggleAdSlotsLabel: 'AdSense Slots',
    },
    footer: {
      description:
        'CalculaFácil provides practical everyday business calculators, loan and salary estimators, and text tools in Spanish and English. Fast, transparent, and free.',
      toolsColumn: 'All 10 Tools',
      legalColumn: 'Trust & Legal',
      languagesColumn: 'Language & Settings',
      aboutLink: 'About Us',
      contactLink: 'Contact',
      privacyLink: 'Privacy Policy',
      termsLink: 'Terms & Conditions',
      disclaimerLink: 'Legal Disclaimer',
      copyright: `© ${new Date().getFullYear()} ${SITE_CONFIG.siteName}. All rights reserved.`,
      noRegistrationNote:
        'All calculators run directly in your browser. No account or registration required.',
    },
    legalPages: {
      about: {
        slug: 'about',
        url: '/en/about.html',
        seoTitle: 'About Us — CalculaFácil',
        metaDescription:
          'Learn about CalculaFácil: our mission to provide fast, accurate, transparent, and completely free bilingual online calculators and text tools.',
        h1: 'About Us',
        lastUpdated: 'November 2026',
        intro:
          'CalculaFácil was created with a straightforward goal: to provide practical, everyday calculators and text utilities that anyone—students, freelancers, small business owners, and households—can use immediately for free.',
        sections: [
          {
            heading: 'Our mission',
            paragraphs: [
              'Many online calculators hide basic answers behind sign-up walls, intrusive popups, or unexplained black-box numbers. At CalculaFácil, we believe calculating a product profit margin, checking a monthly loan installment, or counting characters for an article should be fast, transparent, and accessible on any device.',
              'We built ten complete tools in both Spanish and English, pairing instant calculation with clear explanations of the underlying formulas.',
            ],
          },
          {
            heading: 'Our principles of quality and trust',
            paragraphs: [
              '1. Transparent formulas: Every calculator displays the exact mathematical formula used, step-by-step instructions, and a worked practical example.',
              '2. Privacy-first browser execution: All calculations run directly in your browser using client-side JavaScript. We do not collect or store the numbers or text you type into our tools.',
              '3. Honest disclaimers: Our financial tools (such as the Bank Loan Calculator and Salary Calculator) clearly explain their mathematical assumptions and state that results are educational estimates rather than official bank quotes or tax filings.',
            ],
          },
          {
            heading: 'Who we build for',
            paragraphs: [
              'Whether you are a retailer pricing inventory in Spain, a freelancer estimating project costs in Latin America, a professional comparing salary frequencies in the United States or the United Kingdom, or a writer checking character limits anywhere in the world, CalculaFácil is built for you.',
            ],
          },
        ],
      },
      contact: {
        slug: 'contact',
        url: '/en/contact.html',
        seoTitle: 'Contact Us — CalculaFácil',
        metaDescription:
          'Contact CalculaFácil with feedback, bug reports, or questions about our bilingual online calculators and text utilities.',
        h1: 'Contact Us',
        lastUpdated: 'November 2026',
        intro:
          'We welcome your feedback, suggestions for improvement, and questions regarding any of our ten Spanish and English calculators.',
        sections: [
          {
            heading: 'Contact email address',
            paragraphs: [
              `You can reach us by email at our configurable contact address: ${SITE_CONFIG.contactEmail}`,
              'Configuration note: This contact email address is set as a clearly marked configurable placeholder in the central site configuration file until the production domain mailbox is connected.',
            ],
          },
          {
            heading: 'How we can help',
            paragraphs: [
              '• Reporting a calculation question or display issue on a specific mobile device or browser.',
              '• Suggesting clearer explanations, examples, or additional FAQs for existing tools.',
              '• Asking questions about our Privacy Policy, Terms and Conditions, or Legal Disclaimer.',
            ],
          },
          {
            heading: 'Protecting your privacy when contacting us',
            paragraphs: [
              'Please do not include sensitive personal information, bank account numbers, or confidential payroll documents when sending an email. If you have a question about a calculation, simply share the sample numbers you entered.',
            ],
          },
        ],
      },
      privacy: {
        slug: 'privacy-policy',
        url: '/en/privacy-policy.html',
        seoTitle: 'Privacy Policy — CalculaFácil',
        metaDescription:
          'Privacy Policy for CalculaFácil. Learn how all calculations run locally in your browser and how optional preferences and cookies are handled.',
        h1: 'Privacy Policy',
        lastUpdated: 'November 2026',
        intro:
          'At CalculaFácil, we respect your privacy. Our website is built to operate without user accounts, registration forms, or server-side databases.',
        sections: [
          {
            heading: '1. Calculator inputs and text tool content',
            paragraphs: [
              'All numbers (costs, prices, loan amounts, salaries, discounts) and all text entered into the Word Counter or Character Counter are processed strictly inside your own web browser.',
              'CalculaFácil does not transmit, record, or store your calculator inputs or text content on any external server.',
            ],
          },
          {
            heading: '2. Browser local storage (localStorage)',
            paragraphs: [
              'We use browser localStorage strictly to remember optional user preferences—such as your selected language (Spanish or English) and preferred display currency—with safe fallbacks if storage is disabled.',
              'This preference data stays on your device, contains no personally identifiable information, and can be cleared at any time through your browser settings.',
            ],
          },
          {
            heading: '3. Cookies and future advertising (Google AdSense)',
            paragraphs: [
              'In the future, this website may display advertisements served by Google AdSense or other compliant advertising partners. Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites.',
              'Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or https://www.aboutads.info.',
            ],
          },
          {
            heading: '4. Standard hosting logs',
            paragraphs: [
              'Like any static website hosted on standard content delivery networks (such as Cloudflare Pages), the hosting infrastructure may temporarily process technical request metadata (such as IP address and browser user-agent) solely to deliver pages and protect against abuse.',
            ],
          },
          {
            heading: '5. Privacy inquiries',
            paragraphs: [
              `If you have any questions about this Privacy Policy, please contact us at: ${SITE_CONFIG.contactEmail}`,
            ],
          },
        ],
      },
      terms: {
        slug: 'terms-and-conditions',
        url: '/en/terms-and-conditions.html',
        seoTitle: 'Terms and Conditions — CalculaFácil',
        metaDescription:
          'Terms and Conditions for using CalculaFácil online calculators and utilities. Free access rules, intellectual property, and user responsibilities.',
        h1: 'Terms and Conditions',
        lastUpdated: 'November 2026',
        intro:
          'By accessing and using CalculaFácil, you agree to comply with the following Terms and Conditions. If you do not agree with these terms, please discontinue use of the website.',
        sections: [
          {
            heading: '1. Free access and permitted use',
            paragraphs: [
              'CalculaFácil grants visitors free access to its online calculators and text tools for personal, educational, and everyday business use without requiring registration or payment.',
              'You agree to use the website lawfully and not to disrupt its technical availability or misappropriate its original code and bilingual educational content.',
            ],
          },
          {
            heading: '2. Informational nature of calculations',
            paragraphs: [
              'Every calculation result is generated mathematically from the inputs you enter and the standard formulas documented on each tool page.',
              'You are solely responsible for verifying that your inputs and calculation assumptions fit your specific business, financial, or academic context before making decisions.',
            ],
          },
          {
            heading: '3. Intellectual property',
            paragraphs: [
              'The website structure, code, layout, original Spanish and English descriptions, and the CalculaFácil name are protected by applicable copyright and intellectual property laws. You are free to copy and use the numerical results produced from your own inputs.',
            ],
          },
          {
            heading: '4. Updates to the website',
            paragraphs: [
              'We may update, refine, or improve the tools, explanations, and legal pages at any time to maintain accuracy and usability.',
            ],
          },
        ],
      },
      disclaimer: {
        slug: 'legal-disclaimer',
        url: '/en/legal-disclaimer.html',
        seoTitle: 'Legal Disclaimer — CalculaFácil',
        metaDescription:
          'Legal and financial disclaimer for CalculaFácil calculators, including bank loan EMI estimates, salary conversions, and display currencies.',
        h1: 'Legal Disclaimer',
        lastUpdated: 'November 2026',
        intro:
          'Please read this Legal Disclaimer carefully to understand the scope and limitations of the calculators provided on CalculaFácil.',
        sections: [
          {
            heading: '1. Not financial, banking, tax, or legal advice',
            paragraphs: [
              'All content, formulas, and calculation outputs on CalculaFácil are provided strictly for general informational and educational purposes. Nothing on this website constitutes professional financial, banking, tax, accounting, payroll, or legal advice.',
            ],
          },
          {
            heading: '2. Bank Loan / EMI Calculator disclaimer',
            paragraphs: [
              'The Bank Loan Calculator computes installments using the standard reducing-balance Equated Monthly Installment (EMI) mathematical formula. It does NOT provide an official bank quotation or lending offer, and it does not use bank-specific rates. Actual loan payments may differ due to lender origination fees, compulsory insurance, local taxes, day-count conventions, interest rate adjustments, and bank-specific terms.',
            ],
          },
          {
            heading: '3. Salary Calculator disclaimer',
            paragraphs: [
              'The Salary Calculator converts gross pay across payment frequencies using the working hours and working days entered by the user and subtracts only user-entered manual deductions. It does not automatically calculate country-specific income taxes or statutory withholdings. Estimated net salary is NOT an official payroll result.',
            ],
          },
          {
            heading: '4. Display currency notice',
            paragraphs: [
              'Selecting a currency (EUR, USD, MXN, ARS, COP, CLP, GBP, or PKR) changes only the display symbol and number formatting. This website does not perform foreign exchange conversion and never provides live exchange rates.',
            ],
          },
          {
            heading: '5. Limitation of liability',
            paragraphs: [
              'While every calculator formula has been independently tested for mathematical accuracy, CalculaFácil is provided on an "as is" basis without warranties of any kind. Always consult a qualified financial, tax, or legal professional before making binding financial decisions.',
              `For legal inquiries, please contact: ${SITE_CONFIG.contactEmail}`,
            ],
          },
        ],
      },
    },
  },
};
