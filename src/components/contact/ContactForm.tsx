'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { waLink } from '@/lib/whatsapp'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

type ContactDict = Dictionary['contact']

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none'

export function ContactForm({
  dict,
  locale,
  whatsappNumber,
}: {
  dict: ContactDict
  locale: Locale
  whatsappNumber?: string
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [successText, setSuccessText] = useState(dict.success)

  // Form alanlarından, seçilen dile göre etiketlenmiş bir WhatsApp mesajı oluşturur.
  function buildWaMessage(data: Record<string, string>): string {
    const lines = [`*${dict.messageHeading}*`, '']
    if (data.name) lines.push(`${dict.fields.name}: ${data.name}`)
    if (data.email) lines.push(`${dict.fields.email}: ${data.email}`)
    if (data.projectType) lines.push(`${dict.fields.projectType}: ${dict.projectTypes[data.projectType as keyof typeof dict.projectTypes] ?? data.projectType}`)
    if (data.budget) lines.push(`${dict.fields.budget}: ${dict.budgets[data.budget as keyof typeof dict.budgets] ?? data.budget}`)
    if (data.timeline) lines.push(`${dict.fields.timeline}: ${dict.timelines[data.timeline as keyof typeof dict.timelines] ?? data.timeline}`)
    if (data.message) lines.push('', `${dict.fields.message}:`, data.message)
    return lines.join('\n')
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    if (!data.name) {
      setStatus('error')
      setError(dict.required)
      return
    }

    // Birincil yol: WhatsApp. Numara tanımlıysa hazır mesajla sohbeti aç.
    if (whatsappNumber) {
      const url = waLink(whatsappNumber, buildWaMessage(data))
      window.open(url, '_blank', 'noopener,noreferrer')
      setSuccessText(dict.whatsappSuccess)
      setStatus('success')
      form.reset()
      return
    }

    // Yedek yol: WhatsApp numarası yoksa kaydı CMS'e gönder.
    setStatus('loading')
    if (!data.email) {
      setStatus('error')
      setError(dict.required)
      return
    }
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, status: 'new' }),
      })
      if (!res.ok) throw new Error('request failed')
      setSuccessText(dict.success)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError(dict.error)
    }
  }

  if (status === 'success') {
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30">
          <CheckCircle2 className="size-7 text-accent-soft" />
        </div>
        <p className="text-pretty text-lg font-medium">{successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="glass flex flex-col gap-4 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={dict.fields.name}>
          <input name="name" required className={fieldClass} autoComplete="name" />
        </Field>
        <Field label={dict.fields.email}>
          <input name="email" type="email" required className={fieldClass} autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={dict.fields.projectType}>
          <Select name="projectType" placeholder={dict.placeholderSelect} options={dict.projectTypes} />
        </Field>
        <Field label={dict.fields.budget}>
          <Select name="budget" placeholder={dict.placeholderSelect} options={dict.budgets} />
        </Field>
        <Field label={dict.fields.timeline}>
          <Select name="timeline" placeholder={dict.placeholderSelect} options={dict.timelines} />
        </Field>
      </div>

      <Field label={dict.fields.message}>
        <textarea name="message" rows={4} className={cn(fieldClass, 'resize-none')} />
      </Field>

      {status === 'error' && error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading'}
        className={cn(
          'mt-1 w-full sm:w-auto sm:self-start sm:px-10',
          whatsappNumber && 'from-[#25D366] to-[#1ebe5d]',
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {dict.submitting}
          </>
        ) : whatsappNumber ? (
          <>
            <FaWhatsapp className="size-[1.15rem]" />
            {dict.whatsappCta}
          </>
        ) : (
          <>
            {dict.submit}
            <Send className="size-4 rtl:-scale-x-100" />
          </>
        )}
      </Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  )
}

function Select({
  name,
  placeholder,
  options,
}: {
  name: string
  placeholder: string
  options: Record<string, string>
}) {
  return (
    <div className="relative">
      <select name={name} defaultValue="" className={cn(fieldClass, 'appearance-none pe-9')}>
        <option value="" disabled className="bg-elevated text-muted">
          {placeholder}
        </option>
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value} className="bg-elevated text-foreground">
            {label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
