import type { Translations } from '../types'

export const en: Translations = {
  // Navigation
  nav: {
    problem: 'Why It Works',
    howItWorks: 'How It Works',
    methodology: 'Our Approach',
    about: 'About',
    addToChrome: 'Add to Chrome',
    addToChromeFree: 'Add to Chrome — Free',
  },

  // Hero
  hero: {
    tagline: 'Understand anything you read. Turn dense articles, legal jargon, and confusing content into clear, simple language — in one click.',
    cta: 'Add to Chrome — Free',
    scrollToExplore: 'Scroll to explore',
    extensionPanel: 'Read Sidekick',
    easy: 'Simple',
    medium: 'Moderate',
    hard: 'Detailed',
  },

  // Problem
  problem: {
    sectionLabel: 'How It Works',
    title: 'Complex content, made clear.',
    subtitle: 'Read Sidekick rewrites dense, jargon-heavy text into plain language — so you get the meaning without the headache.',
    beforeAfter: {
      beforeLabel: 'Original',
      afterLabel: 'Simplified',
      beforeText: 'Pursuant to the terms and conditions set forth in your account agreement, we hereby notify you that your account has been assessed an insufficient funds fee in the amount of $35.00 due to a transaction that exceeded your available balance. This fee has been debited from your account as of the date indicated above. Should you believe this fee was assessed in error, please contact our customer service department within thirty (30) calendar days to dispute this charge.',
      afterText: 'We charged your account $35 because you didn\'t have enough money when you tried to make a payment. If you think this is a mistake, call us within 30 days.',
      caption: 'From this... to this.',
    },
    learnMode: {
      label: 'Explore Mode',
      subtitle: '"The Deep Dive"',
      sentence: 'The senator decided to throw in the towel after the polls closed.',
      actorAction: {
        title: 'Who\'s doing what',
        quote: '"The senator decided..."',
        who: 'A government official (Senator)',
        what: 'They made a choice',
        grammarNote: '"The senator decided..." sets up the subject and tells us someone is about to do something important.',
      },
      hiddenMeaning: {
        title: 'The real meaning (Idiom)',
        quote: '"...to throw in the towel..."',
        literalMeaning: ' Throwing a piece of cloth',
        actualMeaning: 'To quit or give up',
        explanation: 'This comes from boxing—when a fighter\'s coach throws a towel into the ring, it means they surrender.',
      },
      timeline: {
        title: 'What happened when (Sequence)',
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

  // Confidence
  confidence: {
    sectionLabel: 'What You Get',
    headline: 'Your reading, supercharged.',
    subheadline: 'Read Sidekick works quietly beside you — instant clarity for any content, right when you want it.',
    points: {
      masterMessage: {
        title: 'Understand anything online',
        description: 'Articles, apps, documents, AI tools. If it\'s text, Read Sidekick can clarify it.',
      },
      boostCareer: {
        title: 'Work with confidence',
        description: 'Handle complex documents, reports, and communications without slowing down.',
      },
      readConfidence: {
        title: 'Go deeper when you want to',
        description: 'Explore idioms, grammar, and meaning — on your terms, at your pace.',
      },
    },
  },

  // HowItWorks
  howItWorks: {
    sectionLabel: 'How It Works',
    title: 'Any text.',
    titleItalic: 'Your level of detail.',
    subtitle: 'Read Sidekick is a Chrome extension that simplifies complex content — so you spend less time decoding and more time doing.',
    modes: {
      easy: {
        title: 'Simple',
        description: 'The essentials. Clear, straightforward language that gets right to the point.',
        sample: 'The economy is growing. More people have jobs. Prices are going up slowly. This is good for most families.',
      },
      medium: {
        title: 'Moderate',
        description: 'A balanced rewrite that keeps more detail while improving clarity.',
        sample: 'The economy is expanding steadily. Employment rates have increased. Inflation remains moderate. These conditions benefit many households.',
      },
      hard: {
        title: 'Detailed',
        description: 'Light edits for readability. Closest to the original.',
        sample: 'The macroeconomic data points to sustained economic growth, with improving employment figures and inflation remaining within acceptable bounds—positive indicators for household financial stability.',
      },
    },
    sampleOutput: 'Sample Output',
    understandMode: {
      badge: 'Understand Mode',
      subtitle: '"Understand Any Text"',
    },
    learnMode: {
      badge: 'Explore Mode',
      subtitle: '"The Deep Dive"',
      title: 'Select Your Preferred Language',
      description: 'Go line by line through any text. Get idioms explained, grammar decoded, and meaning unpacked — all in your preferred language.',
      targetLanguage: 'Target Language',
      selectedLanguage: 'Spanish',
      sampleLabel: 'Line-by-Line Breakdown',
      sampleEnglish: 'A papal decree of 1493 had assigned all land in the New World west of 50 degrees W longitude to Spain.',
      sampleExplanation: 'Esta oración establece el contexto histórico y geopolítico fundamental. La Bula Papal de 1493 (Inter caetera) dividió el \'Nuevo Mundo\' entre España y Portugal, una decisión que tuvo profundas implicaciones políticas y económicas.',
    },
    comingSoon: {
      label: 'Coming Soon',
      features: [
        'Personalized vocabulary and language insights based on what you read',
        'English to ASL translation',
        'Progress tracking to see how your skills grow over time',
      ],
    },
  },

  // Methodology
  methodology: {
    sectionLabel: 'Our Approach',
    title: 'Built on language research,',
    titleItalic: 'not guesswork.',
    subtitle: 'Read Sidekick uses insights from leading researchers in language development and comprehension to make complex text genuinely accessible.',
    pillars: {
      first: {
        title: 'Think in your strongest language first',
        description: 'Complex ideas are easier to grasp when you start from what you already know. Read Sidekick builds on your existing knowledge.',
      },
      second: {
        title: 'See how language packs meaning',
        description: 'Academic and professional writing hides a lot of information in dense phrasing. We unpack it so the meaning comes through clearly.',
      },
      third: {
        title: 'Build independence over time',
        description: 'The more you use Read Sidekick, the more patterns you\'ll recognize on your own. The goal is for you to need us less, not more.',
      },
    },
    research: {
      label: 'Research Foundation',
      prefix: 'Inspired by the work of ',
      marlonKuntze: 'Prof. Marlon Kuntze',
      marlonKuntzeDetail: ' (ASL and language research)',
      and: ' and ',
      lilyWongFillmore: 'Prof. Lily Wong Fillmore',
      lilyWongFillmoreDetail: ' (academic language development).',
    },
  },

  // ASLTranslator
  aslTranslator: {
    comingSoon: 'Coming Soon',
    inDevelopment: 'In Development',
    title: 'English to ASL Translation',
    subtitle: 'We\'re building a tool that maps written English directly to ASL — bypassing sound entirely. Inspired by how Japanese kanji connects visual form to meaning, this approach treats ASL as the complete language it is.',
    howItWorks: 'How It Works',
    traditionalPhonics: 'Traditional Phonics',
    aslApproach: 'ASL Approach',
    likeKanji: 'Like Kanji',
    seeCat: 'See "CAT"',
    decodeSounds: 'Decode sounds',
    recognizeMeaning: 'Recognize meaning',
    mapToASL: 'Map to ASL sign',
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
    titleItalic: 'Thousands of People',
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
    title: 'Built from',
    titleItalic: 'real experience.',
    name: 'Hiroshi Mendoza',
    bio: [
      'Hiro grew up in a Japanese and Spanish-speaking household in Mexico City before moving to the U.S. at age 10. He learned English not in a classroom, but through curiosity — reading books he loved with a dictionary beside him.',
      'With a deaf brother, he\'s fluent in ASL and believes the best tools don\'t teach at you — they work with you.',
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
      title: 'Read anything',
      titleItalic: 'understand everything.',
      subtitle: 'Thousands of people use Read Sidekick every day. Try it free.',
      button: 'Add to Chrome — Free',
      learnMore: 'Learn more about our approach',
    },
    tagline: 'Understand any text. Instantly.',
    description: 'A Chrome extension that makes complex content clear — for everyone.',
    navigate: 'Navigate',
    connect: 'Connect',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 Read Sidekick. All rights reserved.',
  },
}
