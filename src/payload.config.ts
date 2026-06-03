import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { PricingPlans } from './collections/PricingPlans'
import { Testimonials } from './collections/Testimonials'
import { FAQ } from './collections/FAQ'
import { Leads } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { HomeContent } from './globals/HomeContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Görseller: Vercel Blob token'ı varsa CDN'e, yoksa (lokal geliştirme) yerel diske yazılır.
const plugins: Plugin[] = []
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Codexa Yönetim',
    },
  },
  collections: [Users, Media, Projects, Services, PricingPlans, Testimonials, FAQ, Leads],
  globals: [SiteSettings, HomeContent],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Türkçe', code: 'tr' },
      { label: 'العربية', code: 'ar', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Vercel Postgres bazen DATABASE_URL yerine POSTGRES_URL enjekte eder — ikisini de destekle.
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins,
})
