# Exotic Shine — where things stand

Rebuild of exoticshine.net. Next.js 16, Tailwind v4, content in typed files
(no CMS — the old Strapi Cloud instance is not used).

```bash
npm run dev     # http://localhost:4820
npm run build   # everything prerenders to static HTML
```

## Structure

Three pillars taken from the client's own logo strapline, with all 24 services
divided between them:

| Route | What it is |
| --- | --- |
| `/` | Home — hero, pillars, FAQ, contact |
| `/services` | All 24, grouped by pillar |
| `/protect` `/enhance` `/elevate` | Pillar hubs, each service as an anchored section |
| `/service/<slug>` | Five deep pages: PPF, ceramic coating, tinting, wrapping, respray |
| `/gallery` `/pricing` `/about` `/promotions` `/contact` | Supporting pages |

English is served from the root so URLs Google already indexed keep working.
Arabic lives under `/ar/*`. `src/proxy.ts` rewrites root requests into
`app/[lang]` — note Next 16 renamed `middleware` to `proxy`.

## Keeping the Google rating current

`src/lib/content/google-rating.json` holds the rating and review count shown
on the homepage. A daily job (`.github/workflows/refresh-reviews.yml`) pulls
fresh numbers from the Places API and commits them only when they move, which
triggers the usual deploy.

It stays dormant until two repository secrets exist — Settings → Secrets and
variables → Actions:

| Secret | Notes |
| --- | --- |
| `GOOGLE_PLACES_API_KEY` | Google Cloud project with **Places API (New)** enabled |
| `GOOGLE_PLACE_ID` | Optional; the script finds the place by name without it |

One check a day is roughly 30 requests a month, inside the free tier, though
Google still wants a card on the account. Until then, edit the JSON by hand
and push — that works fine.

**Review text is not automated, on purpose.** The Places API returns at most
five reviews and won't let you pick which. Automating them would replace the
fourteen curated quotes in `reviews.ts` — several from motor trade businesses,
which are the most persuasive thing on the page — with whatever Google ranks
highest that day. Add new ones to `reviews.ts` by hand.

## Still waiting on the client

These are the only things standing between this and launch.

**Before/after photos.** Two photo sets are in place, neither of which is
before/after:

- `src/lib/content/studio.ts` — 17 real photographs of the unit, sent by the
  client on 25 August. Their floor, their signage, their cars, their plates.
  These carry the homepage hero, the studio strip, the about page and the
  contact card.
- `src/lib/content/media.ts` — nine branded marketing images carried over from
  the old site. They cover the service cards, pillar banners and deep pages.
  Note these have the badge burned into a corner and are not documentary.

The before/after pairs are still the thing that sells detailing work, and
they're still outstanding. **The comparison section on `/gallery` is hidden
while none of them have images** — it reappears on its own as soon as one
entry has both a `before` and an `after` path.

Only one service card runs on a real photo so far: paint correction, cut from
the client's clip of a technician polishing a bonnet. The other eight are
still the branded marketing set. To replace them we need one clear shot per
service, taken in the unit.
`src/lib/content/gallery.ts` has six entries waiting: drop files into
`public/gallery/`, fill in `before` and `after`, and the comparison slider
renders itself. Entries without paths show a labelled empty slot on purpose,
so the page states what's missing rather than hiding it.

**Prices.** `src/lib/content/pricing.ts` — every cell is `null`, which renders
as "on request". Fill in numbers to publish. First confirm pricing actually
splits by sedan / SUV / supercar; if it doesn't, collapse `vehicleClasses` to
a single column rather than inventing tiers.

**Logo — source files still wanted.** The site now uses the client's real
artwork, cut from `HALF LOGO.jpg` with the black background alphaed out:

| File | Where it's used |
| --- | --- |
| `public/brand/logo-wordmark.png` | Header — type only, since the car and crown are illegible at 44px |
| `public/brand/logo-lockup.png` | Footer — crown, car and type |
| `public/brand/logo-badge.png` | Source for the icons below |
| `src/app/icon.png`, `apple-icon.png` | Favicon and home-screen icon |
| `src/app/opengraph-image.png` | Social share card |

These are upscaled from a 1600px JPEG, so edges are slightly soft at large
sizes. Ask for the vector original (`.ai`, `.eps` or `.svg`) and regenerate —
swapping the files in `public/brand/` is all that's needed, no code changes.

**GoHighLevel.** Set `GHL_WEBHOOK_URL` in the environment. Until it's set,
`/api/lead` returns 503 and the form tells the visitor to use WhatsApp — a
visible failure beats silently swallowing enquiries. Their GHL plan includes
a booking calendar if they want online booking later.

**Arabic.** Every string has an `ar` translation, written as a first pass and
needing review by a native speaker before launch. Search for `ar:` in
`src/lib/content/`.

**Mobile detailing.** Marked "coming soon" per the client's list, but the old
site sold it as live. Confirm, then flip `comingSoon` in
`src/lib/content/services.ts`.

## Deliberate decisions worth knowing

**No `aggregateRating` in the structured data.** The old site claimed "98%
5-star reviews" with nothing behind it. Marking that up would hand Google a
number nobody can defend. Connect the Google Business Profile and pull real
ratings instead. Same reasoning behind `verified: false` on two of the four
stats in `business.ts` — those render as copy but stay out of the JSON-LD.

**Five deep pages, not twenty-four.** Only services with real search demand in
Dubai get their own page; the rest are sections on a pillar hub. Twenty-four
thin pages would split ranking signals instead of concentrating them.

**Old service URLs are redirected, not dropped.** `next.config.ts` 301s the
five retired `/service/*` slugs to their new sections.

**FAQ uses `<details>`, not a JS accordion.** The answers stay in the DOM and
work without JavaScript, which matters because they're also FAQPage markup.

## What the old site got wrong (and this fixes)

- Zero `<h1>` elements anywhere — headings were styled `<p>`. Every page here
  has exactly one, verified.
- No JSON-LD, no sitemap, no robots.txt. All three now present.
- 11 MB of gallery images served at 6084×3396 and displayed at 323px, bypassing
  the image optimiser. Same nine photos, re-encoded to 1600px WebP, are now
  1.2 MB on disk — and the homepage actually ships 547 KB of images because
  `next/image` serves per-viewport sizes. That's a 20× cut.
- `<title>` was literally "Homepage", and the meta description said "car
  detailing hazards" instead of services.
