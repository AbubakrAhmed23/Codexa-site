import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:3001'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

async function autoScroll() {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const step = 400
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        y += step
        if (y >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 120)
    })
  })
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
}

// /tr — scroll ederek tüm reveal'leri tetikle, sonra tam sayfa
await page.goto(`${BASE}/tr`, { waitUntil: 'networkidle', timeout: 60000 })
await autoScroll()
await page.screenshot({ path: '/tmp/shot-tr-full.png', fullPage: true })
console.log('saved shot-tr-full.png')

// Bölüm yakın çekimleri
for (const id of ['services', 'work', 'pricing', 'contact']) {
  await page.goto(`${BASE}/tr#${id}`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(300)
  await page.evaluate((i) => document.getElementById(i)?.scrollIntoView(), id)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `/tmp/shot-tr-${id}.png` })
  console.log('saved', `shot-tr-${id}.png`)
}

await browser.close()
