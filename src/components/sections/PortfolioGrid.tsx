'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mediaUrl, mediaAlt } from '@/lib/media'
import type { Project } from '@/lib/types'

type Labels = {
  all: string
  viewProject: string
  empty: string
  categories: { landing: string; corporate: string; portfolio: string; ecommerce: string }
}

const CATS = ['landing', 'corporate', 'portfolio', 'ecommerce'] as const

const PLACEHOLDER_GRADIENTS = [
  'from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20',
  'from-violet-500/30 via-indigo-500/20 to-blue-500/20',
  'from-blue-500/25 via-indigo-500/20 to-violet-500/25',
  'from-fuchsia-500/25 via-violet-500/20 to-indigo-500/25',
]

export function PortfolioGrid({ projects, labels }: { projects: Project[]; labels: Labels }) {
  const [active, setActive] = useState<'all' | (typeof CATS)[number]>('all')

  const usedCats = useMemo(
    () => CATS.filter((c) => projects.some((p) => p.category === c)),
    [projects],
  )

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  )

  if (projects.length === 0) {
    return (
      <div className="glass mt-12 grid place-items-center rounded-2xl py-20 text-center text-muted">
        {labels.empty}
      </div>
    )
  }

  return (
    <div className="mt-12">
      {usedCats.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <FilterPill active={active === 'all'} onClick={() => setActive('all')}>
            {labels.all}
          </FilterPill>
          {usedCats.map((c) => (
            <FilterPill key={c} active={active === c} onClick={() => setActive(c)}>
              {labels.categories[c]}
            </FilterPill>
          ))}
        </div>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group glass relative overflow-hidden rounded-2xl"
            >
              <ProjectCard project={p} index={i} labels={labels} />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function ProjectCard({ project: p, index, labels }: { project: Project; index: number; labels: Labels }) {
  const cover = mediaUrl(p.coverImage, 'card')
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]
  const Wrapper = p.projectUrl ? 'a' : 'div'

  return (
    <Wrapper
      {...(p.projectUrl ? { href: p.projectUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="block"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={mediaAlt(p.coverImage, p.title || '')}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)}>
            <div className="bg-dots absolute inset-0 opacity-50" />
            <span className="absolute bottom-4 start-5 text-2xl font-semibold text-white/80">
              {p.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {p.category && (
          <span className="glass-strong absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-accent-soft">
            {labels.categories[p.category]}
          </span>
        )}
        {p.projectUrl && (
          <span className="glass-strong absolute end-4 top-4 grid size-9 place-items-center rounded-full text-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          {p.client && <span className="text-sm text-muted">{p.client}</span>}
        </div>
        {p.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>}

        {p.resultMetric && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-soft ring-1 ring-accent/20">
            <TrendingUp className="size-3.5" />
            {p.resultMetric}
          </div>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t, i) => (
              <span key={i} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-muted">
                {t.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'bg-gradient-to-r from-accent to-accent-2 text-white shadow-[0_6px_20px_-8px_rgba(99,102,241,0.7)]'
          : 'glass text-muted hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
