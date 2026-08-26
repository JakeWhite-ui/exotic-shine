import type { Translated } from "@/lib/i18n";

/**
 * Real reviews from the studio's Google Business Profile (5.0 from 16, owner
 * replies to each one). These replaced the four that were on the old site —
 * those named different people entirely and appear on no public profile, so
 * they were almost certainly written to fill the page.
 *
 * Deliberately NOT marked up as Review / aggregateRating JSON-LD. Google's
 * structured data policy says review snippets must not be used for reviews
 * gathered from another site, and these came from Google itself. Google
 * already surfaces the 5.0 natively in Maps and the local pack; re-declaring
 * it here risks a manual action for no gain. Displaying them with clear
 * attribution and a link to the profile is the safe, honest version.
 */
export type Review = {
  id: string;
  quote: Translated;
  name: string;
  /** Several reviewers are motor trade businesses, which is worth showing. */
  business?: boolean;
  service: Translated;
};

export const reviews: Review[] = [
  {
    id: "kenya-burki",
    name: "Kenya & Burki Motors",
    business: true,
    service: { en: "PPF + detailing · Jetour T2", ar: "فيلم واقٍ وعناية · جيتور T2" },
    quote: {
      en: "Just had my Jetour T2 done at Exotic Shine, and I couldn't be happier. The PPF installation is absolutely flawless, and the detailing was done to perfection. The team paid attention to every little detail and treated my car like it was their own.",
      ar: "أنجزت للتو سيارتي جيتور T2 لدى إكزوتك شاين، ولا يمكن أن أكون أسعد. تركيب الفيلم الواقي مثالي تمامًا، والعناية نُفّذت بإتقان. اهتم الفريق بكل تفصيل صغير وتعامل مع سيارتي كأنها سيارته.",
    },
  },
  {
    id: "fusion-star",
    name: "Fusion Star Diesel Fuel Trading",
    business: true,
    service: { en: "PPF + full detailing package", ar: "فيلم واقٍ وباقة عناية كاملة" },
    quote: {
      en: "I don't usually leave reviews, but Exotic Shine Motor Services genuinely deserves one. I had PPF and a full detailing package done, and I'm extremely happy with the results.",
      ar: "لا أكتب التقييمات عادةً، لكن إكزوتك شاين تستحق ذلك فعلًا. أنجزت لديهم فيلمًا واقيًا وباقة عناية كاملة، وأنا سعيد جدًا بالنتيجة.",
    },
  },
  {
    id: "abid-khan",
    name: "Abid Khan",
    service: {
      en: "Detailing, wash + scratch removal",
      ar: "عناية وغسيل وإزالة خدوش",
    },
    quote: {
      en: "Absolutely impressed with Exotic Shine Motor Services. I got my car detailed and washed, and they also removed several minor scratches through polishing. The difference was incredible — the car looked almost brand new again.",
      ar: "أنا معجب تمامًا بإكزوتك شاين. قمت بعناية كاملة وغسيل لسيارتي، وأزالوا أيضًا عدة خدوش بسيطة بالتلميع. الفرق كان مذهلًا — بدت السيارة كأنها جديدة تقريبًا.",
    },
  },
  {
    id: "hameed-khan",
    name: "Hameed Khan",
    service: { en: "Full PPF · Jeep", ar: "فيلم واقٍ كامل · جيب" },
    quote: {
      en: "Brilliant PPF job done on my Jeep. The installation was absolutely flawless, with clean edges and an amazing finish.",
      ar: "عمل ممتاز في تركيب الفيلم الواقي على سيارتي جيب. التركيب كان مثاليًا تمامًا، بحواف نظيفة ولمسة نهائية رائعة.",
    },
  },
  {
    id: "wheel-house",
    name: "Wheel House Motors",
    business: true,
    service: { en: "Detailing + premium wash", ar: "عناية وغسيل مميز" },
    quote: {
      en: "Tried Exotic Shine for a detailing and premium car wash, and I couldn't be happier. The car came back looking spotless inside and out, with amazing attention to detail.",
      ar: "جربت إكزوتك شاين للعناية والغسيل المميز، ولا يمكن أن أكون أسعد. عادت السيارة نظيفة تمامًا من الداخل والخارج، مع اهتمام مذهل بالتفاصيل.",
    },
  },
];
