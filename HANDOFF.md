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

## Still waiting on the client

These are the only things standing between this and launch.

**Photos.** `src/lib/content/gallery.ts` has six entries with no image paths.
Drop files into `public/gallery/` and fill in `before` and `after` — the
comparison slider renders automatically. Entries without paths show a labelled
empty slot on purpose, so the page tells you what's outstanding rather than
hiding it. Same for the hero slot on `/` and the before/after slot on each
deep service page.

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
  the image optimiser. Everything here goes through `next/image`.
- `<title>` was literally "Homepage", and the meta description said "car
  detailing hazards" instead of services.
