import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: {
    description: 'Marka, logo, iletişim ve sosyal bağlantılar.',
    group: 'Ayarlar',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marka',
          fields: [
            { name: 'brandName', type: 'text', defaultValue: 'Codexa' },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: { description: 'Logo altında / SEO için kısa slogan.' },
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'İletişim',
          fields: [
            { name: 'email', type: 'email' },
            { name: 'phone', type: 'text' },
            {
              name: 'whatsapp',
              type: 'text',
              admin: { description: 'WhatsApp numarası (ülke koduyla, örn: 905347986776). Form ve sağ alttaki buton buraya yönlendirir.' },
            },
            { name: 'location', type: 'text', localized: true },
            {
              name: 'calendarUrl',
              type: 'text',
              admin: { description: 'Calendly / randevu linki (opsiyonel).' },
            },
          ],
        },
        {
          label: 'Sosyal',
          fields: [
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Bağlantı', plural: 'Bağlantılar' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    'github', 'linkedin', 'x', 'instagram',
                    'dribbble', 'behance', 'youtube', 'whatsapp',
                  ].map((v) => ({ label: v, value: v })),
                  required: true,
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', localized: true },
            { name: 'metaDescription', type: 'textarea', localized: true },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Sosyal paylaşım önizleme görseli (1200x630).' },
            },
          ],
        },
      ],
    },
  ],
}
