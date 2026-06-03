import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'featured', 'order'],
    description: 'Portföy çalışmaları / case study\'ler. Sürükle-bırak yerine "order" alanı ile sıralanır.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: { width: '60%' },
        },
        {
          name: 'client',
          type: 'text',
          admin: { width: '40%', description: 'Müşteri / marka adı' },
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL için benzersiz tekil ad (örn: acme-store). Boş bırakılırsa başlıktan üretilir.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value)
            if (data?.title) return slugify(String(data.title))
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'corporate',
      options: [
        { label: 'Tek Sayfa / Landing', value: 'landing' },
        { label: 'Kurumsal', value: 'corporate' },
        { label: 'Portföy', value: 'portfolio' },
        { label: 'E-Ticaret', value: 'ecommerce' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Kapak görseli. Boşsa gradient yer tutucu gösterilir.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: { description: 'Kart üzerinde görünen kısa açıklama.' },
    },
    {
      name: 'resultMetric',
      type: 'text',
      localized: true,
      admin: { description: 'Sonuç odaklı vurgu, örn: "%40 dönüşüm artışı".' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Etiket', plural: 'Etiketler' },
      fields: [{ name: 'label', type: 'text', required: true }],
      admin: { description: 'Kullanılan teknolojiler / hizmet etiketleri.' },
    },
    {
      name: 'projectUrl',
      type: 'text',
      admin: { description: 'Canlı proje linki (opsiyonel).' },
    },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Görsel', plural: 'Galeri' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Öne çıkan projeler önce gösterilir.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', step: 1 },
    },
  ],
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
