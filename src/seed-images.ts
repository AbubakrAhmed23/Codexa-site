import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// Her projeye konuya uygun bir görsel (LoremFlickr — anahtar kelimeyle CC foto).
const IMAGES: Record<string, { keywords: string; alt: string }> = {
  'lumen-store': { keywords: 'lamp,interior,lighting', alt: 'Designer lighting store' },
  'atlas-capital': { keywords: 'skyscraper,office,city', alt: 'Corporate finance office' },
  'nova-studio': { keywords: 'design,studio,creative', alt: 'Creative design studio' },
  'pulse-app': { keywords: 'running,fitness,sport', alt: 'Fitness and running' },
}

async function fetchImage(keywords: string, lock: number): Promise<Buffer | null> {
  // lock => her seferinde aynı (deterministik) foto gelsin
  const url = `https://loremflickr.com/1280/800/${keywords}?lock=${lock}`
  try {
    const r = await fetch(url, { redirect: 'follow' })
    if (!r.ok) return null
    const ct = r.headers.get('content-type') || ''
    if (!ct.startsWith('image/')) return null
    return Buffer.from(await r.arrayBuffer())
  } catch {
    return null
  }
}

async function run() {
  const payload = await getPayload({ config })

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    payload.logger.warn('BLOB_READ_WRITE_TOKEN yok — görseller Blob yerine yerel diske yazılır (production okuyamaz). İptal.')
    process.exit(1)
  }

  let i = 0
  for (const [slug, info] of Object.entries(IMAGES)) {
    i++
    const res = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })
    const project = res.docs[0] as { id: string | number } | undefined
    if (!project) {
      payload.logger.warn(`Proje bulunamadı: ${slug}`)
      continue
    }

    const buffer = await fetchImage(info.keywords, 100 + i)
    if (!buffer) {
      payload.logger.warn(`Görsel indirilemedi: ${slug}`)
      continue
    }

    const media = (await payload.create({
      collection: 'media',
      data: { alt: info.alt },
      file: { data: buffer, mimetype: 'image/jpeg', name: `${slug}.jpg`, size: buffer.length },
      overrideAccess: true,
    })) as { id: string | number }

    await payload.update({
      collection: 'projects',
      id: project.id,
      data: { coverImage: media.id } as never,
      overrideAccess: true,
    })

    payload.logger.info(`✓ ${slug} → media #${media.id} (${(buffer.length / 1024).toFixed(0)} KB)`)
  }

  payload.logger.info('✅ Proje görselleri yüklendi.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
