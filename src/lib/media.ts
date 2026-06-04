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

// Vercel Blob public CDN tabanı. Görseller Blob'da `<dosya-adı>` olarak tutulur ve
// public URL'leri token gerektirmeden erişilebilir; Payload'ın /api/media/file/ servis
// yolunu atlayıp doğrudan CDN'den sunmak en hızlı ve dayanıklı yol.
// Env ile ezilebilir (farklı store kullanılırsa NEXT_PUBLIC_BLOB_BASE_URL ayarla).
const BLOB_BASE = (
  process.env.NEXT_PUBLIC_BLOB_BASE_URL || 'https://0meon1hdbsvq6hbd.public.blob.vercel-storage.com'
).replace(/\/$/, '')

// Bir upload alanından (relation populate edilmiş olabilir) görsel URL'i çıkarır.
export function mediaUrl(media: MediaInput, size?: string): string | null {
  if (!media || typeof media !== 'object') return null
  const sized = size && media.sizes?.[size]?.url
  const raw = sized || media.url
  if (!raw) return null
  if (raw.startsWith('http') || raw.startsWith('//')) return raw
  // Payload medya yolunu doğrudan public Blob CDN'ine yönlendir.
  if (BLOB_BASE && raw.startsWith('/api/media/file/')) {
    return `${BLOB_BASE}/${raw.split('/').pop()}`
  }
  return `${SITE_URL}${raw}`
}

export function mediaAlt(media: MediaInput, fallback = ''): string {
  if (media && typeof media === 'object' && media.alt) return media.alt
  return fallback
}
