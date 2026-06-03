import { Container, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ServiceIcon } from '@/lib/icons'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Service } from '@/lib/types'

export function Services({ dict, services }: { dict: Dictionary; services: Service[] }) {
  const items: { icon?: string | null; title?: string | null; description?: string | null }[] =
    services.length > 0 ? services : dict.services.items

  return (
    <section id="services" className="section-pad scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow={dict.nav.services}
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <RevealItem key={i}>
              <article className="group glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:ring-glow">
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(400px circle at 50% 0%, rgba(99,102,241,0.12), transparent 70%)' }}
                />
                <div className="relative">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/10 ring-1 ring-white/10">
                    <ServiceIcon name={s.icon} className="size-6 text-accent-soft" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
