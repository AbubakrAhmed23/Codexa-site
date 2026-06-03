import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import en from './messages/en.json'
import tr from './messages/tr.json'
import ar from './messages/ar.json'

type Loc = 'en' | 'tr' | 'ar'
const OTHERS: Loc[] = ['tr', 'ar']

async function localizedCreate(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  base: Record<string, unknown>,
  byLocale: Partial<Record<Loc, Record<string, unknown>>>,
) {
  const doc = (await payload.create({
    collection: collection as never,
    locale: 'en',
    data: { ...base, ...(byLocale.en ?? {}) } as never,
    overrideAccess: true,
  })) as { id: string | number }
  for (const loc of OTHERS) {
    if (byLocale[loc]) {
      await payload.update({
        collection: collection as never,
        id: doc.id,
        locale: loc,
        data: byLocale[loc] as never,
        overrideAccess: true,
      })
    }
  }
  return doc
}

// --- Projeler (dict'te yok, en önemli seed) -------------------------------
const PROJECTS = [
  {
    base: { client: 'Lumen', category: 'ecommerce', slug: 'lumen-store', featured: true, order: 1, tags: [{ label: 'Next.js' }, { label: 'Stripe' }, { label: 'Tailwind' }] },
    en: { title: 'Lumen — Lighting Store', summary: 'A premium e-commerce experience for a designer lighting brand.', resultMetric: '+38% conversion rate' },
    tr: { title: 'Lumen — Aydınlatma Mağazası', summary: 'Tasarım aydınlatma markası için premium bir e-ticaret deneyimi.', resultMetric: '%38 dönüşüm artışı' },
    ar: { title: 'لومن — متجر إضاءة', summary: 'تجربة تجارة إلكترونية مميّزة لعلامة إضاءة تصميمية.', resultMetric: '+38% معدل التحويل' },
  },
  {
    base: { client: 'Atlas Capital', category: 'corporate', slug: 'atlas-capital', featured: true, order: 2, tags: [{ label: 'Next.js' }, { label: 'CMS' }, { label: 'SEO' }] },
    en: { title: 'Atlas Capital', summary: 'A trustworthy corporate site for an investment firm.', resultMetric: '2.1× more inbound leads' },
    tr: { title: 'Atlas Capital', summary: 'Bir yatırım şirketi için güven veren kurumsal site.', resultMetric: '2,1× daha fazla talep' },
    ar: { title: 'أطلس كابيتال', summary: 'موقع شركة موثوق لشركة استثمار.', resultMetric: 'عملاء محتملون أكثر بـ 2.1×' },
  },
  {
    base: { client: 'Nova Studio', category: 'portfolio', slug: 'nova-studio', order: 3, tags: [{ label: 'React' }, { label: 'Framer Motion' }] },
    en: { title: 'Nova Studio', summary: 'An animated portfolio that turns visitors into clients.', resultMetric: 'Awwwards honorable mention' },
    tr: { title: 'Nova Studio', summary: 'Ziyaretçileri müşteriye dönüştüren animasyonlu bir portföy.', resultMetric: 'Awwwards mansiyon ödülü' },
    ar: { title: 'نوفا ستوديو', summary: 'معرض أعمال متحرّك يحوّل الزوّار إلى عملاء.', resultMetric: 'تنويه مشرّف من Awwwards' },
  },
  {
    base: { client: 'Pulse', category: 'landing', slug: 'pulse-app', order: 4, tags: [{ label: 'Landing' }, { label: 'A/B Test' }] },
    en: { title: 'Pulse — App Launch', summary: 'A high-converting launch page for a fitness app.', resultMetric: '12k signups in week one' },
    tr: { title: 'Pulse — Uygulama Lansmanı', summary: 'Bir fitness uygulaması için yüksek dönüşümlü lansman sayfası.', resultMetric: 'İlk hafta 12k kayıt' },
    ar: { title: 'بالس — إطلاق تطبيق', summary: 'صفحة إطلاق عالية التحويل لتطبيق لياقة.', resultMetric: '12 ألف تسجيل في الأسبوع الأول' },
  },
]

