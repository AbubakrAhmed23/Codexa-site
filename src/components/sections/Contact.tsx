import { Mail, Phone, MapPin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/section'
import { Reveal } from '@/components/motion/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { GlowOrbs } from '@/components/motion/GlowOrbs'
import { waLink } from '@/lib/whatsapp'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import type { SiteSettings } from '@/lib/types'

export function Contact({
  dict,
  locale,
  settings,
  whatsappNumber,
}: {
  dict: Dictionary
  locale: Locale
  settings: SiteSettings | null
  whatsappNumber?: string
}) {
  const contacts = [
    whatsappNumber && { icon: FaWhatsapp, label: dict.whatsapp, href: waLink(whatsappNumber) },
    settings?.email && { icon: Mail, label: settings.email, href: `mailto:${settings.email}` },
    settings?.phone && { icon: Phone, label: settings.phone, href: `tel:${settings.phone}` },
    settings?.location && { icon: MapPin, label: settings.location, href: null },
  ].filter(Boolean) as { icon: LucideIcon | IconType; label: string; href: string | null }[]

  return (
    <section id="contact" className="section-pad relative isolate scroll-mt-24">
      <GlowOrbs className="opacity-60" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">{dict.nav.contact}</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              {dict.contact.title}
            </h2>
            <p className="mt-5 text-pretty text-base text-muted sm:text-lg">{dict.contact.subtitle}</p>

            {contacts.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {contacts.map((c, i) => {
                  const Inner = (
                    <span className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-white/[0.05]">
                      <c.icon className="size-4 text-accent-soft" />
                      {c.label}
                    </span>
                  )
                  return (
                    <li key={i}>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm dict={dict.contact} locale={locale} whatsappNumber={whatsappNumber} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
