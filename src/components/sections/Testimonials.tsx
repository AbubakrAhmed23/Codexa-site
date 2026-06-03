import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { Container, SectionHeading } from '@/components/ui/section'
import { mediaUrl } from '@/lib/media'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Testimonial } from '@/lib/types'

export function Testimonials({ dict, items }: { dict: Dictionary; items: Testimonial[] }) {
  if (items.length === 0) return null

  // Akıcı bir marquee için kartları çoğalt.
  const loop = items.length < 4 ? [...items, ...items, ...items] : [...items, ...items]

  return (
    <section className="section-pad overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow={dict.testimonials.title}
          title={dict.testimonials.title}
          subtitle={dict.testimonials.subtitle}
        />
      </Container>

      <div className="marquee-mask group relative mt-14 flex">
        <div className="flex shrink-0 gap-5 pe-5 animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const avatar = mediaUrl(t.avatar, 'thumbnail')
  const rating = t.rating ?? 5
  return (
    <figure className="glass flex w-[88vw] max-w-sm shrink-0 flex-col rounded-2xl p-6 sm:w-[26rem]">
      <Quote className="size-7 text-accent/40" />
      <blockquote className="mt-4 flex-1 text-pretty text-[0.95rem] leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        {avatar ? (
          <Image src={avatar} alt={t.author || ''} width={44} height={44} className="size-11 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white">
            {(t.author || '?').charAt(0)}
          </span>
        )}
        <figcaption className="min-w-0">
          <div className="truncate text-sm font-semibold">{t.author}</div>
          <div className="truncate text-xs text-muted">
            {[t.role, t.company].filter(Boolean).join(' · ')}
          </div>
        </figcaption>
        <div className="ms-auto flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-accent-soft text-accent-soft" />
          ))}
        </div>
      </div>
    </figure>
  )
}
