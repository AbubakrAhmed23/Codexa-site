import { Container, SectionHeading } from '@/components/ui/section'
import { PortfolioGrid } from './PortfolioGrid'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Project } from '@/lib/types'

export function Portfolio({ dict, projects }: { dict: Dictionary; projects: Project[] }) {
  return (
    <section id="work" className="section-pad scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow={dict.nav.portfolio}
          title={dict.portfolio.title}
          subtitle={dict.portfolio.subtitle}
        />
        <PortfolioGrid
          projects={projects}
          labels={{
            all: dict.portfolio.all,
            viewProject: dict.portfolio.viewProject,
            empty: dict.portfolio.empty,
            categories: dict.portfolio.categories,
          }}
        />
      </Container>
    </section>
  )
}
