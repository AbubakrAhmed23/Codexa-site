import Image from 'next/image'
import { Container } from '@/components/ui/section'
import { Reveal } from '@/components/motion/Reveal'
import { mediaUrl } from '@/lib/media'
import type { Dictionary } from '@/i18n/dictionaries'
import type { HomeContent } from '@/lib/types'

export function TrustBar({ dict, content }: { dict: Dictionary; content: HomeContent | null }) {
  const stats = content?.stats?.length ? content.stats : dict.trust.stats
  const logos = (content?.clientLogos ?? [])
    .map((l) => mediaUrl(l.logo, 'thumbnail'))
    .filter(Boolean) as string[]

  return (
    <section className="relative border-y border-white/5 py-12 sm:py-14">
      <Container>
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted/70">
            {dict.trust.title}
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} className="text-center">
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <span className="text-gradient">{s.value}</span>
              </div>
              <div className="mt-1.5 text-xs text-muted sm:text-sm">{s.label}</div>
            </Reveal>
          ))}
        </div>

        {logos.length > 0 && (
          <div className="marquee-mask mt-12 flex overflow-hidden">
            <div className="flex shrink-0 items-center gap-14 pe-14 animate-[marquee_38s_linear_infinite]">
              {[...logos, ...logos].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={120}
                  height={36}
                  className="h-7 w-auto opacity-50 grayscale transition hover:opacity-90"
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
