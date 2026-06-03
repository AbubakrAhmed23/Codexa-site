export type MediaSize = { url?: string | null; width?: number | null; height?: number | null }

export type MediaDoc = {
  id?: string | number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, MediaSize | undefined> | null
}

type MediaInput = MediaDoc | string | number | null | undefined

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Bir upload alanından (relation populate edilmiş olabilir) görsel URL'i çıkarır.
export function mediaUrl(media: MediaInput, size?: string): string | null {
  if (!media || typeof media !== 'object') return null
  const sized = size && media.sizes?.[size]?.url
  const raw = sized || media.url
  if (!raw) return null
  // Yerel depolamada görece URL'leri mutlak yapmak için (gerekirse).
  if (raw.startsWith('http') || raw.startsWith('//')) return raw
  return `${SITE_URL}${raw}`
}

export function mediaAlt(media: MediaInput, fallback = ''): string {
  if (media && typeof media === 'object' && media.alt) return media.alt
  return fallback
}
