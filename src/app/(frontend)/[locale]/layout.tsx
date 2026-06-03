import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import '../globals.css'
import { dir, isLocale, locales, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const typedLocale = locale as Locale

  return (
    <html
      lang={typedLocale}
      dir={dir(typedLocale)}
      className={cn(GeistSans.variable, plexArabic.variable)}
      suppressHydrationWarning
    >
      <body className="grain min-h-dvh antialiased">{children}</body>
    </html>
  )
}
