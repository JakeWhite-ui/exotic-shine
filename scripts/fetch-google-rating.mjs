/**
 * Refreshes the studio's Google rating and review count.
 *
 * Only those two numbers — not the review text. The Places API returns at
 * most five reviews and gives no control over which five, so automating the
 * quotes would replace fourteen hand-picked ones (several from motor trade
 * businesses, which are the most persuasive) with whatever Google considers
 * "most relevant" today. The numbers are the part that goes stale; the words
 * aren't.
 *
 * Writes src/lib/content/google-rating.json. If nothing changed the file is
 * left alone, so the scheduled job produces no commit and no deploy.
 *
 * Env:
 *   GOOGLE_PLACES_API_KEY  required
 *   GOOGLE_PLACE_ID        optional — looked up from the business name if unset
 */
import { readFile, writeFile } from "node:fs/promises";

const OUT = "src/lib/content/google-rating.json";
const SEARCH_QUERY = "Exotic Shine Motor Services, Ras Al Khor, Dubai";

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error("GOOGLE_PLACES_API_KEY is not set — nothing to do.");
  process.exit(0);
}

async function findPlaceId() {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY }),
  });

  if (!res.ok) throw new Error(`text search failed: ${res.status} ${await res.text()}`);

  const { places } = await res.json();
  if (!places?.length) throw new Error("text search returned no places");

  console.log(
    `resolved "${places[0].displayName?.text}" — ${places[0].formattedAddress}`,
  );
  return places[0].id;
}

async function fetchRating(placeId) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount",
    },
  });

  if (!res.ok) throw new Error(`place details failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId());
const { rating, userRatingCount } = await fetchRating(placeId);

if (typeof rating !== "number" || typeof userRatingCount !== "number") {
  throw new Error(`unexpected response: ${JSON.stringify({ rating, userRatingCount })}`);
}

// A rating that suddenly reads 0, or a count that collapses, is far more
// likely to be an API hiccup than reality — and it would publish straight to
// a live site. Refuse rather than overwrite good data with nonsense.
const previous = JSON.parse(await readFile(OUT, "utf8"));
if (userRatingCount < previous.reviewCount) {
  console.error(
    `refusing update: count fell from ${previous.reviewCount} to ${userRatingCount}`,
  );
  process.exit(1);
}

if (rating === previous.rating && userRatingCount === previous.reviewCount) {
  console.log(`unchanged — ${rating} from ${userRatingCount} reviews`);
  process.exit(0);
}

await writeFile(
  OUT,
  `${JSON.stringify({ rating, reviewCount: userRatingCount, placeId, updated: new Date().toISOString().slice(0, 10) }, null, 2)}\n`,
);

console.log(
  `updated: ${previous.rating}/${previous.reviewCount} -> ${rating}/${userRatingCount}`,
);
