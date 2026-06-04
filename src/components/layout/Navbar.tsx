'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/Logo'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'

type NavLabels = {
  services: string
  portfolio: string
  pricing: string
  about: string
  faq: string
  contact: string
  cta: string
}

export function Navbar({
  locale,
  brandName,
  logoUrl,
  labels,
  langLabel,
}: {
  locale: Locale
  brandName: string
  logoUrl?: string | null
  labels: NavLabels
  langLabel: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#services', label: labels.services },
    { href: '#work', label: labels.portfolio },
    { href: '#pricing', label: labels.pricing },
    { href: '#about', label: labels.about },
    { href: '#faq', label: labels.faq },
  ]

  const home = `/${locale}`

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2.5' : 'py-4',
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-full px-4 transition-all duration-300 sm:px-5',
            scrolled ? 'glass-strong h-14 shadow-lg shadow-black/20' : 'h-15',
          )}
        >
          {/* Marka */}
          <Link href={home} className="group flex items-center gap-2.5 font-semibold tracking-tight">
            {logoUrl ? (
              <Image src={logoUrl} alt={brandName} width={32} height={32} className="size-8 rounded-lg object-contain" />
            ) : (
              <LogoMark className="size-8 transition-transform duration-300 group-hover:scale-105" />
            )}
            <span className="text-[1.15rem]">{brandName}</span>
          </Link>

          {/* Masaüstü linkler */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Sağ aksiyonlar */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LocaleSwitcher current={locale} label={langLabel} />
            </div>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#contact">{labels.cta}</a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'glass-strong absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col gap-2 p-6 transition-transform duration-300',
            open ? 'translate-x-0' : 'rtl:-translate-x-full ltr:translate-x-full',
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-semibold tracking-tight">
              <LogoMark className="size-8" />
              {brandName}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full border border-white/10"
            >
              <X className="size-5" />
            </button>
          </div>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-lg text-foreground/90 transition-colors hover:bg-white/[0.05]"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex items-center justify-between gap-3">
            <LocaleSwitcher current={locale} label={langLabel} />
          </div>
          <Button asChild size="lg" className="mt-2 w-full">
            <a href="#contact" onClick={() => setOpen(false)}>
              {labels.cta}
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
