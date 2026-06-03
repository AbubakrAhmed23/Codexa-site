'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function StickyCTA({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      // Hero'dan sonra görün, en alttaki iletişim bölümünde gizlen.
      setVisible(y > 700 && y < max - 700)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-8px_rgba(99,102,241,0.8)] lg:bottom-7 lg:end-7"
        >
          <Sparkles className="size-4" />
          {label}
        </motion.a>
      )}
    </AnimatePresence>
  )
}
