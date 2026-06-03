import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import en from './messages/en.json'
import tr from './messages/tr.json'
import ar from './messages/ar.json'

type Dict = typeof en

function homeData(d: Dict) {
  return {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroHighlight: d.hero.highlight,
    heroSubtitle: d.hero.subtitle,
    primaryCtaLabel: d.hero.primaryCta,
    secondaryCtaLabel: d.hero.secondaryCta,
    stats: d.trust.stats.map((s) => ({ value: s.value, label: s.label })),
    processTitle: d.process.title,
    processSubtitle: d.process.subtitle,
    processSteps: d.process.steps.map((s) => ({ title: s.title, description: s.description })),
    aboutTitle: d.about.title,
    aboutBody: d.about.body,
  }
}

async function run() {
  const payload = await getPayload({ config })
  for (const [locale, d] of [['en', en], ['tr', tr], ['ar', ar]] as const) {
    await payload.updateGlobal({
      slug: 'home-content',
      locale,
      data: homeData(d) as never,
      overrideAccess: true,
    })
    payload.logger.info(`home-content set for ${locale}`)
  }
  payload.logger.info('✅ home-content seeded.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
