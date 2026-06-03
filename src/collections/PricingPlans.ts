import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  labels: { singular: 'Pricing Plan', plural: 'Pricing Plans' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'highlighted', 'order'],
    description: 'Fiyatlandırma paketleri. Fiyatı buradan istediğin zaman değiştirebilirsin.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Paket adı, örn: Başlangıç / Profesyonel / Kurumsal' },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: { description: 'Paketin kime uygun olduğunu anlatan kısa cümle.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'örn: "₺15.000" veya "$1,200" — istediğin biçimde.' },
        },
        {
          name: 'period',
          type: 'text',
          localized: true,
          admin: { width: '50%', description: 'örn: "/ proje", "/ ay" (opsiyonel)' },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Özellik', plural: 'Özellikler' },
      localized: true,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Buton metni, örn: "Hemen Başla" (boşsa varsayılan kullanılır).' },
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: '"Önerilen" rozeti ekler ve paketi vurgular.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', step: 1 },
    },
  ],
}
