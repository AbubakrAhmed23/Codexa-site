import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale, locales } from '@/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function detectLocale(req: NextRequest): string {
  // 1) Daha önce seçilmiş dil çerezi
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  // 2) Tarayıcı dil tercihi
  const accept = req.headers.get('accept-language')
  if (accept) {
    for (const part of accept.split(',')) {
      const code = part.split(';')[0].trim().slice(0, 2).toLowerCase()
      if (isLocale(code)) return code
    }
  }

  // 3) Varsayılan
  return defaultLocale
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  const res = NextResponse.redirect(url)
  res.cookies.set(LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
  return res
}

export const config = {
  // Payload yönetim paneli (/admin), API'ler (/api), Next içlerini ve dosyaları hariç tut.
  matcher: ['/((?!api|admin|_next|_payload|.*\\..*).*)'],
}
