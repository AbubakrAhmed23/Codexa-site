import type { CollectionConfig } from 'payload'

// İletişim/brief formu gönderileri. Herkes oluşturabilir (form), sadece giriş yapan yönetici okuyabilir.
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'projectType', 'budget', 'createdAt'],
    description: 'Siteden gelen proje talepleri (brief formu).',
    group: 'Gelen Kutusu',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        // RESEND_API_KEY + LEAD_NOTIFY_EMAIL tanımlıysa e-posta bildirimi gönder.
        const apiKey = process.env.RESEND_API_KEY
        const to = process.env.LEAD_NOTIFY_EMAIL
        if (!apiKey || !to) return
        try {
          const { Resend } = await import('resend')
          const resend = new Resend(apiKey)
          const from = process.env.LEAD_FROM_EMAIL || 'Codexa <onboarding@resend.dev>'
          const rows = (['name', 'email', 'projectType', 'budget', 'timeline', 'message', 'locale'] as const)
            .filter((k) => doc[k])
            .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td>${String(doc[k])}</td></tr>`)
            .join('')
          await resend.emails.send({
            from,
            to,
            subject: `🚀 Yeni proje talebi — ${doc.name}`,
            html: `<h2>Yeni lead</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
          })
        } catch (err) {
          console.error('[leads] email notification failed', err)
        }
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'projectType',
          type: 'select',
          admin: { width: '34%' },
          options: [
            { label: 'Tek Sayfa / Landing', value: 'landing' },
            { label: 'Kurumsal Site', value: 'corporate' },
            { label: 'Portföy', value: 'portfolio' },
            { label: 'E-Ticaret', value: 'ecommerce' },
            { label: 'Diğer', value: 'other' },
          ],
        },
        {
          name: 'budget',
          type: 'select',
          admin: { width: '33%' },
          options: [
            { label: '< ₺15k', value: 'tier1' },
            { label: '₺15k – ₺40k', value: 'tier2' },
            { label: '₺40k – ₺100k', value: 'tier3' },
            { label: '₺100k+', value: 'tier4' },
          ],
        },
        {
          name: 'timeline',
          type: 'select',
          admin: { width: '33%' },
          options: [
            { label: 'Acil (< 2 hafta)', value: 'urgent' },
            { label: '1 ay içinde', value: 'month' },
            { label: '1-3 ay', value: 'quarter' },
            { label: 'Esnek', value: 'flexible' },
          ],
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'locale',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'Formun gönderildiği dil.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Yeni', value: 'new' },
        { label: 'İletişime geçildi', value: 'contacted' },
        { label: 'Kazanıldı', value: 'won' },
        { label: 'Kaybedildi', value: 'lost' },
      ],
    },
  ],
}
