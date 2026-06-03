import type { MediaDoc } from './media'

// CMS içeriği için hafif görünüm tipleri (frontend tüketimi).
export type Project = {
  id: string | number
  title?: string | null
  client?: string | null
  slug?: string | null
  category?: 'landing' | 'corporate' | 'portfolio' | 'ecommerce' | null
  coverImage?: MediaDoc | null
  summary?: string | null
  resultMetric?: string | null
  tags?: { label: string }[] | null
  projectUrl?: string | null
  gallery?: { image?: MediaDoc | null }[] | null
  featured?: boolean | null
  order?: number | null
}

export type Service = {
  id: string | number
  title?: string | null
  description?: string | null
  icon?: string | null
}

export type PricingPlan = {
  id: string | number
  name?: string | null
  tagline?: string | null
  price?: string | null
  period?: string | null
  features?: { label: string }[] | null
  ctaLabel?: string | null
  highlighted?: boolean | null
}

export type Testimonial = {
  id: string | number
  quote?: string | null
  author?: string | null
  company?: string | null
  role?: string | null
  avatar?: MediaDoc | null
  rating?: number | null
}

export type FaqItem = {
  id: string | number
  question?: string | null
  answer?: string | null
}

export type SiteSettings = {
  brandName?: string | null
  tagline?: string | null
  logo?: MediaDoc | null
  email?: string | null
  phone?: string | null
  whatsapp?: string | null
  location?: string | null
  calendarUrl?: string | null
  socials?: { platform: string; url: string }[] | null
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: MediaDoc | null
}

export type HomeContent = {
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroHighlight?: string | null
  heroSubtitle?: string | null
  primaryCtaLabel?: string | null
  secondaryCtaLabel?: string | null
  stats?: { value: string; label: string }[] | null
  clientLogos?: { logo?: MediaDoc | null }[] | null
  processTitle?: string | null
  processSubtitle?: string | null
  processSteps?: { title: string; description?: string | null }[] | null
  aboutTitle?: string | null
  aboutBody?: string | null
  aboutPhoto?: MediaDoc | null
  skills?: { label: string }[] | null
}
