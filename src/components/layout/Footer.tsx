import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaDribbble,
  FaBehance,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa6'
import { Container } from '@/components/ui/section'
import { LogoMark } from '@/components/Logo'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import type { SiteSettings } from '@/lib/types'

const SOCIAL_ICONS: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  instagram: FaInstagram,
  dribbble: FaDribbble,
  behance: FaBehance,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
}

export function Footer({
  dict,
  locale,
  settings,
}: {
  dict: Dictionary
  locale: Locale
  settings: SiteSettings | null
}) {
  const brand = settings?.brandName || 'Codexa'
  const tagline = settings?.tagline || dict.footer.tagline
  const socials = settings?.socials ?? []
  const year = 2026

  const navLinks = [
    { href: '#services', label: dict.nav.services },
    { href: '#work', label: dict.nav.portfolio },
    { href: '#pricing', label: dict.nav.pricing },
    { href: '#about', label: dict.nav.about },
    { href: '#faq', label: dict.nav.faq },
    { href: '#contact', label: dict.nav.contact },
  ]

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marka */}
          <div className="max-w-sm">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 font-semibold tracking-tight">
              <LogoMark className="size-8" />
              <span className="text-[1.15rem]">{brand}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{tagline}</p>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map((s, i) => {
                  const Icon = SOCIAL_ICONS[s.platform]
                  return (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="grid size-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-foreground"
                    >
                      {Icon ? <Icon className="size-4" /> : s.platform.charAt(0).toUpperCase()}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Bölümler */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted/70">{dict.footer.sections}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted/70">{dict.footer.getInTouch}</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="transition-colors hover:text-foreground">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="transition-colors hover:text-foreground">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.location && <li>{settings.location}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted/70">
            © {year} {brand}. {dict.footer.rights}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            {dict.footer.backToTop}
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
