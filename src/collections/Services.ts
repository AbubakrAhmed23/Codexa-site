import type { CollectionConfig } from 'payload'

// Lucide ikon adları — frontend bu stringi karşılayan ikona çevirir.
const ICON_OPTIONS = [
  'layout', 'layers', 'shopping-cart', 'briefcase', 'code', 'palette',
  'rocket', 'gauge', 'search', 'smartphone', 'pen-tool', 'sparkles',
] as const

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    description: 'Sunduğun hizmetler. 3 dilde başlık/açıklama girilebilir.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'sparkles',
      options: ICON_OPTIONS.map((v) => ({ label: v, value: v })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', step: 1 },
    },
  ],
}
