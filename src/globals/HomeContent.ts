import type { GlobalConfig } from 'payload'

export const HomeContent: GlobalConfig = {
  slug: 'home-content',
  label: 'Ana Sayfa İçeriği',
  admin: {
    description: 'Hero, istatistikler, süreç adımları ve Hakkımda bölümü metinleri.',
    group: 'İçerik',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              localized: true,
              admin: { description: 'Başlığın üstündeki küçük etiket, örn: "Dijital Ajans".' },
            },
            { name: 'heroTitle', type: 'textarea', localized: true, required: true },
            {
              name: 'heroHighlight',
              type: 'text',
              localized: true,
              admin: { description: 'Başlık içinde vurgulanacak (renkli) kelime/öbek.' },
            },
            { name: 'heroSubtitle', type: 'textarea', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'primaryCtaLabel', type: 'text', localized: true, admin: { width: '50%' } },
                { name: 'secondaryCtaLabel', type: 'text', localized: true, admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'İstatistikler',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'İstatistik', plural: 'İstatistikler' },
              admin: { description: 'Güven şeridi sayaçları, örn: "20+ proje".' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '40%' } },
                    { name: 'label', type: 'text', localized: true, required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            {
              name: 'clientLogos',
              type: 'array',
              labels: { singular: 'Logo', plural: 'Müşteri Logoları' },
              fields: [{ name: 'logo', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Süreç',
          fields: [
            { name: 'processTitle', type: 'text', localized: true },
            { name: 'processSubtitle', type: 'textarea', localized: true },
            {
              name: 'processSteps',
              type: 'array',
              labels: { singular: 'Adım', plural: 'Adımlar' },
              admin: { description: 'Nasıl çalıştığını anlatan adımlar (Keşif → Tasarım → ...).' },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Hakkımda',
          fields: [
            { name: 'aboutTitle', type: 'text', localized: true },
            { name: 'aboutBody', type: 'textarea', localized: true },
            { name: 'aboutPhoto', type: 'upload', relationTo: 'media' },
            {
              name: 'skills',
              type: 'array',
              labels: { singular: 'Yetenek', plural: 'Yetenekler' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
