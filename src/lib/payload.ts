import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'

// Gerçek bir veritabanı yapılandırılmış mı? (placeholder veya boşsa Payload'ı hiç başlatma —
// böylece bağlantı kurulamadığında oluşacak unhandledRejection / çökme önlenir; site fallback
// içerikle render olur.)
export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL
  return Boolean(url) && !url!.includes('user:pass@localhost')
}

// Payload Local API istemcisi (server component'lerde HTTP olmadan veri çeker).
export async function getPayloadClient() {
  return getPayload({ config })
}

// Sık kullanılan: bir global'i belirli dilde getir.
export async function getGlobal<T = unknown>(slug: string, locale: Locale): Promise<T | null> {
  if (!isDbConfigured()) return null
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({
      slug: slug as never,
      locale,
      fallbackLocale: 'en',
      depth: 2,
      overrideAccess: true,
    })
    return data as T
  } catch {
    return null
  }
}

// Sık kullanılan: bir collection'ın yayındaki kayıtlarını belirli dilde getir.
export async function getCollection<T = unknown>(
  slug: string,
  locale: Locale,
  opts?: { limit?: number; sort?: string; where?: Record<string, unknown> },
): Promise<T[]> {
  if (!isDbConfigured()) return []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: slug as never,
      locale,
      fallbackLocale: 'en',
      depth: 2,
      limit: opts?.limit ?? 100,
      sort: opts?.sort ?? 'order',
      where: opts?.where as never,
      overrideAccess: true,
    })
    return (res.docs ?? []) as T[]
  } catch {
    return []
  }
}
