import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlowOrbs } from '@/components/motion/GlowOrbs'

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6 text-center">
      <GlowOrbs />
      <div className="relative">
        <p className="text-7xl font-semibold tracking-tight text-gradient sm:text-8xl">404</p>
        <p className="mt-4 text-lg text-muted">This page could not be found.</p>
        <Button asChild className="mt-8">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  )
}
