import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Language, Translations } from './types'
import { en } from './locales/en'
import { es } from './locales/es'

const STORAGE_KEY = 'readsidekick-language'

const translations: Record<Language, Translations> = { en, es }

function getInitialLanguage(): Language {
  // 1. Check localStorage (explicit user preference)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  }

  // 2. Detect from browser (es-MX, es-ES, es → all map to 'es')
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language || 'en'
    return browserLang.startsWith('es') ? 'es' : 'en'
  }

  return 'en'
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [])

  // Set initial html lang attribute
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
