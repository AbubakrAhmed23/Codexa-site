import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import en from './messages/en.json'
import tr from './messages/tr.json'
import ar from './messages/ar.json'

type Dict = typeof en

// Dile özel OLMAYAN (ama alt alanları localized olan) hero metinleri.
function heroData(d: Dict) {
  return {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroHighlight: d.hero.highlight,
    heroSubtitle: d.hero.subtitle,
    primaryCtaLabel: d.hero.primaryCta,
    secondaryCtaLabel: d.hero.secondaryCta,
    processTitle: d.process.title,
    processSubtitle: d.process.subtitle,
    aboutTitle: d.about.title,
    aboutBody: d.about.body,
  }
}

async function run() {
  const payload = await getPayload({ config })

  // 1) EN: tüm içeriği yaz — processSteps/stats dizilerinin satırları burada oluşur.
  await payload.updateGlobal({
    slug: 'home-content',
    locale: 'en',
    overrideAccess: true,
    data: {
      ...heroData(en),
      processSteps: en.process.steps.map((s) => ({ title: s.title, description: s.description })),
      stats: en.trust.stats.map((s) => ({ value: s.value, label: s.label })),
    } as never,
  })

  // 2) Oluşan satır ID'lerini al (diziler localized DEĞİL; satırlar diller arası ortak).
  const doc = (await payload.findGlobal({ slug: 'home-content', locale: 'en', overrideAccess: true })) as {
    processSteps?: { id?: string }[]
    stats?: { id?: string }[]
  }
  const stepIds = (doc.processSteps ?? []).map((s) => s.id)
  const statIds = (doc.stats ?? []).map((s) => s.id)

  // 3) TR ve AR: AYNI satır ID'leriyle güncelle ki localized değerler doğru satıra otursun.
  for (const [locale, d] of [['tr', tr], ['ar', ar]] as const) {
    await payload.updateGlobal({
      slug: 'home-content',
      locale,
      overrideAccess: true,
      data: {
        ...heroData(d),
        processSteps: d.process.steps.map((s, i) => ({
          id: stepIds[i],
          title: s.title,
          description: s.description,
        })),
        stats: d.trust.stats.map((s, i) => ({ id: statIds[i], value: s.value, label: s.label })),
      } as never,
    })
    payload.logger.info(`home-content updated for ${locale}`)
  }

  payload.logger.info('✅ home-content seeded (steps & stats aligned across locales).')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
