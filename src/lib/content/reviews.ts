import type { Translated } from "@/lib/i18n";

/**
 * The studio's Google reviews, supplied by the client on 26 August — 5.0 from
 * 16, with the owner replying to nearly all of them.
 *
 * Two were dropped: "Hameed Khan" appears twice under two accounts with
 * identical text, and one entry is too garbled to read as a testimonial.
 * Fifteen remain, which is plenty for a marquee.
 *
 * Deliberately NOT marked up as Review / aggregateRating JSON-LD. Google's
 * structured data policy says review snippets must not be used for ratings
 * collected from another site, and these came from Google itself. Google
 * already surfaces the 5.0 natively in Maps and the local pack; re-declaring
 * it risks a manual action for no gain.
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
      ar: "أنجزت سيارتي جيتور T2 لدى إكزوتك شاين، ولا يمكن أن أكون أسعد. تركيب الفيلم الواقي مثالي، والعناية نُفّذت بإتقان. اهتم الفريق بكل تفصيل صغير وتعامل مع سيارتي كأنها سيارته.",
    },
  },
  {
    id: "alaa-nazaryan",
    name: "Alaa Nazaryan",
    service: { en: "Nissan Patrol Nismo", ar: "نيسان باترول نيسمو" },
    quote: {
      en: "Absolutely impressed with Exotic Shine and the transformation of my Nissan Patrol Nismo. They brought the vision to life and finished every detail to perfection.",
      ar: "معجب تمامًا بإكزوتك شاين وبالتحول الذي أحدثوه في نيسان باترول نيسمو. حوّلوا الفكرة إلى واقع وأنهوا كل تفصيل بإتقان.",
    },
  },
  {
    id: "arshi-zahoor",
    name: "Arshi Zahoor",
    service: { en: "PPF · Jetour T2", ar: "فيلم واقٍ · جيتور T2" },
    quote: {
      en: "I can't say enough how amazing the service was from Exotic Shine. They went out of their way to add a personal touch to everything from start to finish, and the quality of the work done to my car honestly left me speechless.",
      ar: "لا أستطيع وصف روعة الخدمة في إكزوتك شاين. بذلوا جهدًا إضافيًا لإضافة لمسة شخصية من البداية للنهاية، وجودة العمل على سيارتي تركتني بلا كلمات.",
    },
  },
  {
    id: "hoor-khan",
    name: "Hoor Khan",
    service: { en: "Paint protection film", ar: "فيلم حماية الطلاء" },
    quote: {
      en: "I came to get my PPF done at Exotic Shine and my car looks as good as new. The team is very helpful and have great attention to detail. My car looks really glossy and shiny.",
      ar: "جئت لتركيب الفيلم الواقي في إكزوتك شاين وسيارتي تبدو كالجديدة. الفريق متعاون جدًا واهتمامه بالتفاصيل ممتاز. سيارتي لامعة للغاية.",
    },
  },
  {
    id: "fusion-motors",
    name: "Fusion Motors",
    business: true,
    service: { en: "Full detailing", ar: "عناية كاملة" },
    quote: {
      en: "I booked my car in for a full detailing, and I was honestly blown away by the result. The level of attention to detail was unbelievable. When I saw the car, I genuinely couldn't believe it was mine. It looked better than brand new.",
      ar: "حجزت سيارتي لعناية كاملة، وصُدمت بالنتيجة بصراحة. مستوى الاهتمام بالتفاصيل لا يُصدق. حين رأيت السيارة لم أصدق أنها سيارتي — بدت أفضل من الجديدة.",
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
      ar: "معجب تمامًا بإكزوتك شاين. قمت بعناية كاملة وغسيل لسيارتي، وأزالوا عدة خدوش بسيطة بالتلميع. الفرق كان مذهلًا — بدت السيارة كأنها جديدة تقريبًا.",
    },
  },
  {
    id: "faraz-khan",
    name: "Faraz Khan",
    service: { en: "Interior + exterior detailing", ar: "عناية داخلية وخارجية" },
    quote: {
      en: "Absolutely amazing detailing. The attention to detail was outstanding, and the car came out looking better than I ever expected. Everything was cleaned and finished perfectly, inside and out.",
      ar: "عناية مذهلة تمامًا. الاهتمام بالتفاصيل كان استثنائيًا، وخرجت السيارة أفضل مما توقعت. كل شيء نُظّف وأُنهي بإتقان، داخليًا وخارجيًا.",
    },
  },
  {
    id: "hameed-khan",
    name: "Hameed Khan",
    service: { en: "Full PPF · Jeep", ar: "فيلم واقٍ كامل · جيب" },
    quote: {
      en: "Brilliant PPF job done on my Jeep. The installation was absolutely flawless, with clean edges and an amazing finish.",
      ar: "عمل ممتاز في تركيب الفيلم الواقي على سيارتي جيب. التركيب كان مثاليًا، بحواف نظيفة ولمسة نهائية رائعة.",
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
  {
    id: "bobbit-p",
    name: "Bobbit P",
    service: { en: "Auto detailing", ar: "عناية بالسيارات" },
    quote: {
      en: "I highly recommend this auto detailing company. A special thank you to Miss Anna for her very professional and excellent service.",
      ar: "أنصح بشدة بشركة العناية هذه. شكر خاص للآنسة آنا على خدمتها الاحترافية والممتازة.",
    },
  },
  {
    id: "hammad-saleem",
    name: "Hammad Saleem",
    service: { en: "Paint protection film", ar: "فيلم حماية الطلاء" },
    quote: {
      en: "Got PPF for my car. Looks amazing. It was installed neatly. Looks perfect!",
      ar: "ركّبت الفيلم الواقي لسيارتي. يبدو مذهلًا، والتركيب كان نظيفًا. مثالي!",
    },
  },
  {
    id: "ab-khan",
    name: "Ab Khan",
    service: { en: "Detailing", ar: "عناية" },
    quote: {
      en: "Amazing detailing. Hands down the best I've ever had.",
      ar: "عناية مذهلة. الأفضل التي حصلت عليها على الإطلاق، بلا منازع.",
    },
  },
  {
    id: "samer-ghafoor",
    name: "Samer Ghafoor",
    service: { en: "Detailing", ar: "عناية" },
    quote: {
      en: "Fantastic and spectacular job. Amazing work — first time in the UAE I've been this impressed. My car is smooth and looks brand new. I'll be telling many people to come and see the work first hand.",
      ar: "عمل رائع ومبهر. أول مرة في الإمارات أُعجب إلى هذا الحد. سيارتي أصبحت ناعمة وتبدو جديدة. سأخبر كثيرين ليأتوا ويروا العمل بأنفسهم.",
    },
  },
];
