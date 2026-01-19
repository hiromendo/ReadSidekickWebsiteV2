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
    installs: 'Más de 125 instalaciones',
    scrollToExplore: 'Desplázate para explorar',
    extensionPanel: 'Read Sidekick',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
  },

  // Problem
  problem: {
    sectionLabel: 'El Desafío',
    title: 'La Brecha de Alfabetización',
    subtitle: '130 millones de adultos en EE.UU. carecen de un nivel adecuado de alfabetización, y esto les está frenando.',
    stats: {
      adults: {
        stat: '130M',
        description: 'Adultos en EE.UU. que carecen de competencia de lectura adecuada',
      },
      deaf: {
        stat: '4° Grado',
        description: 'Nivel de lectura promedio de graduados sordos de secundaria',
      },
      inmates: {
        stat: '70%',
        description: 'De los reclusos que no pueden leer por encima de un nivel de 4° grado',
      },
      immigrants: {
        stat: '41%',
        description: 'De los adultos inmigrantes con los niveles más bajos de alfabetización en inglés',
      },
    },
    economicImpact: {
      label: 'Impacto Económico',
      title: 'en ingresos anuales potenciales',
      titleHighlight: '$2.2 billones',
      description: 'Esta es la cantidad que podría generarse al elevar a todos los adultos de EE.UU. al Nivel 3 de competencia de lectura.',
      correlationLabel: 'Los niveles más altos de alfabetización se correlacionan directamente con mayores ingresos:',
      lowestLiteracy: 'Niveles más bajos de alfabetización',
      highestLiteracy: 'Niveles más altos de alfabetización',
      comparison: 'Más del',
      comparisonHighlight: 'doble',
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
        description: 'Inspirado en el método "Oraciones Jugosas" de la Dra. Fillmore, descompone oraciones académicas complejas para desarrollar habilidades de comprensión más profundas',
        sample: 'Original: "Los indicadores macroeconómicos sugieren una expansión robusta, caracterizada por métricas de empleo en aumento y presiones inflacionarias contenidas."\n\nDesglose:\n- "Indicadores macroeconómicos" = señales económicas generales\n- "Expansión robusta" = crecimiento fuerte\n- "Métricas de empleo" = números de trabajo\n- "Presiones inflacionarias contenidas" = precios subiendo lentamente',
        teachNote: 'El modo difícil no solo simplifica, enseña. Te ayuda a notar palabras señal, identificar sujetos y predicados, entender metáforas y reformular ideas complejas con tus propias palabras.',
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
