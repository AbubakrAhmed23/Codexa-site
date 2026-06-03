import { Check } from 'lucide-react'
import { Container, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n/dictionaries'
import type { PricingPlan } from '@/lib/types'

type PlanView = {
  name?: string | null
  tagline?: string | null
  price?: string | null
  period?: string | null
  features?: ({ label: string } | string)[] | null
  ctaLabel?: string | null
  highlighted?: boolean | null
}

export function Pricing({ dict, plans }: { dict: Dictionary; plans: PricingPlan[] }) {
  const items: PlanView[] = plans.length > 0 ? plans : dict.pricing.plans

  return (
    <section id="pricing" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-accent/10 blur-[120px]" />
      <Container>
        <SectionHeading
          eyebrow={dict.nav.pricing}
          title={dict.pricing.title}
          subtitle={dict.pricing.subtitle}
        />

        <RevealGroup className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {items.map((plan, i) => {
            const features = (plan.features ?? []).map((f) => (typeof f === 'string' ? f : f.label))
            const highlighted = Boolean(plan.highlighted)
            return (
              <RevealItem key={i} className="h-full">
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300',
                    highlighted
                      ? 'bg-gradient-to-b from-accent/[0.12] to-transparent ring-1 ring-accent/40 shadow-[0_20px_70px_-30px_rgba(99,102,241,0.6)] lg:-mt-4 lg:mb-0'
                      : 'glass hover:-translate-y-1',
                  )}
                >
                  {highlighted && (
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-xs font-semibold text-white rtl:translate-x-1/2">
                      {dict.pricing.popular}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                  {plan.tagline && <p className="mt-1 text-sm text-muted">{plan.tagline}</p>}

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="pb-1 text-sm text-muted">{plan.period}</span>}
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <Check className={cn('mt-0.5 size-4 shrink-0', highlighted ? 'text-accent-soft' : 'text-accent')} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="mt-8 w-full"
                  >
                    <a href="#contact">{plan.ctaLabel || dict.pricing.cta}</a>
                  </Button>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Container>
    </section>
  )
}
