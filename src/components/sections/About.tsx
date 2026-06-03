import Image from 'next/image'
import { Container } from '@/components/ui/section'
import { Reveal } from '@/components/motion/Reveal'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Dictionary } from '@/i18n/dictionaries'
import type { HomeContent } from '@/lib/types'

const DEFAULT_SKILLS = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Figma', 'SEO', 'Payload CMS', 'Framer Motion']

export function About({ dict, content }: { dict: Dictionary; content: HomeContent | null }) {
  const title = content?.aboutTitle || dict.about.title
  const body = content?.aboutBody || dict.about.body
  const photo = mediaUrl(content?.aboutPhoto, 'feature')
  const skills = content?.skills?.length ? content.skills.map((s) => s.label) : DEFAULT_SKILLS

  return (
    <section id="about" className="section-pad scroll-mt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Görsel */}
          <Reveal className="order-last lg:order-first">
            <div className="relative">
              <div className="ring-glow relative aspect-square overflow-hidden rounded-3xl glass">
                {photo ? (
                  <Image
                    src={photo}
                    alt={mediaAlt(content?.aboutPhoto, title)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent">
                    <div className="bg-dots absolute inset-0 opacity-50" />
                    <span className="relative text-7xl font-semibold text-white/15">C</span>
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-accent/10 blur-3xl" />
            </div>
          </Reveal>

          {/* Metin */}
          <div>
            <Reveal>
              <span className="eyebrow">{dict.nav.about}</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{body}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted/70">
                {dict.about.skillsTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="glass rounded-full px-3.5 py-1.5 text-sm text-foreground/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
