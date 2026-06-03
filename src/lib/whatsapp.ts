// Varsayılan WhatsApp numarası (CMS'teki SiteSettings.whatsapp veya env ile ezilebilir).
export const DEFAULT_WHATSAPP = '905347986776'

// Numarayı wa.me formatına çevirir: yalnızca rakamlar, baştaki + ve boşluklar atılır.
export function sanitizeWa(number?: string | null): string {
  const raw = (number || DEFAULT_WHATSAPP).toString()
  return raw.replace(/[^\d]/g, '')
}

export function waLink(number?: string | null, text?: string): string {
  const n = sanitizeWa(number)
  const base = `https://wa.me/${n}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
