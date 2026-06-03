'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { waLink } from '@/lib/whatsapp'

export function WhatsAppFloat({
  number,
  label,
  message,
}: {
  number?: string
  label: string
  message?: string
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <motion.a
      href={waLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={mounted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="group fixed bottom-5 right-5 z-50 lg:bottom-7 lg:right-7"
    >
      {/* Nabız halkası */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_-8px_rgba(37,211,102,0.7)] transition-transform duration-200 group-hover:scale-105">
        <FaWhatsapp className="size-7" />
      </span>
      {/* Tooltip */}
      <span className="glass-strong pointer-events-none absolute bottom-1/2 right-full me-3 translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </motion.a>
  )
}
