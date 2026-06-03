'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, Globe, ChevronDown } from 'lucide-react'
import { localeLabels, locales, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

export function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function switchTo(locale: Locale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
    const segments = pathname.split('/')
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }
    router.push(segments.join('/') || `/${locale}`)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm text-muted transition-colors hover:border-white/25 hover:text-foreground"
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{localeLabels[current]}</span>
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="glass-strong absolute end-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl p-1.5 shadow-2xl">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/[0.06]',
                l === current ? 'text-foreground' : 'text-muted',
              )}
            >
              {localeLabels[l]}
              {l === current && <Check className="size-4 text-accent-soft" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
