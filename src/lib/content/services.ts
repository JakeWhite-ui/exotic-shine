import type { Translated } from "@/lib/i18n";

export type PillarId = "protect" | "enhance" | "elevate";

export type Service = {
  slug: string;
  pillar: PillarId;
  name: Translated;
  short: Translated;
  /** Services with enough search demand to earn their own page. */
  deep?: boolean;
  comingSoon?: boolean;
};

export type Pillar = {
  id: PillarId;
  name: Translated;
  lede: Translated;
  intro: Translated;
};

/**
 * The three pillars come straight off the client's own logo — the strapline
 * reads "Protect | Enhance | Elevate". Twenty-four services divide across them
 * with nothing left over, so the navigation matches the brand rather than
 * fighting it.
 */
export const pillars: Pillar[] = [
  {
    id: "protect",
    name: { en: "Protect", ar: "الحماية" },
    lede: {
      en: "Shield the paint before the road gets to it",
      ar: "احمِ الطلاء قبل أن يصل إليه الطريق",
    },
    intro: {
      en: "Dubai is hard on cars. Sand blasts the front end on Sheikh Zayed Road, summer sun bakes the clear coat, and construction dust settles into everything. These services put a barrier between your paint and all of it — applied properly, sealed at the edges, and backed by warranty.",
      ar: "دبي قاسية على السيارات. الرمال تضرب المقدمة على شارع الشيخ زايد، وشمس الصيف تحرق الطبقة الشفافة، وغبار الإنشاءات يتسلل إلى كل شيء. هذه الخدمات تضع حاجزًا بين طلاء سيارتك وكل ذلك — بتركيب دقيق وحواف محكمة وضمان موثّق.",
    },
  },
  {
    id: "enhance",
    name: { en: "Enhance", ar: "التجديد" },
    lede: {
      en: "Bring back what time and traffic took",
      ar: "استعد ما أخذه الزمن والطريق",
    },
    intro: {
      en: "Swirl marks from the wrong wash. A kerbed bumper. Headlights gone cloudy after three summers. Everything in this group is corrective work — we remove the damage rather than cover it, so the finish underneath is genuinely restored.",
      ar: "خدوش دائرية من غسيل خاطئ، صدام اصطدم بالرصيف، مصابيح أصبحت ضبابية بعد ثلاثة صيفيات. كل ما في هذه المجموعة عمل إصلاحي — نزيل الضرر بدل أن نخفيه، ليعود اللمعان الأصلي حقًا.",
    },
  },
  {
    id: "elevate",
    name: { en: "Elevate", ar: "التطوير" },
    lede: {
      en: "Make it unmistakably yours",
      ar: "اجعلها لك بلا التباس",
    },
    intro: {
      en: "Colour changes, body kits, roof racks, lighting, off-road kit. Reversible where it should be, permanent where you want it, and always fitted so nothing rattles, nothing leaks, and no factory warranty gets voided.",
      ar: "تغيير اللون، أطقم الهيكل، حمّالات السقف، الإضاءة، تجهيزات الطرق الوعرة. قابلة للإزالة حيث يجب، ودائمة حيث ترغب، ومركّبة دائمًا بحيث لا يصدر صوت ولا يحدث تسرب ولا يسقط ضمان الوكالة.",
    },
  },
];

