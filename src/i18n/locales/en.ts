import type { Translations } from '../types'

export const en: Translations = {
  // Navigation
  nav: {
    problem: 'Problem',
    howItWorks: 'How It Works',
    methodology: 'Methodology',
    about: 'About',
    addToChrome: 'Add to Chrome',
    addToChromeFree: 'Add to Chrome - It\'s Free',
  },

  // Hero
  hero: {
    tagline: 'An innovative learning tool that moves beyond traditional dictionaries, empowering adult learners to understand any text and build stronger comprehension abilities.',
    cta: 'Add to Chrome - It\'s Free',
    scrollToExplore: 'Scroll to explore',
    extensionPanel: 'Read Sidekick',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  },

  // Problem
  problem: {
    sectionLabel: 'The Solution',
    title: 'See the Difference',
    subtitle: 'Read Sidekick transforms confusing text into clear, simple language.',
    beforeAfter: {
      beforeLabel: 'Before',
      afterLabel: 'After',
      beforeText: 'Pursuant to the terms and conditions set forth in your account agreement, we hereby notify you that your account has been assessed an insufficient funds fee in the amount of $35.00 due to a transaction that exceeded your available balance. This fee has been debited from your account as of the date indicated above. Should you believe this fee was assessed in error, please contact our customer service department within thirty (30) calendar days to dispute this charge.',
      afterText: 'We charged your account $35 because you didn\'t have enough money when you tried to make a payment. If you think this is a mistake, call us within 30 days.',
      caption: 'We turn this... into this.',
    },
    learnMode: {
      label: 'Learn Mode',
      subtitle: '"The Deep Dive"',
      sentence: 'The senator decided to throw in the towel after the polls closed.',
      actorAction: {
        title: 'The Actor & The Action',
        quote: '"The senator decided..."',
        who: 'A government official (Senator)',
        what: 'They made a choice',
        grammarNote: 'This sets up the subject and tells us someone is about to do something important.',
      },
      hiddenMeaning: {
        title: 'The Hidden Meaning (Idiom)',
        quote: '"...to throw in the towel..."',
        literalMeaning: 'Throwing a piece of cloth',
        actualMeaning: 'To quit or give up',
        explanation: 'This comes from boxing—when a fighter\'s coach throws a towel into the ring, it means they surrender.',
      },
      timeline: {
        title: 'The Timeline (Sequence)',
        quote: '"...after the polls closed."',
        linkWord: '"after" connects two events in time',
        eventA: 'Voting centers finished (polls closed)',
        eventB: 'Senator quit (threw in the towel)',
        logic: 'The senator waited until voting was over before quitting.',
      },
      nativeInsight: {
        title: 'Native Language Insight (Spanish)',
        structure: 'La Estructura',
        subject: 'El senador (Sujeto)',
        action: 'decidió rendirse (Acción)',
        time: 'después de que cerraran las urnas (Tiempo)',
        culturalNote: '"Tirar la toalla" exists in Spanish too! Many sports metaphors cross languages because of shared sports culture.',
      },
    },
  },

  // WhyItMatters
  whyItMatters: {
    sectionLabel: 'Why It Matters',
    title: 'In the Age of AI,',
    titleItalic: 'Literacy Matters More Than Ever',
    points: {
      languageInterface: {
        title: 'Language is the New Interface',
        description: 'Written language is now the primary way to access the power of AI. Understanding prompts and outputs has become an essential skill.',
      },
      costMisunderstanding: {
        title: 'The Cost of Misunderstanding',
        description: 'As AI tools proliferate, literacy becomes a safety skill—helping users catch errors and recognize incomplete or incorrect answers.',
      },
      structuredThinking: {
        title: 'Structured Thinking',
        description: 'Using AI effectively requires sequencing ideas, understanding nuance, and following multi-step logic—all hallmarks of strong literacy.',
      },
      workforceUpskilling: {
        title: 'Workforce Upskilling',
        description: 'As AI reshapes employment, displaced workers need robust literacy skills to transition into new roles and opportunities.',
      },
    },
  },

  // HowItWorks
  howItWorks: {
    sectionLabel: 'How It Works',
    title: 'Read Any Content.',
    titleItalic: 'Understand It All.',
    subtitle: 'Read Sidekick is a Chrome extension that helps you read any content you\'re interested in—transforming complex text into something you can actually understand.',
    modes: {
      easy: {
        title: 'Easy Mode',
        description: 'Transforms text into simpler language appropriate for beginning readers',
        sample: 'The economy is growing. More people have jobs. Prices are going up slowly. This is good for most families.',
      },
      medium: {
        title: 'Medium Mode',
        description: 'Adjusts text complexity for intermediate comprehension levels',
        sample: 'The economy is expanding steadily. Employment rates have increased. Inflation remains moderate. These conditions benefit many households.',
      },
      hard: {
        title: 'Hard Mode',
        description: 'Summarizes text at an advanced level, preserving technical terminology and nuance for readers who want sophisticated comprehension',
        sample: 'The macroeconomic data points to sustained economic growth, with improving employment figures and inflation remaining within acceptable bounds—positive indicators for household financial stability.',
      },
    },
    sampleOutput: 'Sample Output',
    learnMode: {
      badge: 'Learn Mode',
      subtitle: '"The Deep Dive"',
      title: 'Select Your Native Language',
      description: 'Learn Mode breaks down text line by line, explaining grammar, idioms, and meaning in your native language for deeper understanding.',
      targetLanguage: 'Target Language',
      selectedLanguage: 'Spanish',
      sampleLabel: 'Line-by-Line Breakdown',
      sampleEnglish: 'A papal decree of 1493 had assigned all land in the New World west of 50 degrees W longitude to Spain.',
      sampleExplanation: 'Esta oración establece el contexto histórico y geopolítico fundamental. La Bula Papal de 1493 (Inter caetera) dividió el \'Nuevo Mundo\' entre España y Portugal, una decisión que tuvo profundas implicaciones políticas y económicas.',
    },
    comingSoon: {
      label: 'Coming Soon',
      features: [
        'Personalized feedback on vocabulary and sentence structures you find challenging',
        'English to ASL translator',
        'Reading comprehension level tracking',
      ],
    },
  },

  // Methodology
  methodology: {
    sectionLabel: 'Our Approach',
    title: 'Built on Proven',
    titleItalic: 'Learning Science',
    subtitle: 'Read Sidekick is grounded in research from leading literacy scholars, challenging traditional approaches by emphasizing high-level thinking and the natural complexity of language.',
    pillars: {
      first: {
        title: 'Build the Cognitive Foundation',
        description: 'We help learners develop analytical thinking in their strongest language first—preparing the brain for complex text.',
      },
      second: {
        title: 'Unpack the Linguistic Code',
        description: 'Instead of avoiding difficult grammar, we explicitly break down how academic language works—showing how phrases and clauses pack meaning.',
      },
      third: {
        title: 'Bridge to Independent Reading',
        description: 'Through guided practice, learners see English text not as a mystery, but as a code they can crack using their existing skills.',
      },
    },
    research: {
      label: 'Research Foundation',
      description: 'Inspired by the work of Marlon Kuntze (ASL literacy research) and Lily Wong Fillmore (academic language development).',
    },
  },

  // ASLTranslator
  aslTranslator: {
    comingSoon: 'Coming Soon',
    inDevelopment: 'In Development',
    title: 'English to ASL Translation',
    subtitle: 'We\'re building an English to ASL translator designed specifically for the Deaf community. Using a logographic approach inspired by how Japanese kanji works, learners can map written English directly to ASL signs—bypassing sound entirely.',
    howItWorks: 'How It Works',
    traditionalPhonics: 'Traditional Phonics',
    aslApproach: 'ASL Approach',
    likeKanji: 'Like Kanji',
    seeCat: 'See "CAT"',
    decodeSounds: 'Decode sounds',
    recognizeMeaning: 'Recognize meaning',
    mapToASL: 'Map to ASL sign or concept',
    visualMeaning: 'Visual form connects directly to meaning',
    whyAI: {
      title: 'Why AI Makes This Possible',
      description: 'Modern motion capture accurately captures face and finger gestures—essential for ASL. Digital human rendering can now express authentic facial expressions, making scalable ASL translation a reality.',
    },
  },

  // SocialProof
  socialProof: {
    sectionLabel: 'Traction',
    title: 'Trusted by',
    titleItalic: 'Thousands of Learners',
    stats: {
      uses: {
        value: '18,979+',
        label: 'Uses',
        description: 'Total times Read Sidekick has been used',
      },
      words: {
        value: '1.2M',
        label: 'Words',
        description: 'Total words processed',
      },
      installs: {
        value: '125+',
        label: 'Installs',
        description: 'Organic Chrome Web Store installs',
      },
      engagement: {
        value: '57%',
        label: 'DAU/WAU',
        description: 'Daily engagement rate',
      },
    },
    callout: 'A 57% daily-to-weekly active user ratio shows Read Sidekick delivers real value—users keep coming back.',
    calloutHighlight: '57% daily-to-weekly active user ratio',
  },

  // Founder
  founder: {
    sectionLabel: 'About the Founder',
    title: 'Built by Someone',
    titleItalic: 'Who Gets It',
    name: 'Hiroshi Mendoza',
    bio: [
      'Hiroshi is a first-generation immigrant who grew up in a Japanese and Spanish-speaking household in Mexico City before moving to Miami at age 10, where he learned English through everyday use rather than formal instruction.',
      'With a deaf brother, he\'s proficient in American Sign Language and believes firmly in language acquisition through social practice rather than grammar study.',
    ],
    credentials: {
      label: 'Credentials',
      mit: 'B.S. and M.Eng. in Electrical Engineering and Computer Science from MIT',
      stanford: 'Masters in Design from Stanford',
    },
  },

  // Footer
  footer: {
    cta: {
      title: 'Start Reading with',
      titleItalic: 'Confidence',
      subtitle: 'Join thousands of learners using Read Sidekick to unlock any text.',
      button: 'Add to Chrome — Free',
      learnMore: 'Learn more about our approach',
    },
    tagline: 'Augment Career Opportunities',
    description: 'An innovative learning tool that empowers adult learners to understand any text.',
    navigate: 'Navigate',
    connect: 'Connect',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 Read Sidekick. All rights reserved.',
  },
}
