export type Language = 'en' | 'es'

export interface Translations {
  // Navigation
  nav: {
    problem: string
    howItWorks: string
    methodology: string
    about: string
    addToChrome: string
    addToChromeFree: string
  }

  // Hero
  hero: {
    tagline: string
    cta: string
    scrollToExplore: string
    extensionPanel: string
    easy: string
    medium: string
    hard: string
  }

  // Problem
  problem: {
    sectionLabel: string
    title: string
    subtitle: string
    beforeAfter: {
      beforeLabel: string
      afterLabel: string
      beforeText: string
      afterText: string
      caption: string
    }
    learnMode: {
      label: string
      subtitle: string
      sentence: string
      actorAction: {
        title: string
        quote: string
        who: string
        what: string
        grammarNote: string
      }
      hiddenMeaning: {
        title: string
        quote: string
        literalMeaning: string
        actualMeaning: string
        explanation: string
      }
      timeline: {
        title: string
        quote: string
        linkWord: string
        eventA: string
        eventB: string
        logic: string
      }
      nativeInsight: {
        title: string
        structure: string
        subject: string
        action: string
        time: string
        culturalNote: string
      }
    }
  }

  // WhyItMatters
  whyItMatters: {
    sectionLabel: string
    title: string
    titleItalic: string
    points: {
      languageInterface: { title: string; description: string }
      costMisunderstanding: { title: string; description: string }
      structuredThinking: { title: string; description: string }
      workforceUpskilling: { title: string; description: string }
    }
  }

  // HowItWorks
  howItWorks: {
    sectionLabel: string
    title: string
    titleItalic: string
    subtitle: string
    modes: {
      easy: { title: string; description: string; sample: string }
      medium: { title: string; description: string; sample: string }
      hard: { title: string; description: string; sample: string }
    }
    sampleOutput: string
    learnMode: {
      badge: string
      subtitle: string
      title: string
      description: string
      targetLanguage: string
      selectedLanguage: string
      sampleLabel: string
      sampleEnglish: string
      sampleExplanation: string
    }
    comingSoon: {
      label: string
      features: string[]
    }
  }

  // Methodology
  methodology: {
    sectionLabel: string
    title: string
    titleItalic: string
    subtitle: string
    pillars: {
      first: { title: string; description: string }
      second: { title: string; description: string }
      third: { title: string; description: string }
    }
    research: {
      label: string
      description: string
    }
  }

  // ASLTranslator
  aslTranslator: {
    comingSoon: string
    inDevelopment: string
    title: string
    subtitle: string
    howItWorks: string
    traditionalPhonics: string
    aslApproach: string
    likeKanji: string
    seeCat: string
    decodeSounds: string
    recognizeMeaning: string
    mapToASL: string
    visualMeaning: string
    whyAI: {
      title: string
      description: string
    }
  }

  // SocialProof
  socialProof: {
    sectionLabel: string
    title: string
    titleItalic: string
    stats: {
      uses: { value: string; label: string; description: string }
      words: { value: string; label: string; description: string }
      installs: { value: string; label: string; description: string }
      engagement: { value: string; label: string; description: string }
    }
    callout: string
    calloutHighlight: string
  }

  // Founder
  founder: {
    sectionLabel: string
    title: string
    titleItalic: string
    name: string
    bio: string[]
    credentials: {
      label: string
      mit: string
      stanford: string
    }
  }

  // Footer
  footer: {
    cta: {
      title: string
      titleItalic: string
      subtitle: string
      button: string
      learnMore: string
    }
    tagline: string
    description: string
    navigate: string
    connect: string
    legal: string
    privacy: string
    terms: string
    copyright: string
  }
}
