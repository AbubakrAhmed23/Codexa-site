import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

// window.open çağrılarını yakala (form WhatsApp'a böyle yönlendiriyor)
await page.addInitScript(() => {
  window.__opened = []
  window.open = (u) => {
    window.__opened.push(u)
    return null
  }
})

await page.goto(`${BASE}/tr`, { waitUntil: 'networkidle', timeout: 60000 })

// --- 1) Float butonun href'i ---
const waHrefs = await page.$$eval('a[href^="https://wa.me"]', (els) => els.map((e) => e.getAttribute('href')))
console.log('\n=== Sağ alt FLOAT + iletişim listesi wa.me linkleri ===')
for (const h of waHrefs) console.log(decodeURIComponent(h))

// --- 2) Formu doldur ve gönder ---
await page.evaluate(() => document.getElementById('contact')?.scrollIntoView())
await page.waitForTimeout(600)
await page.fill('input[name="name"]', 'Ahmet Yılmaz')
await page.fill('input[name="email"]', 'ahmet@example.com')
await page.selectOption('select[name="projectType"]', 'corporate')
await page.selectOption('select[name="budget"]', 'tier3')
await page.selectOption('select[name="timeline"]', 'month')
await page.fill('textarea[name="message"]', 'Kurumsal bir site istiyorum, 5-6 sayfa.')
await page.screenshot({ path: '/tmp/shot-tr-contact-filled.png' })
await page.click('form button[type="submit"]')
await page.waitForTimeout(500)

const opened = await page.evaluate(() => window.__opened)
console.log('\n=== Form "WhatsApp\'tan Gönder" → açılan URL ===')
for (const u of opened) {
  console.log('RAW:', u)
  console.log('--- çözülmüş mesaj ---')
  const m = u.match(/[?&]text=([^&]+)/)
  if (m) console.log(decodeURIComponent(m[1]))
}

// --- 3) Başarı durumu göründü mü ---
const successVisible = await page.isVisible('text=WhatsApp açılıyor')
console.log('\nForm başarı mesajı göründü:', successVisible)

await browser.close()
