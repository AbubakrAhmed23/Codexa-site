import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { GlowOrbs } from '@/components/motion/GlowOrbs'
import { Reveal } from '@/components/motion/Reveal'
import type { Dictionary } from '@/i18n/dictionaries'
import type { HomeContent } from '@/lib/types'

export function Hero({ dict, content }: { dict: Dictionary; content: HomeContent | null }) {
  const eyebrow = content?.heroEyebrow || dict.hero.eyebrow
  const title = content?.heroTitle || dict.hero.title
  const highlight = content?.heroHighlight || dict.hero.highlight
  const subtitle = content?.heroSubtitle || dict.hero.subtitle
  const primaryCta = content?.primaryCtaLabel || dict.hero.primaryCta
  const secondaryCta = content?.secondaryCtaLabel || dict.hero.secondaryCta

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <GlowOrbs />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent-soft">
              <Sparkles className="size-3.5" />
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {title} <span className="text-gradient">{highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">{subtitle}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  {primaryCta}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#work">{secondaryCta}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
