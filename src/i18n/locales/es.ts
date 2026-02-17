import type { Translations } from '../types'

export const es: Translations = {
  // Navigation
  nav: {
    problem: 'Por Qué Funciona',
    howItWorks: 'Cómo Funciona',
    methodology: 'Nuestro Enfoque',
    about: 'Acerca de',
    addToChrome: 'Agregar a Chrome',
    addToChromeFree: 'Agregar a Chrome — Gratis',
  },

  // Hero
  hero: {
    tagline: 'Comprende todo lo que lees. Convierte artículos densos, jerga legal y contenido confuso en un lenguaje claro y simple — con un solo clic.',
    cta: 'Agregar a Chrome — Gratis',
    scrollToExplore: 'Desplázate para explorar',
    extensionPanel: 'Read Sidekick',
    easy: 'Simple',
    medium: 'Moderado',
    hard: 'Detallado',
  },

  // Problem
  problem: {
    sectionLabel: 'Cómo Funciona',
    title: 'Contenido complejo, simplificado.',
    subtitle: 'Read Sidekick reescribe texto denso y lleno de jerga en un lenguaje claro — para que captes el significado sin complicaciones.',
    beforeAfter: {
      beforeLabel: 'Original',
      afterLabel: 'Simplificado',
      beforeText: 'De conformidad con los términos y condiciones establecidos en su acuerdo de cuenta, le notificamos que se ha aplicado a su cuenta un cargo por fondos insuficientes por la cantidad de $35.00 debido a una transacción que excedió su saldo disponible. Este cargo ha sido debitado de su cuenta a partir de la fecha indicada arriba. Si considera que este cargo fue aplicado por error, comuníquese con nuestro departamento de servicio al cliente dentro de los treinta (30) días calendario para disputar este cargo.',
      afterText: 'Le cobramos $35 de su cuenta porque no tenía suficiente dinero cuando intentó hacer un pago. Si cree que es un error, llámenos dentro de 30 días.',
      caption: 'De esto... a esto.',
    },
    learnMode: {
      label: 'Modo Explorar',
      subtitle: '"El Análisis Profundo"',
      sentence: 'The senator decided to throw in the towel after the polls closed.',
      actorAction: {
        title: 'Quién hace qué',
        quote: '"The senator decided..."',
        who: 'Un funcionario del gobierno (Senador)',
        what: 'Tomaron una decisión',
        grammarNote: '"The senator decided..." establece el sujeto y nos dice que alguien está a punto de hacer algo importante.',
      },
      hiddenMeaning: {
        title: 'El significado real (Modismo)',
        quote: '"...to throw in the towel..."',
        literalMeaning: 'Lanzar un pedazo de tela',
        actualMeaning: 'Rendirse o abandonar',
        explanation: 'Esto viene del boxeo—cuando el entrenador de un peleador lanza una toalla al ring, significa que se rinden.',
      },
      timeline: {
        title: 'Qué pasó y cuándo (Secuencia)',
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

  // Confidence
  confidence: {
    sectionLabel: 'Lo Que Obtienes',
    headline: 'Tu lectura, potenciada.',
    subheadline: 'Read Sidekick trabaja silenciosamente a tu lado — claridad instantánea para cualquier contenido, justo cuando la necesitas.',
    points: {
      masterMessage: {
        title: 'Comprende cualquier cosa en línea',
        description: 'Artículos, apps, documentos, herramientas de IA. Si es texto, Read Sidekick puede aclararlo.',
      },
      boostCareer: {
        title: 'Trabaja con confianza',
        description: 'Maneja documentos complejos, informes y comunicaciones sin perder el ritmo.',
      },
      readConfidence: {
        title: 'Profundiza cuando quieras',
        description: 'Explora modismos, gramática y significados — a tu ritmo, en tus términos.',
      },
    },
  },

  // HowItWorks
  howItWorks: {
    sectionLabel: 'Cómo Funciona',
    title: 'Cualquier texto.',
    titleItalic: 'Tu nivel de detalle.',
    subtitle: 'Read Sidekick es una extensión de Chrome que simplifica contenido complejo — para que pases menos tiempo descifrando y más tiempo haciendo.',
    modes: {
      easy: {
        title: 'Simple',
        description: 'Lo esencial. Lenguaje claro y directo que va al grano.',
        sample: 'La economía está creciendo. Más personas tienen trabajo. Los precios suben lentamente. Esto es bueno para la mayoría de las familias.',
      },
      medium: {
        title: 'Moderado',
        description: 'Una reescritura equilibrada que mantiene más detalle mientras mejora la claridad.',
        sample: 'La economía se está expandiendo de manera constante. Las tasas de empleo han aumentado. La inflación se mantiene moderada. Estas condiciones benefician a muchos hogares.',
      },
      hard: {
        title: 'Detallado',
        description: 'Ediciones ligeras para mejorar la legibilidad. Lo más cercano al original.',
        sample: 'Los datos macroeconómicos apuntan a un crecimiento económico sostenido, con cifras de empleo en mejora y una inflación que se mantiene dentro de límites aceptables—indicadores positivos para la estabilidad financiera de los hogares.',
      },
    },
    sampleOutput: 'Ejemplo de Resultado',
    understandMode: {
      badge: 'Modo Entender',
      subtitle: '"Simplifica Cualquier Texto"',
    },
    learnMode: {
      badge: 'Modo Explorar',
      subtitle: '"El Análisis Profundo"',
      title: 'Selecciona Tu Idioma Preferido',
      description: 'Recorre cualquier texto línea por línea. Obtén modismos explicados, gramática decodificada y significados desglosados — todo en tu idioma preferido.',
      targetLanguage: 'Idioma Objetivo',
      selectedLanguage: 'Español',
      sampleLabel: 'Desglose Línea por Línea',
      sampleEnglish: 'A papal decree of 1493 had assigned all land in the New World west of 50 degrees W longitude to Spain.',
      sampleExplanation: 'Esta oración establece el contexto histórico y geopolítico fundamental. La Bula Papal de 1493 (Inter caetera) dividió el \'Nuevo Mundo\' entre España y Portugal, una decisión que tuvo profundas implicaciones políticas y económicas.',
    },
    comingSoon: {
      label: 'Próximamente',
      features: [
        'Vocabulario personalizado e información lingüística basada en lo que lees',
        'Traducción de inglés a ASL',
        'Seguimiento de progreso para ver cómo crecen tus habilidades con el tiempo',
      ],
    },
  },

  // Methodology
  methodology: {
    sectionLabel: 'Nuestro Enfoque',
    title: 'Basado en investigación lingüística,',
    titleItalic: 'no en suposiciones.',
    subtitle: 'Read Sidekick utiliza conocimientos de investigadores líderes en desarrollo del lenguaje y comprensión para hacer que el texto complejo sea genuinamente accesible.',
    pillars: {
      first: {
        title: 'Piensa primero en tu idioma más fuerte',
        description: 'Las ideas complejas son más fáciles de comprender cuando partes de lo que ya sabes. Read Sidekick se basa en tu conocimiento existente.',
      },
      second: {
        title: 'Observa cómo el lenguaje empaqueta significado',
        description: 'La escritura académica y profesional esconde mucha información en frases densas. Nosotros la desempacamos para que el significado sea claro.',
      },
      third: {
        title: 'Construye independencia con el tiempo',
        description: 'Cuanto más uses Read Sidekick, más patrones reconocerás por tu cuenta. El objetivo es que nos necesites menos, no más.',
      },
    },
    research: {
      label: 'Fundamento de Investigación',
      prefix: 'Inspirado por el trabajo de ',
      marlonKuntze: 'Prof. Marlon Kuntze',
      marlonKuntzeDetail: ' (investigación en ASL y lenguaje)',
      and: ' y ',
      lilyWongFillmore: 'Prof. Lily Wong Fillmore',
      lilyWongFillmoreDetail: ' (desarrollo del lenguaje académico).',
    },
  },

  // ASLTranslator
  aslTranslator: {
    comingSoon: 'Próximamente',
    inDevelopment: 'En Desarrollo',
    title: 'Traducción de Inglés a ASL',
    subtitle: 'Estamos construyendo una herramienta que mapea el inglés escrito directamente a ASL — evitando el sonido por completo. Inspirado en cómo los kanji japoneses conectan la forma visual con el significado, este enfoque trata al ASL como el idioma completo que es.',
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
    titleItalic: 'Miles de Personas',
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
    title: 'Creado desde',
    titleItalic: 'la experiencia real.',
    name: 'Hiroshi Mendoza',
    bio: [
      'Hiro creció en un hogar de habla japonesa y española en la Ciudad de México antes de mudarse a EE.UU. a los 10 años. Aprendió inglés no en un salón de clases, sino por curiosidad — leyendo libros que le encantaban con un diccionario a su lado.',
      'Con un hermano sordo, domina el ASL y cree que las mejores herramientas no te enseñan desde arriba — trabajan contigo.',
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
      title: 'Simplifica tu',
      titleItalic: 'próxima lectura.',
      subtitle: 'Miles de personas usan Read Sidekick todos los días. Pruébalo gratis.',
      button: 'Agregar a Chrome — Gratis',
      learnMore: 'Conoce más sobre nuestro enfoque',
    },
    tagline: 'Simplifica cualquier texto. Al instante.',
    description: 'Una extensión de Chrome que hace claro el contenido complejo — para todos.',
    navigate: 'Navegar',
    connect: 'Conectar',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    copyright: '© 2026 Read Sidekick. Todos los derechos reservados.',
  },
}