const TESTIMONIALS = [
  {
    base: { author: 'Elif Demir', company: 'Lumen', rating: 5, order: 1 },
    en: { quote: 'Codexa delivered a store that feels truly premium. Sales jumped almost immediately.', role: 'Founder' },
    tr: { quote: 'Codexa gerçekten premium hissettiren bir mağaza teslim etti. Satışlar neredeyse anında arttı.', role: 'Kurucu' },
    ar: { quote: 'سلّمت Codexa متجرًا يبدو مميّزًا حقًّا. ارتفعت المبيعات على الفور تقريبًا.', role: 'مؤسِّسة' },
  },
  {
    base: { author: 'Mark Reynolds', company: 'Atlas Capital', rating: 5, order: 2 },
    en: { quote: 'Professional, fast and detail-obsessed. Our new site finally matches our brand.', role: 'Managing Partner' },
    tr: { quote: 'Profesyonel, hızlı ve detaya takıntılı. Yeni sitemiz nihayet markamızla uyumlu.', role: 'Yönetici Ortak' },
    ar: { quote: 'محترف وسريع ومهووس بالتفاصيل. موقعنا الجديد أصبح أخيرًا يليق بعلامتنا.', role: 'شريك إداري' },
  },
  {
    base: { author: 'Sara Khalil', company: 'Nova', rating: 5, order: 3 },
    en: { quote: 'Working with Codexa was effortless. One partner, zero headaches, a stunning result.', role: 'Creative Director' },
    tr: { quote: 'Codexa ile çalışmak çok kolaydı. Tek muhatap, sıfır baş ağrısı, harika bir sonuç.', role: 'Kreatif Direktör' },
    ar: { quote: 'كان العمل مع Codexa سلسًا. شريك واحد، دون أي متاعب، ونتيجة مذهلة.', role: 'مديرة إبداعية' },
  },
]

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'projects', overrideAccess: true })
  if (existing.totalDocs > 0) {
    payload.logger.info('Seed: data already present, skipping. (Sil ve tekrar çalıştır: dashboard üzerinden.)')
    process.exit(0)
  }

  payload.logger.info('Seeding content…')

  // Services (dict içeriğini yeniden kullan)
  for (let i = 0; i < en.services.items.length; i++) {
    await localizedCreate(
      payload,
      'services',
      { icon: en.services.items[i].icon, order: i + 1 },
      {
        en: { title: en.services.items[i].title, description: en.services.items[i].description },
        tr: { title: tr.services.items[i].title, description: tr.services.items[i].description },
        ar: { title: ar.services.items[i].title, description: ar.services.items[i].description },
      },
    )
  }

  // Pricing (dict içeriğini yeniden kullan)
  for (let i = 0; i < en.pricing.plans.length; i++) {
    const e = en.pricing.plans[i] as { name: string; tagline: string; price: string; period: string; features: string[]; highlighted?: boolean }
    const t = tr.pricing.plans[i] as typeof e
    const a = ar.pricing.plans[i] as typeof e
    await localizedCreate(
      payload,
      'pricing-plans',
      { price: e.price, highlighted: Boolean(e.highlighted), order: i + 1 },
      {
        en: { name: e.name, tagline: e.tagline, period: e.period, features: e.features.map((label) => ({ label })) },
        tr: { name: t.name, tagline: t.tagline, period: t.period, features: t.features.map((label) => ({ label })) },
        ar: { name: a.name, tagline: a.tagline, period: a.period, features: a.features.map((label) => ({ label })) },
      },
    )
  }

  // FAQ (dict içeriğini yeniden kullan)
  for (let i = 0; i < en.faq.items.length; i++) {
    await localizedCreate(
      payload,
      'faq',
      { order: i + 1 },
      {
        en: { question: en.faq.items[i].question, answer: en.faq.items[i].answer },
        tr: { question: tr.faq.items[i].question, answer: tr.faq.items[i].answer },
        ar: { question: ar.faq.items[i].question, answer: ar.faq.items[i].answer },
      },
    )
  }

  // Projeler
  for (const p of PROJECTS) {
    await localizedCreate(payload, 'projects', p.base, { en: p.en, tr: p.tr, ar: p.ar })
  }

  // Yorumlar
  for (const t of TESTIMONIALS) {
    await localizedCreate(payload, 'testimonials', t.base, { en: t.en, tr: t.tr, ar: t.ar })
  }

  // Site ayarları (global)
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    overrideAccess: true,
    data: {
      brandName: 'Codexa',
      tagline: en.footer.tagline,
      email: 'hello@codexa.studio',
      socials: [
        { platform: 'github', url: 'https://github.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'x', url: 'https://x.com' },
      ],
    } as never,
  })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'tr', overrideAccess: true, data: { tagline: tr.footer.tagline } as never })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'ar', overrideAccess: true, data: { tagline: ar.footer.tagline } as never })

  // Ana sayfa istatistikleri (global)
  await payload.updateGlobal({
    slug: 'home-content',
    locale: 'en',
    overrideAccess: true,
    data: { stats: en.trust.stats.map((s) => ({ value: s.value, label: s.label })) } as never,
  })
  await payload.updateGlobal({ slug: 'home-content', locale: 'tr', overrideAccess: true, data: { stats: tr.trust.stats.map((s) => ({ value: s.value, label: s.label })) } as never })
  await payload.updateGlobal({ slug: 'home-content', locale: 'ar', overrideAccess: true, data: { stats: ar.trust.stats.map((s) => ({ value: s.value, label: s.label })) } as never })

  payload.logger.info('✅ Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
