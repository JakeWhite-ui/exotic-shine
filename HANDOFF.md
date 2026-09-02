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
| `/` | Home — video hero, pillars, clip strip, FAQ, contact |
| `/services` | All 24, grouped by pillar |
| `/protect` `/enhance` `/elevate` | Pillar hubs, each service as an anchored section |
| `/service/<slug>` | Five deep pages: PPF, ceramic coating, tinting, wrapping, respray |
| `/gallery` `/pricing` `/about` `/promotions` `/contact` | Supporting pages |

English is served from the root so URLs Google already indexed keep working.
Arabic lives under `/ar/*`. There's no server to rewrite with, so
`scripts/flatten-export.mjs` lifts `out/en/*` to the root after the build.

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

**Before/after photos.** Three media sets are in place, none of which is
before/after:

- `src/lib/content/clips.ts` — nine clips cut from thirteen videos the client
  sent on 1 September, after flagging that the service cards were renders.
  These carry the homepage hero, the four-clip strip below it, and the reel
  wall that `/gallery` now leads on.
- `src/lib/content/media.ts` — nine service stills, every one a frame pulled
  out of those same videos.
- `src/lib/content/studio.ts` — 17 photographs of the unit, sent 25 August.
  Their floor, their signage, their plates. These carry `/about`, the contact
  card and the homepage studio strip. Nobody is working in any of them, which
  is why the hero moved to video.

The before/after pairs are still the thing that sells detailing work, and
they're still outstanding. **The comparison section on `/gallery` is hidden
while none of them have images** — it reappears on its own as soon as one
entry has both a `before` and an `after` path.
`src/lib/content/gallery.ts` has six entries waiting: drop files into
`public/gallery/`, fill in `before` and `after`, and the comparison slider
renders itself.

Two smaller gaps in the footage, both worth one WhatsApp message:

- **Window tinting.** Nothing in the thirteen videos shows film going onto
  glass. That card is a finished car with the tint visible instead — honest,
  but weaker than every card around it.
- **Accessories.** Nothing usable for roof racks, body kits, off-road gear or
  lighting, so `off-road-accessories` and `mobile-detailing` now have no image
  at all rather than a fake one. The only roof-box clip arrived through
  WhatsApp at 576px wide, softer than the cards render at.

## Rebuilding the video and the stills

The camera masters live in `media-source/`, which is gitignored — 256 MB of
4K and 1080p MOV that can't be regenerated from the repo, so keep a backup.

```bash
npm run media            # re-cut clips and stills into public/
npm run media -- --force # also re-encode clips that already exist
```

Every window, crop and timestamp is a named constant at the top of
`scripts/build-media.py` with a note on why it's where it is. Needs `ffmpeg`
and `cwebp` (`brew install ffmpeg webp`).

One thing that will bite: **every master is portrait**, including the 4K one,
which reports 3840×2160 but carries a 90° rotation flag. Check what ffmpeg
actually hands the filter graph before choosing a crop.

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

**GoHighLevel.** Set `NEXT_PUBLIC_GHL_WEBHOOK_URL`. The site is a static export
with no server, so `LeadForm` posts to the webhook straight from the browser;
until the variable is set the form tells the visitor to use WhatsApp instead —
a visible failure beats silently swallowing enquiries. Every enquiry now
arrives with a `service` field, because the quote links preselect it. Their GHL
plan includes a booking calendar if they want online booking later.

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

**Old service URLs are redirected, not dropped.** GitHub Pages can't do 301s,
so `scripts/flatten-export.mjs` writes meta-refresh stubs for the retired
`/service/*` slugs pointing at their new sections.

**FAQ uses `<details>`, not a JS accordion.** The answers stay in the DOM and
work without JavaScript, which matters because they're also FAQPage markup.

**The reel wall is self-hosted, not an Instagram embed.** The reference the
client sent (thevelondubai.com) runs its work gallery off an embedded IG feed.
That would have meant Meta's script, Meta's tracking and a grid that empties
itself the day an access token expires. Nine MP4s on our own origin cost 8.5 MB
on disk and almost nothing on load: `src/components/clip.tsx` holds `src` back
until a clip is a screen away, pauses anything scrolled past, and shows the
poster and a play button to anyone who asked their OS for reduced motion.

**Every service carries its own quote link.** `quoteHref()` in `services.ts`
builds `/contact/?service=<slug>`; `LeadForm` reads the slug back off
`window.location` and preselects it. Deliberately not `useSearchParams`, which
prerenders empty on a static export and drags in a Suspense boundary. An
unknown slug leaves the picker on its placeholder, so a stale link still works.

## What the old site got wrong (and this fixes)

- Zero `<h1>` elements anywhere — headings were styled `<p>`. Every page here
  has exactly one, verified.
- No JSON-LD, no sitemap, no robots.txt. All three now present.
- 11 MB of gallery images served at 6084×3396 and displayed at 323px, bypassing
  the image optimiser. Nothing here is served above 1600px: `public/work` is
  1.7 MB for nine service stills across the whole width ladder, and a phone
  gets the 640px file (17 KB for paint correction, against 38 KB full size).
  The single heaviest asset on the homepage is now the 546 KB hero clip; every
  other clip stays unrequested until it's a screen away.
- `<title>` was literally "Homepage", and the meta description said "car
  detailing hazards" instead of services.
