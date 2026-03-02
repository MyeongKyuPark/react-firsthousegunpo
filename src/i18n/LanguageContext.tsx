import { createContext, useContext, useState } from 'react'

export type Lang = 'ko' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'ko', setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
