import { Container, SectionHeading } from '@/components/ui/section'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import type { Dictionary } from '@/i18n/dictionaries'
import type { HomeContent } from '@/lib/types'

export function Process({ dict, content }: { dict: Dictionary; content: HomeContent | null }) {
  // CMS satırları boşsa (örn. eksik çeviri) varsayılan içeriğe düş.
  const cmsSteps = (content?.processSteps ?? []).filter((s) => s.title)
  const steps: { title?: string | null; description?: string | null }[] =
    cmsSteps.length ? cmsSteps : dict.process.steps
  const title = content?.processTitle || dict.process.title
  const subtitle = content?.processSubtitle || dict.process.subtitle

  return (
    <section className="section-pad relative">
      <Container>
        <SectionHeading eyebrow={dict.process.title} title={title} subtitle={subtitle} />

        <RevealGroup className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <RevealItem key={i} className="relative">
              <div className="glass h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-sm font-semibold text-accent-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