export const services: Service[] = [
  {
    slug: "paint-protection-film",
    pillar: "protect",
    deep: true,
    name: { en: "Paint Protection Film (PPF)", ar: "فيلم حماية الطلاء" },
    short: {
      en: "Self-healing film that takes the stone chips so your paint doesn't. Computer-cut to your model, wrapped around the edges, invisible when it's done right.",
      ar: "فيلم ذاتي الالتئام يتلقى ضربات الحصى بدل طلاء سيارتك. يُقص بالحاسوب حسب طرازك، ويُلف حول الحواف، ولا يُرى إذا رُكّب بإتقان.",
    },
  },
  {
    slug: "ceramic-coating",
    pillar: "protect",
    deep: true,
    name: { en: "Ceramic Coating", ar: "الطلاء السيراميكي" },
    short: {
      en: "A hard nano-ceramic layer bonded to the clear coat. Water sheets off, dust stops clinging, and washing takes half the time it used to.",
      ar: "طبقة سيراميك نانوية صلبة ترتبط بالطبقة الشفافة. الماء ينزلق، والغبار يتوقف عن الالتصاق، والغسيل يستغرق نصف الوقت.",
    },
  },
  {
    slug: "window-tinting",
    pillar: "protect",
    deep: true,
    name: { en: "Window Tinting", ar: "تظليل النوافذ" },
    short: {
      en: "Heat-rejecting film that drops cabin temperature, blocks UV, and stops your dashboard fading. Cut and fitted with no bubbles or purple fade.",
      ar: "فيلم عازل للحرارة يخفض حرارة المقصورة، ويحجب الأشعة فوق البنفسجية، ويمنع بهتان لوحة القيادة. يُقص ويُركّب دون فقاعات أو تحول لوني.",
    },
  },
  {
    slug: "alloy-rim-protection",
    pillar: "protect",
    name: { en: "Alloy Rim Protection", ar: "حماية الجنوط" },
    short: {
      en: "Brake dust and kerb rash are what kill alloys. A ceramic barrier on the face and barrel means contamination rinses off instead of etching in.",
      ar: "غبار الفرامل واحتكاك الأرصفة هما ما يفسد الجنوط. حاجز سيراميكي على الوجه والتجويف يجعل الأوساخ تُشطف بدل أن تتآكل داخلها.",
    },
  },
  {
    slug: "underbody-coating",
    pillar: "protect",
    name: {
      en: "Underbody Coating & Rust Protection",
      ar: "عزل القاعدة والحماية من الصدأ",
    },
    short: {
      en: "The part nobody looks at until it's too late. Sealed against salt air off the creek, sand abrasion, and the standing water of a Dubai downpour.",
      ar: "الجزء الذي لا ينظر إليه أحد حتى يفوت الأوان. يُعزل ضد هواء الخور المالح، وتآكل الرمال، ومياه أمطار دبي الراكدة.",
    },
  },
  {
    slug: "protection-accessories",
    pillar: "protect",
    name: {
      en: "Vehicle Protection Accessories",
      ar: "إكسسوارات الحماية",
    },
    short: {
      en: "Mud flaps, door edge guards, boot liners, sill protectors — the unglamorous parts that keep resale value intact.",
      ar: "واقيات الطين، وحواف الأبواب، وبطانات الصندوق، وحماية العتبات — القطع غير اللافتة التي تحفظ قيمة إعادة البيع.",
    },
  },

  {
    slug: "paint-correction",
    pillar: "enhance",
    name: {
      en: "Paint Correction & Machine Polishing",
      ar: "تصحيح الطلاء والتلميع الآلي",
    },
    short: {
      en: "Multi-stage machine polishing that removes swirls and holograms instead of filling them. Measured with a paint depth gauge so we never cut more than the clear coat can spare.",
      ar: "تلميع آلي متعدد المراحل يزيل الخدوش الدائرية بدل ملئها. نقيس سماكة الطلاء بجهاز مخصص حتى لا نزيل أكثر مما تحتمله الطبقة الشفافة.",
    },
  },
  {
    slug: "full-respray",
    pillar: "enhance",
    deep: true,
    name: {
      en: "Full Vehicle Respray / Paint Jobs",
      ar: "إعادة الدهان الكامل",
    },
    short: {
      en: "Panel or full body, colour-matched and baked. For accident repair, a colour change that needs to be permanent, or paint that's past correcting.",
      ar: "قطعة واحدة أو الهيكل بالكامل، بمطابقة لونية وتجفيف بالفرن. لإصلاح الحوادث، أو تغيير لون دائم، أو طلاء تجاوز مرحلة الإصلاح.",
    },
  },
  {
    slug: "scratch-repair",
    pillar: "enhance",
    name: {
      en: "Paint Touch-Ups & Scratch Repair",
      ar: "إصلاح الخدوش ولمسات الطلاء",
    },
    short: {
      en: "Localised repair for car park scrapes and key marks — blended into the surrounding panel so the fix doesn't announce itself.",
      ar: "إصلاح موضعي لخدوش المواقف وعلامات المفاتيح — يُدمج مع القطعة المحيطة بحيث لا يظهر أثر الإصلاح.",
    },
  },
  {
    slug: "dent-removal",
    pillar: "enhance",
    name: { en: "Paintless Dent Removal (PDR)", ar: "إزالة الانبعاجات دون دهان" },
    short: {
      en: "Door dings and hail dents massaged out from behind the panel. No filler, no respray, and the factory paint stays factory.",
      ar: "انبعاجات الأبواب والبَرَد تُزال بالضغط من خلف القطعة. بلا معجون ولا إعادة دهان، ويبقى طلاء المصنع كما هو.",
    },
  },
  {
    slug: "headlight-restoration",
    pillar: "enhance",
    name: { en: "Headlight Restoration", ar: "تجديد المصابيح الأمامية" },
    short: {
      en: "Three Dubai summers turn polycarbonate lenses yellow and hazy. Sanded back, polished clear, then UV-sealed so it doesn't return in six months.",
      ar: "ثلاثة صيفيات في دبي تكفي لاصفرار العدسات. نصنفرها ونلمّعها حتى الشفافية، ثم نعزلها ضد الأشعة فوق البنفسجية حتى لا تعود الضبابية.",
    },
  },
  {
    slug: "interior-detailing",
    pillar: "enhance",
    name: { en: "Interior Detailing", ar: "تنظيف المقصورة" },
    short: {
      en: "Steam extraction on fabric, pH-correct cleaning and conditioning on leather, every vent and seam gone through by hand.",
      ar: "تنظيف بالبخار للأقمشة، ومنظفات متوازنة الحموضة مع ترطيب للجلد، ومعالجة يدوية لكل فتحة تهوية ودرزة.",
    },
  },
  {
    slug: "exterior-detailing",
    pillar: "enhance",
    name: { en: "Exterior Detailing", ar: "العناية الخارجية" },
    short: {
      en: "Decontamination, clay bar, gloss enhancement. The reset that makes protection worth applying — coatings lock in whatever is underneath them.",
      ar: "إزالة الترسبات، ومعالجة بالطين، وتعزيز اللمعان. هذه هي البداية التي تجعل الحماية مجدية — فالطبقات تحفظ ما تحتها كما هو.",
    },
  },
  {
    slug: "engine-bay-cleaning",
    pillar: "enhance",
    name: { en: "Engine Bay Cleaning", ar: "تنظيف حجرة المحرك" },
    short: {
      en: "Sensitive components masked, degreased by hand, dressed without leaving anything greasy. Matters more than people think at resale.",
      ar: "تغطية المكوّنات الحساسة، وإزالة الشحوم يدويًا، وتلميع دون بقايا دهنية. يفرق أكثر مما يُتوقع عند إعادة البيع.",
    },
  },
  {
    slug: "vehicle-washing",
    pillar: "enhance",
    name: { en: "Professional Vehicle Washing", ar: "الغسيل الاحترافي" },
    short: {
      en: "Two-bucket hand wash with pH-neutral shampoo and clean microfibre. The opposite of the drive-through brush that put the swirls there.",
      ar: "غسيل يدوي بطريقة الدلوين بشامبو متعادل الحموضة وقماش ميكروفايبر نظيف. النقيض تمامًا لفرشاة المغاسل الآلية التي سببت الخدوش.",
    },
  },
  {
    slug: "mobile-detailing",
    pillar: "enhance",
    comingSoon: true,
    name: { en: "Mobile Detailing", ar: "خدمة متنقلة" },
    short: {
      en: "Full detailing at your home or office, with our own water and power. Launching soon — ask us to add you to the list.",
      ar: "عناية كاملة في منزلك أو مكتبك، بمائنا وطاقتنا. قريبًا — اطلب إضافتك إلى القائمة.",
    },
  },

  {
    slug: "car-wrapping",
    pillar: "elevate",
    deep: true,
    name: {
      en: "Vehicle Wrapping (Colour Change Wraps)",
      ar: "تغليف السيارة وتغيير اللون",
    },
    short: {
      en: "Satin, gloss, chrome or matte across the whole car. Your factory paint stays untouched underneath, and it comes off cleanly when you want it gone.",
      ar: "ساتان أو لامع أو كروم أو مطفي على كامل السيارة. طلاء المصنع يبقى سليمًا تحته، ويُزال بنظافة متى شئت.",
    },
  },
  {
    slug: "body-kit-installation",
    pillar: "elevate",
    name: { en: "Body Kit Installation", ar: "تركيب أطقم الهيكل" },
    short: {
      en: "Splitters, skirts, diffusers and spoilers — test-fitted, painted to match, then mounted properly rather than taped on.",
      ar: "مقسّمات هوائية وتنانير وناشرات وأجنحة — تُجرّب أولًا، وتُدهن بمطابقة اللون، ثم تُثبّت بطريقة صحيحة لا باللاصق.",
    },
  },
  {
    slug: "roof-rack-installation",
    pillar: "elevate",
    name: { en: "Roof Rack Installation", ar: "تركيب حمّالات السقف" },
    short: {
      en: "Load-rated racks and crossbars fitted to factory mounting points, torqued to spec and sealed against water ingress.",
      ar: "حمّالات وقضبان بحمولة معتمدة تُركّب على نقاط التثبيت الأصلية، بعزم ربط مطابق وعزل ضد تسرب المياه.",
    },
  },
  {
    slug: "storage-box-installation",
    pillar: "elevate",
    name: { en: "Side Storage Box Installation", ar: "تركيب صناديق التخزين الجانبية" },
    short: {
      en: "Lockable side and rear boxes for overland and work vehicles, mounted to take real weight on rough ground.",
      ar: "صناديق جانبية وخلفية قابلة للقفل لسيارات الرحلات والعمل، مثبّتة لتتحمل أوزانًا حقيقية على الطرق الوعرة.",
    },
  },
  {
    slug: "off-road-accessories",
    pillar: "elevate",
    name: {
      en: "Off-Road Accessories Installation",
      ar: "تركيب تجهيزات الطرق الوعرة",
    },
    short: {
      en: "Recovery points, snorkels, rock sliders, bull bars and light bars — specified for desert running, not for the car park.",
      ar: "نقاط سحب، وشنوركل، وحماية جانبية، ومصدات أمامية، وكشافات — مختارة للاستخدام الصحراوي الفعلي لا للمظهر.",
    },
  },
  {
    slug: "lighting-upgrades",
    pillar: "elevate",
    name: { en: "Vehicle Lighting Upgrades", ar: "تطوير الإضاءة" },
    short: {
      en: "LED and matrix conversions, ambient interior lighting, auxiliary driving lamps — wired into a fused circuit, never spliced into the loom.",
      ar: "تحويلات LED والمصفوفة، وإضاءة داخلية محيطة، وكشافات مساعدة — بتوصيل عبر دائرة محمية بمصهر، دون قطع الأسلاك الأصلية.",
    },
  },
  {
    slug: "custom-exterior-accessories",
    pillar: "elevate",
    name: { en: "Custom Exterior Accessories", ar: "إكسسوارات خارجية مخصصة" },
    short: {
      en: "Grilles, badges, mirror caps, window trim and roof spoilers — swapped, colour-matched or de-chromed to your spec.",
      ar: "شبكات أمامية، وشعارات، وأغطية مرايا، وإطارات نوافذ، وأجنحة سقف — تُستبدل أو تُطابق لونيًا أو يُزال الكروم منها حسب طلبك.",
    },
  },
  {
    slug: "performance-styling",
    pillar: "elevate",
    name: {
      en: "Performance & Styling Accessories",
      ar: "إكسسوارات الأداء والتصميم",
    },
    short: {
      en: "Exhaust tips, intakes, lowering springs and wheel spacers, fitted and torqued by people who will tell you when a part is a bad idea.",
      ar: "فتحات عادم، ومداخل هواء، ونوابض تخفيض، وفواصل جنوط — تُركّب بعزم صحيح على يد من يخبرك بصراحة إذا كانت القطعة فكرة سيئة.",
    },
  },
];

export function servicesInPillar(pillar: PillarId) {
  return services.filter((service) => service.pillar === pillar);
}

export function deepServices() {
  return services.filter((service) => service.deep);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getPillar(id: PillarId) {
  return pillars.find((pillar) => pillar.id === id)!;
}
