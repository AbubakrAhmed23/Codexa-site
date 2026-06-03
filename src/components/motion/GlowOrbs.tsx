import { cn } from '@/lib/utils'

// Arka plan için yumuşak, animasyonlu indigo/mor ışıma küreleri.
export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div
        className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px] animate-[aurora_16s_ease-in-out_infinite_alternate]"
        style={{ background: 'radial-gradient(circle at center, rgba(99,102,241,0.45), transparent 65%)' }}
      />
      <div
        className="absolute top-20 -right-32 size-[30rem] rounded-full opacity-50 blur-[110px] animate-[aurora_20s_ease-in-out_infinite_alternate]"
        style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.4), transparent 65%)' }}
      />
      <div
        className="absolute -bottom-40 -left-20 size-[28rem] rounded-full opacity-40 blur-[120px] animate-[aurora_24s_ease-in-out_infinite_alternate]"
        style={{ background: 'radial-gradient(circle at center, rgba(79,70,229,0.4), transparent 65%)' }}
      />
    </div>
  )
}
