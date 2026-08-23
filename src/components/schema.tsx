import { business } from "@/lib/content/business";
import { services } from "@/lib/content/services";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * AutoRepair is the closest schema.org type to a detailing studio and is one
 * of the types Google surfaces in local results.
 *
 * Note there is deliberately no `aggregateRating` here. The old site claimed
 * "98% 5-star reviews" with no source behind it; marking that up as
 * structured data would be handing Google a number nobody can back. Once the
 * Google Business Profile is connected we can pull real ratings instead.
 */
export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "@id": `${business.domain}/#studio`,
        name: business.legalName,
        alternateName: business.name,
        description:
          "XPEL-certified paint protection film, GTECHNIQ ceramic coating, window tinting, detailing and vehicle styling in Ras Al Khor, Dubai.",
        url: business.domain,
        telephone: business.phoneRaw,
        email: business.email,
        image: `${business.domain}/opengraph-image`,
        priceRange: "$$$",
        currenciesAccepted: "AED",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${business.address.unit}, ${business.address.district}`,
          addressLocality: business.address.city,
          addressCountry: business.address.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.address.lat,
          longitude: business.address.lng,
        },
        areaServed: [
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Sharjah" },
          { "@type": "City", name: "Abu Dhabi" },
        ],
        sameAs: Object.values(business.social),
        openingHoursSpecification: business.hours
          .filter((entry) => entry.open)
          .map((entry) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${entry.day}`,
            opens: entry.open,
            closes: entry.close,
          })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Car care services",
          itemListElement: services
            .filter((service) => !service.comingSoon)
            .map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name.en,
                description: service.short.en,
              },
            })),
        },
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${business.domain}/service/${slug}`,
        serviceType: name,
        provider: { "@id": `${business.domain}/#studio` },
        areaServed: { "@type": "City", name: "Dubai" },
      }}
    />
  );
}

export function FaqSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${business.domain}${crumb.path}`,
        })),
      }}
    />
  );
}
