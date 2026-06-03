# Codexa

Premium, dark-themed, **trilingual (EN / TR / AR with RTL)**, conversion-focused web‑agency site
with a built‑in **admin dashboard**. Built with Next.js 16, React 19, Tailwind v4, Framer Motion
and **Payload CMS 3**.

## Features

- 🎨 Premium dark UI (Linear/Vercel-style) with indigo accent, glow & grain
- 🌍 3 languages — English, Türkçe, العربية (full **RTL** for Arabic)
- 🧩 Sections: Hero, Trust bar, Services, Process, Portfolio, Pricing, About, Testimonials, FAQ, Contact
- 💬 Contact form + floating button wired to **WhatsApp** (pre-filled message)
- 🛠️ `/admin` dashboard (Payload CMS) — manage projects, pricing, images & content in all 3 languages
- ⚡ SEO ready: per-locale metadata, hreflang, sitemap, robots

## Local development

```bash
npm install
cp .env.example .env        # then fill the values below
npm run dev                 # http://localhost:3000
```

The site renders with sensible **fallback content** even before you add a database or any CMS
content, so you can preview immediately. The WhatsApp contact works without a database.

To enable the `/admin` dashboard and editable content, set `DATABASE_URL` to a Postgres
connection (e.g. a free [Neon](https://neon.tech) database), then:

```bash
npm run dev          # open /admin to create the first admin user
npm run seed         # (optional) load sample projects/testimonials in all 3 languages
```

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `PAYLOAD_SECRET` | ✅ | Secret key for Payload (any long random string). |
| `DATABASE_URL` | for `/admin` | Postgres connection string (Neon/Vercel Postgres). Without it the site uses fallback content. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | – | WhatsApp number with country code, no `+` (e.g. `905347986776`). |
| `NEXT_PUBLIC_SERVER_URL` | – | Public site URL (used for SEO/OG and absolute links). |
| `BLOB_READ_WRITE_TOKEN` | for uploads on Vercel | Vercel Blob token for image storage. |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | – | Email notification for CMS-stored leads. |

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com) (framework auto-detected as Next.js).
3. Add the environment variables above (at minimum `PAYLOAD_SECRET`).
4. Deploy. Add `DATABASE_URL` (Vercel Postgres / Neon) and `BLOB_READ_WRITE_TOKEN` later to
   enable the dashboard and image uploads.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Payload CMS 3 (`@payloadcms/db-postgres`) · custom lightweight i18n.
