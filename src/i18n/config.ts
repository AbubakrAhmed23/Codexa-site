// Sitenin desteklediği diller. Payload localization ile birebir aynı kodlar.
export const locales = ['en', 'tr', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// Sağdan-sola (RTL) yazılan diller.
const rtlLocales: Locale[] = ['ar']

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dir(locale: Locale): 'rtl' | 'ltr' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  ar: 'العربية',
}

// HTML lang / hreflang için tam etiketler.
export const localeHrefLang: Record<Locale, string> = {
  en: 'en',
  tr: 'tr',
  ar: 'ar',
}
