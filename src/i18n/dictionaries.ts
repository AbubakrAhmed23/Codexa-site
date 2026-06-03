import 'server-only'
import type { Locale } from './config'

// Arayüz statik metinleri (CMS'ten gelmeyen sabit etiketler).
const dictionaries = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  tr: () => import('@/messages/tr.json').then((m) => m.default),
  ar: () => import('@/messages/ar.json').then((m) => m.default),
} as const

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
