import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../i18n/translations';
import type { Lang, Translations } from '../i18n/translations';

const LANGS: Lang[] = ['ro', 'ru', 'en', 'uk'];
const COOKIE_NAME = 'lang';
const DEFAULT_LANG: Lang = 'ru';

function getCookieLang(): Lang {
  if (typeof document === 'undefined') return DEFAULT_LANG;
  const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
  const val = match ? decodeURIComponent(match[1]) : null;
  
  // Если в куках есть валидный язык, используем его
  if (val && LANGS.includes(val as Lang)) {
    return val as Lang;
  }
  
  // Если куки нет/невалидны, пробуем язык браузера
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0].toLowerCase() as Lang;
    
    // Приоритет для русского языка
    if (browserLang === 'ru') {
      return 'ru';
    }
    
    if (LANGS.includes(browserLang)) {
      return browserLang;
    }
  }
  
  return DEFAULT_LANG;
}

function setCookieLang(lang: Lang) {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${lang}; expires=${expires}; path=/; SameSite=Lax`;
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: translations[DEFAULT_LANG],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getCookieLang);

  useEffect(() => {
    // синхронизируем html[lang] при старте и при изменении языка
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    setCookieLang(l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}