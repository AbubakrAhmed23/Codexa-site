import { cn } from '@/lib/utils'

// Codexa marka ikonu — indigo→mor gradient yuvarlatılmış kare üzerinde
// geometrik bir "C" monogramı + aksan noktası. Tamamen vektörel, her boyutta keskin.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="Codexa"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="codexa-g" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="codexa-sheen" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tile */}
      <rect width="40" height="40" rx="11" fill="url(#codexa-g)" />
      <rect width="40" height="40" rx="11" fill="url(#codexa-sheen)" />
      <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="10.4" stroke="white" strokeOpacity="0.18" strokeWidth="1.2" />

      {/* Geometrik "C" monogramı */}
      <path
        d="M26.4 13.0 A 9.3 9.3 0 1 0 26.4 27.0"
        stroke="white"
        strokeWidth="3.7"
        strokeLinecap="round"
      />
      {/* Aksan noktası (C ağzında) */}
      <circle cx="25.0" cy="20" r="2.15" fill="white" />
    </svg>
  )
}

// İkon + "Codexa" wordmark birlikte.
export function Logo({
  className,
  markClassName,
  textClassName,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('size-8', markClassName)} />
      <span className={cn('text-[1.15rem] font-semibold tracking-tight text-foreground', textClassName)}>
        Codexa
      </span>
    </span>
  )
}
