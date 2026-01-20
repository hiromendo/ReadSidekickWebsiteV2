import type { Translations } from '../types'

export const es: Translations = {
  // Navigation
  nav: {
    problem: 'Problema',
    howItWorks: 'Cómo Funciona',
    methodology: 'Metodología',
    about: 'Acerca de',
    addToChrome: 'Agregar a Chrome',
    addToChromeFree: 'Agregar a Chrome - Gratis',
  },

  // Hero
  hero: {
    tagline: 'Una herramienta de aprendizaje innovadora que va más allá de los diccionarios tradicionales, empoderando a los adultos a comprender cualquier texto y desarrollar habilidades de comprensión más sólidas.',
    cta: 'Agregar a Chrome - Gratis',
    scrollToExplore: 'Desplázate para explorar',
    extensionPanel: 'Read Sidekick',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
  },

  // Problem
  problem: {
    sectionLabel: 'La Solución',
    title: 'Mira la Diferencia',
    subtitle: 'Read Sidekick transforma texto confuso en un lenguaje claro y simple.',
    beforeAfter: {
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      beforeText: 'De conformidad con los términos y condiciones establecidos en su acuerdo de cuenta, le notificamos que se ha aplicado a su cuenta un cargo por fondos insuficientes por la cantidad de $35.00 debido a una transacción que excedió su saldo disponible. Este cargo ha sido debitado de su cuenta a partir de la fecha indicada arriba. Si considera que este cargo fue aplicado por error, comuníquese con nuestro departamento de servicio al cliente dentro de los treinta (30) días calendario para disputar este cargo.',
      afterText: 'Le cobramos $35 de su cuenta porque no tenía suficiente dinero cuando intentó hacer un pago. Si cree que es un error, llámenos dentro de 30 días.',
      caption: 'Convertimos esto... en esto.',
    },
    learnMode: {
      label: 'Modo Aprender',
      subtitle: '"El Análisis Profundo"',
      sentence: 'The senator decided to throw in the towel after the polls closed.',
      actorAction: {
        title: 'El Actor y La Acción',
        quote: '"The senator decided..."',
        who: 'Un funcionario del gobierno (Senador)',
        what: 'Tomaron una decisión',
        grammarNote: 'Esto establece el sujeto y nos dice que alguien está a punto de hacer algo importante.',
      },
      hiddenMeaning: {
        title: 'El Significado Oculto (Modismo)',
        quote: '"...to throw in the towel..."',
        literalMeaning: 'Lanzar un pedazo de tela',
        actualMeaning: 'Rendirse o abandonar',
        explanation: 'Esto viene del boxeo—cuando el entrenador de un peleador lanza una toalla al ring, significa que se rinden.',
      },
      timeline: {
        title: 'La Línea de Tiempo (Secuencia)',
        quote: '"...after the polls closed."',
        linkWord: '"after" conecta dos eventos en el tiempo',
        eventA: 'Los centros de votación terminaron (polls closed)',
        eventB: 'El senador renunció (threw in the towel)',
        logic: 'El senador esperó hasta que terminó la votación antes de renunciar.',
      },
      nativeInsight: {
        title: 'Perspectiva en Tu Idioma (Español)',
        structure: 'La Estructura',
        subject: 'El senador (Sujeto)',
        action: 'decidió rendirse (Acción)',
        time: 'después de que cerraran las urnas (Tiempo)',
        culturalNote: '"Tirar la toalla" existe en español también! Muchas metáforas deportivas cruzan idiomas por la cultura deportiva compartida.',
      },
    },
  },

  // WhyItMatters
  whyItMatters: {
    sectionLabel: 'Por Qué Importa',
    title: 'En la Era de la IA,',
    titleItalic: 'La Alfabetización Importa Más Que Nunca',
    points: {
      languageInterface: {
        title: 'El Lenguaje es la Nueva Interfaz',
        description: 'El lenguaje escrito es ahora la forma principal de acceder al poder de la IA. Comprender indicaciones y resultados se ha convertido en una habilidad esencial.',
      },
      costMisunderstanding: {
        title: 'El Costo de Malinterpretar',
        description: 'A medida que proliferan las herramientas de IA, la alfabetización se convierte en una habilidad de seguridad, ayudando a los usuarios a detectar errores y reconocer respuestas incompletas o incorrectas.',
      },
      structuredThinking: {
        title: 'Pensamiento Estructurado',
        description: 'Usar la IA de manera efectiva requiere secuenciar ideas, comprender matices y seguir lógica de múltiples pasos, todos distintivos de una alfabetización sólida.',
      },
      workforceUpskilling: {
        title: 'Capacitación Laboral',
        description: 'A medida que la IA transforma el empleo, los trabajadores desplazados necesitan habilidades de alfabetización robustas para hacer la transición a nuevos roles y oportunidades.',
      },
    },
  },

  // HowItWorks
  howItWorks: {
    sectionLabel: 'Cómo Funciona',
    title: 'Lee Cualquier Contenido.',
    titleItalic: 'Comprende Todo.',
    subtitle: 'Read Sidekick es una extensión de Chrome que te ayuda a leer cualquier contenido que te interese, transformando texto complejo en algo que realmente puedes entender.',
    modes: {
      easy: {
        title: 'Modo Fácil',
        description: 'Transforma el texto en un lenguaje más simple apropiado para lectores principiantes',
        sample: 'La economía está creciendo. Más personas tienen trabajo. Los precios suben lentamente. Esto es bueno para la mayoría de las familias.',
      },
      medium: {
        title: 'Modo Medio',
        description: 'Ajusta la complejidad del texto para niveles de comprensión intermedios',
        sample: 'La economía se está expandiendo de manera constante. Las tasas de empleo han aumentado. La inflación se mantiene moderada. Estas condiciones benefician a muchos hogares.',
      },
      hard: {
        title: 'Modo Difícil',
        description: 'Resume el texto a un nivel avanzado, preservando la terminología técnica y los matices para lectores que buscan una comprensión sofisticada',
        sample: 'Los datos macroeconómicos apuntan a un crecimiento económico sostenido, con cifras de empleo en mejora y una inflación que se mantiene dentro de límites aceptables—indicadores positivos para la estabilidad financiera de los hogares.',
      },
    },
    sampleOutput: 'Ejemplo de Resultado',
    comingSoon: {
      label: 'Próximamente',
      features: [
        'Retroalimentación personalizada sobre vocabulario y estructuras de oraciones que encuentras desafiantes',
        'Traductor de inglés a ASL',
        'Seguimiento del nivel de comprensión lectora',
      ],
    },
  },

  // Methodology
  methodology: {
    sectionLabel: 'Nuestro Enfoque',
    title: 'Basado en',
    titleItalic: 'Ciencia del Aprendizaje Comprobada',
    subtitle: 'Read Sidekick está fundamentado en investigaciones de destacados académicos de alfabetización, desafiando los enfoques tradicionales al enfatizar el pensamiento de alto nivel y la complejidad natural del lenguaje.',
    pillars: {
      first: {
        title: 'Construir la Base Cognitiva',
        description: 'Ayudamos a los estudiantes a desarrollar el pensamiento analítico primero en su idioma más fuerte, preparando el cerebro para textos complejos.',
      },
      second: {
        title: 'Desempacar el Código Lingüístico',
        description: 'En lugar de evitar la gramática difícil, explicamos explícitamente cómo funciona el lenguaje académico, mostrando cómo las frases y cláusulas empaquetan significado.',
      },
      third: {
        title: 'Puente a la Lectura Independiente',
        description: 'A través de práctica guiada, los estudiantes ven el texto en inglés no como un misterio, sino como un código que pueden descifrar usando sus habilidades existentes.',
      },
    },
    research: {
      label: 'Fundamento de Investigación',
      description: 'Inspirado por el trabajo de Marlon Kuntze (investigación de alfabetización en ASL) y Lily Wong Fillmore (desarrollo del lenguaje académico).',
    },
  },

  // ASLTranslator
  aslTranslator: {
    comingSoon: 'Próximamente',
    inDevelopment: 'En Desarrollo',
    title: 'Traducción de Inglés a ASL',
    subtitle: 'Estamos construyendo un traductor de inglés a ASL diseñado específicamente para la comunidad sorda. Usando un enfoque logográfico inspirado en cómo funcionan los kanji japoneses, los estudiantes pueden mapear el inglés escrito directamente a señas de ASL, evitando el sonido por completo.',
    howItWorks: 'Cómo Funciona',
    traditionalPhonics: 'Fonética Tradicional',
    aslApproach: 'Enfoque ASL',
    likeKanji: 'Como Kanji',
    seeCat: 'Ver "CAT"',
    decodeSounds: 'Decodificar sonidos',
    recognizeMeaning: 'Reconocer significado',
    mapToASL: 'Mapear a seña o concepto ASL',
    visualMeaning: 'La forma visual conecta directamente con el significado',
    whyAI: {
      title: 'Por Qué la IA Hace Esto Posible',
      description: 'La captura de movimiento moderna captura con precisión los gestos faciales y de dedos, esenciales para el ASL. El renderizado de humanos digitales ahora puede expresar expresiones faciales auténticas, haciendo realidad la traducción escalable de ASL.',
    },
  },

  // SocialProof
  socialProof: {
    sectionLabel: 'Tracción',
    title: 'Confiado por',
    titleItalic: 'Miles de Estudiantes',
    stats: {
      uses: {
        value: '18,979+',
        label: 'Usos',
        description: 'Veces totales que se ha usado Read Sidekick',
      },
      words: {
        value: '1.2M',
        label: 'Palabras',
        description: 'Total de palabras procesadas',
      },
      installs: {
        value: '125+',
        label: 'Instalaciones',
        description: 'Instalaciones orgánicas en Chrome Web Store',
      },
      engagement: {
        value: '57%',
        label: 'DAU/WAU',
        description: 'Tasa de participación diaria',
      },
    },
    callout: 'Una proporción del 57% de usuarios activos diarios a semanales demuestra que Read Sidekick ofrece valor real: los usuarios siguen regresando.',
    calloutHighlight: 'proporción del 57% de usuarios activos diarios a semanales',
  },

  // Founder
  founder: {
    sectionLabel: 'Sobre el Fundador',
    title: 'Creado por Alguien',
    titleItalic: 'Que lo Entiende',
    name: 'Hiroshi Mendoza',
    bio: [
      'Hiroshi es un inmigrante de primera generación que creció en un hogar de habla japonesa y española en la Ciudad de México antes de mudarse a Miami a los 10 años, donde aprendió inglés a través del uso cotidiano en lugar de instrucción formal.',
      'Con un hermano sordo, domina el Lenguaje de Señas Americano y cree firmemente en la adquisición del idioma a través de la práctica social en lugar del estudio de gramática.',
    ],
    credentials: {
      label: 'Credenciales',
      mit: 'B.S. y M.Eng. en Ingeniería Eléctrica y Ciencias de la Computación del MIT',
      stanford: 'Maestría en Diseño de Stanford',
    },
  },

  // Footer
  footer: {
    cta: {
      title: 'Comienza a Leer con',
      titleItalic: 'Confianza',
      subtitle: 'Únete a miles de estudiantes que usan Read Sidekick para desbloquear cualquier texto.',
      button: 'Agregar a Chrome — Gratis',
      learnMore: 'Conoce más sobre nuestro enfoque',
    },
    tagline: 'Potencia Oportunidades de Carrera',
    description: 'Una herramienta de aprendizaje innovadora que empodera a los adultos a comprender cualquier texto.',
    navigate: 'Navegar',
    connect: 'Conectar',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    copyright: '© 2026 Read Sidekick. Todos los derechos reservados.',
  },
}
