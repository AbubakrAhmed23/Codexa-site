import { Container, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/motion/Reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Dictionary } from '@/i18n/dictionaries'
import type { FaqItem } from '@/lib/types'

export function FAQ({ dict, items }: { dict: Dictionary; items: FaqItem[] }) {
  const faqs: { question?: string | null; answer?: string | null }[] =
    items.length > 0 ? items : dict.faq.items

  return (
    <section id="faq" className="section-pad scroll-mt-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={dict.nav.faq} title={dict.faq.title} subtitle={dict.faq.subtitle} />

        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
