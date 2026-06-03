import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales, type Locale } from '@/i18n/config'
import { getCollection, getGlobal } from '@/lib/payload'
import { mediaUrl } from '@/lib/media'
import type {
  FaqItem,
  HomeContent,
  PricingPlan,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from '@/lib/types'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { DEFAULT_WHATSAPP } from '@/lib/whatsapp'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Portfolio } from '@/components/sections/Portfolio'
import { Pricing } from '@/components/sections/Pricing'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export const dynamic = 'force-dynamic'

async function loadData(locale: Locale) {
  const [home, settings, services, projectsRaw, plans, testimonials, faqs] = await Promise.all([
    getGlobal<HomeContent>('home-content', locale),
    getGlobal<SiteSettings>('site-settings', locale),
    getCollection<Service>('services', locale),
    getCollection<Project>('projects', locale),
    getCollection<PricingPlan>('pricing-plans', locale),
    getCollection<Testimonial>('testimonials', locale),
    getCollection<FaqItem>('faq', locale),
  ])
  // Öne çıkanlar önce, sonra order'a göre.
  const projects = [...projectsRaw].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 0) - (b.order ?? 0),
  )
  return { home, settings, services, projects, plans, testimonials, faqs }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [dict, settings] = await Promise.all([
    getDictionary(locale),
    getGlobal<SiteSettings>('site-settings', locale),
  ])
  const brand = settings?.brandName || 'Codexa'
  const title = settings?.metaTitle || `${brand} — ${dict.footer.tagline}`
  const description = settings?.metaDescription || dict.hero.subtitle
  const og = mediaUrl(settings?.ogImage, 'og')

  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]))

  return {
    metadataBase: process.env.NEXT_PUBLIC_SERVER_URL
      ? new URL(process.env.NEXT_PUBLIC_SERVER_URL)
      : undefined,
    title: { default: title, template: `%s — ${brand}` },
    description,
    alternates: { canonical: `/${locale}`, languages },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      siteName: brand,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: og ? [og] : undefined,
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const typedLocale = locale as Locale

  const dict = await getDictionary(typedLocale)
  const { home, settings, services, projects, plans, testimonials, faqs } = await loadData(typedLocale)

  const whatsapp =
    settings?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP

  return (
    <>
      <Navbar
        locale={typedLocale}
        brandName={settings?.brandName || 'Codexa'}
        logoUrl={mediaUrl(settings?.logo, 'thumbnail')}
        labels={dict.nav}
        langLabel={dict.language}
      />

      <main id="top">
        <Hero dict={dict} content={home} />
        <TrustBar dict={dict} content={home} />
        <Services dict={dict} services={services} />
        <Process dict={dict} content={home} />
        <Portfolio dict={dict} projects={projects} />
        <Pricing dict={dict} plans={plans} />
        <About dict={dict} content={home} />
        <Testimonials dict={dict} items={testimonials} />
        <FAQ dict={dict} items={faqs} />
        <Contact dict={dict} locale={typedLocale} settings={settings} whatsappNumber={whatsapp} />
      </main>

      <Footer dict={dict} locale={typedLocale} settings={settings} />
      <WhatsAppFloat number={whatsapp} label={dict.whatsapp} message={dict.whatsappMessage} />
    </>
  )
}
