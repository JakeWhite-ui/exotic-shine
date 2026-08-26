import type { Translated } from "@/lib/i18n";

export type DeepContent = {
  lede: Translated;
  /** Ordered steps, shown as the process timeline. */
  process: { title: Translated; body: Translated }[];
  includes: Translated[];
  faqs: { question: Translated; answer: Translated }[];
};

/**
 * Long-form content for the five services with real search demand in Dubai.
 * Everything else lives as a section on its pillar page — twenty-four thin
 * pages would split ranking signals instead of concentrating them.
 */
export const deepContent: Record<string, DeepContent> = {
  "paint-protection-film": {
    lede: {
      en: "Sheikh Zayed Road throws stones at your bumper every single day. PPF is a self-healing urethane film that takes those hits instead of your paint — and when it's cut and wrapped properly, you cannot tell it's there.",
      ar: "شارع الشيخ زايد يقذف الحصى على مقدمة سيارتك كل يوم. فيلم حماية الطلاء طبقة يوريثان ذاتية الالتئام تتلقى تلك الضربات بدل الطلاء — وإذا قُصّ ولُفّ بإتقان فلن تلاحظ وجوده.",
    },
    process: [
      {
        title: { en: "Correct first", ar: "التصحيح أولًا" },
        body: {
          en: "Film locks in whatever is underneath it. We machine-polish out swirls and defects before a single panel gets covered, because sealing a scratch under film means living with it for ten years.",
          ar: "الفيلم يحفظ ما تحته كما هو. لذلك نلمّع الخدوش والعيوب آليًا قبل تغطية أي قطعة، لأن حبس خدش تحت الفيلم يعني العيش معه عشر سنوات.",
        },
      },
      {
        title: { en: "Decontaminate and prep", ar: "التنظيف والتحضير" },
        body: {
          en: "Clay bar, panel wipe, then a controlled clean room. Any grit left on the surface becomes a permanent bump under the film.",
          ar: "معالجة بالطين، ثم مسح القطع، ثم غرفة نظيفة مضبوطة. أي ذرة متبقية على السطح تتحول إلى نتوء دائم تحت الفيلم.",
        },
      },
      {
        title: { en: "Computer-cut templates", ar: "قوالب مقصوصة بالحاسوب" },
        body: {
          en: "Patterns plotted to your exact model. No blades near your paint at any point — the cheap shops cut on the car, and that leaves scores in the clear coat you'll find years later.",
          ar: "قوالب مرسومة لطرازك بالضبط. لا شفرات قرب الطلاء إطلاقًا — الورش الرخيصة تقص على السيارة، فتترك أخاديد في الطبقة الشفافة تكتشفها بعد سنوات.",
        },
      },
      {
        title: { en: "Wrapped edges, sealed", ar: "لف الحواف وإحكامها" },
        body: {
          en: "Film tucked around panel edges rather than stopping short of them. That's the difference between an install that disappears and one with visible lines collecting dirt.",
          ar: "يُلف الفيلم حول حواف القطع بدل التوقف قبلها. هذا هو الفرق بين تركيب يختفي تمامًا وآخر بخطوط ظاهرة تتجمع فيها الأوساخ.",
        },
      },
    ],
    includes: [
      { en: "Full front, track pack, or full body coverage", ar: "تغطية المقدمة الكاملة أو الحزمة الرياضية أو الهيكل بالكامل" },
      {
        en: "Premium films from XPEL, 3M and UltraGuard, chosen to your budget",
        ar: "أفلام فاخرة من XPEL و3M وUltraGuard، تُختار حسب ميزانيتك",
      },
      { en: "Paint correction included before application", ar: "تصحيح الطلاء مشمول قبل التركيب" },
      { en: "Headlight and door cup protection", ar: "حماية المصابيح ومقابض الأبواب" },
    ],
    faqs: [
      {
        question: { en: "How long does PPF take to install?", ar: "كم يستغرق تركيب الفيلم الواقي؟" },
        answer: {
          en: "One to three days depending on coverage and how much correction the paint needs first. Full-body installs on complex bodywork take the longest.",
          ar: "من يوم إلى ثلاثة أيام حسب مساحة التغطية ومدى حاجة الطلاء للتصحيح أولًا. التغطية الكاملة على الهياكل المعقدة تستغرق الأطول.",
        },
      },
      {
        question: { en: "Will it yellow in the Dubai sun?", ar: "هل يصفرّ تحت شمس دبي؟" },
        answer: {
          en: "Not the films we fit. Modern top-tier film has UV inhibitors built into the topcoat. The film that yellows is old technology or an unbranded import — which is exactly why we're specific about which brands we use.",
          ar: "ليس الأفلام التي نركّبها. الأفلام الحديثة عالية الجودة تحتوي على مثبطات للأشعة فوق البنفسجية ضمن طبقتها العليا. أما الذي يصفرّ فهو تقنية قديمة أو استيراد مجهول المصدر — ولهذا تحديدًا نحدد بوضوح العلامات التي نعمل بها.",
        },
      },
      {
        question: { en: "Can it be removed later?", ar: "هل يمكن إزالته لاحقًا؟" },
        answer: {
          en: "Yes. Removed with controlled heat, it comes away without taking paint with it — which is exactly why it protects resale value.",
          ar: "نعم. يُزال بحرارة مضبوطة دون أن يسحب الطلاء معه — ولهذا تحديدًا يحافظ على قيمة إعادة البيع.",
        },
      },
      {
        question: { en: "PPF or ceramic coating?", ar: "الفيلم الواقي أم الطلاء السيراميكي؟" },
        answer: {
          en: "Different jobs. PPF stops physical damage — stones, scratches, kerb rash. Ceramic handles chemical resistance, gloss and easy cleaning. Most of our clients put PPF on the front end and ceramic over everything.",
          ar: "وظيفتان مختلفتان. الفيلم يمنع الضرر المادي من الحصى والخدوش، والسيراميك يوفر مقاومة كيميائية ولمعانًا وسهولة تنظيف. معظم عملائنا يضعون الفيلم على المقدمة والسيراميك على كامل السيارة.",
        },
      },
    ],
  },

  "ceramic-coating": {
    lede: {
      en: "A liquid nano-ceramic that cures into a hard, slick layer chemically bonded to your clear coat. Dust stops sticking, water sheets straight off, and the wash that used to take an hour takes twenty minutes.",
      ar: "سائل سيراميك نانوي يتصلّب إلى طبقة قاسية ناعمة ترتبط كيميائيًا بالطبقة الشفافة. الغبار يتوقف عن الالتصاق، والماء ينزلق فورًا، والغسيل الذي كان يستغرق ساعة صار عشرين دقيقة.",
    },
    process: [
      {
        title: { en: "Decontamination wash", ar: "غسيل إزالة الترسبات" },
        body: {
          en: "Iron fallout remover, tar removal and a clay bar pass. Bonded contamination has to come off before anything bonds on top of it.",
          ar: "مزيل ترسبات الحديد، وإزالة القار، ومعالجة بالطين. الترسبات الملتصقة يجب أن تزول قبل أن يرتبط أي شيء فوقها.",
        },
      },
      {
        title: { en: "Paint correction", ar: "تصحيح الطلاء" },
        body: {
          en: "One to three polishing stages depending on condition, measured with a depth gauge. Coating over swirls preserves the swirls under glass.",
          ar: "من مرحلة إلى ثلاث مراحل تلميع حسب الحالة، بقياس سماكة الطلاء. الطلاء فوق الخدوش يحفظها كأنها تحت زجاج.",
        },
      },
      {
        title: { en: "Panel wipe and application", ar: "المسح والتطبيق" },
        body: {
          en: "Every trace of polishing oil removed, then the coating applied panel by panel in a controlled environment and levelled by hand.",
          ar: "إزالة كل أثر لزيوت التلميع، ثم تطبيق الطبقة قطعة بقطعة في بيئة مضبوطة وتسويتها يدويًا.",
        },
      },
      {
        title: { en: "Cure time", ar: "مدة التصلّب" },
        body: {
          en: "The car stays with us while the coating hardens. Taking it home wet and parking it under a sprinkler is how coatings fail in week one.",
          ar: "تبقى السيارة لدينا أثناء تصلّب الطبقة. أخذها مبكرًا وركنها تحت رشاش مياه هو سبب فشل الطبقة في أسبوعها الأول.",
        },
      },
    ],
    includes: [
      {
        en: "Premium coating systems matched to your budget and coverage",
        ar: "أنظمة طلاء فاخرة تُختار حسب ميزانيتك ومستوى التغطية",
      },
      { en: "Multi-stage paint correction before coating", ar: "تصحيح طلاء متعدد المراحل قبل الطلاء السيراميكي" },
      { en: "Glass, wheel and trim coating options", ar: "خيارات طلاء الزجاج والجنوط والإطارات" },
      { en: "Annual inspection and rejuvenation", ar: "فحص وتجديد سنوي" },
    ],
    faqs: [
      {
        question: { en: "How long does ceramic coating last?", ar: "كم تدوم طبقة السيراميك؟" },
        answer: {
          en: "Three to five years for our standard systems, longer for the top-tier ones, provided it's washed properly. Automatic brush washes will shorten that considerably.",
          ar: "من ثلاث إلى خمس سنوات لأنظمتنا القياسية، وأطول للأنظمة الأعلى، بشرط الغسيل الصحيح. المغاسل الآلية بالفرش تقصّر هذه المدة كثيرًا.",
        },
      },
      {
        question: { en: "Does it stop scratches?", ar: "هل تمنع الخدوش؟" },
        answer: {
          en: "No, and anyone promising that is selling you something. It resists chemical etching, bird lime and water spotting. For stone chips and scratches you want PPF.",
          ar: "لا، ومن يعدك بذلك يبيعك وهمًا. هي تقاوم التآكل الكيميائي وفضلات الطيور وبقع الماء. أما الحصى والخدوش فتحتاج فيلمًا واقيًا.",
        },
      },
      {
        question: { en: "Can I still take it through a car wash?", ar: "هل يمكن غسلها في المغاسل الآلية؟" },
        answer: {
          en: "Touchless, yes. Brush washes will put swirls into the coating just like they would into paint. We'd rather you brought it to us.",
          ar: "المغاسل بدون لمس، نعم. أما الفرش فستترك خدوشًا في الطبقة تمامًا كما تفعل بالطلاء. نفضّل أن تحضرها إلينا.",
        },
      },
      {
        question: { en: "Is it worth it on a new car?", ar: "هل تستحق على سيارة جديدة؟" },
        answer: {
          en: "It's the best time. Paint is at its most defect-free, so correction is minimal and you're protecting an unmarked surface from day one.",
          ar: "هذا أفضل توقيت. الطلاء في أقل حالاته عيبًا، فيكون التصحيح بسيطًا وتحمي سطحًا سليمًا من اليوم الأول.",
        },
      },
    ],
  },

  "window-tinting": {
    lede: {
      en: "In a Dubai August the difference between good film and cheap film is about eight degrees of cabin temperature. We fit heat-rejecting film that blocks infrared and UV without turning your windows purple in two years.",
      ar: "في أغسطس بدبي، الفرق بين الفيلم الجيد والرخيص يبلغ نحو ثماني درجات في حرارة المقصورة. نركّب أفلامًا عازلة تحجب الأشعة تحت الحمراء وفوق البنفسجية دون أن تتحول إلى اللون البنفسجي بعد سنتين.",
    },
    process: [
      {
        title: { en: "Glass preparation", ar: "تحضير الزجاج" },
        body: {
          en: "Every window stripped, cleaned and squeegeed. Trapped dust is what causes the little dots you notice a week later.",
          ar: "تنظيف كل نافذة وتجفيفها بعناية. الغبار المحتجز هو سبب النقاط الصغيرة التي تلاحظها بعد أسبوع.",
        },
      },
      {
        title: { en: "Computer-cut patterns", ar: "قوالب مقصوصة بالحاسوب" },
        body: {
          en: "Film plotted to your glass shape rather than trimmed on the vehicle, so nothing touches your seals or defroster lines.",
          ar: "يُقص الفيلم حسب شكل زجاج سيارتك بدل قصه عليها، فلا يمس العوازل ولا خطوط إزالة الضباب.",
        },
      },
      {
        title: { en: "Heat shrink and fit", ar: "التشكيل الحراري والتركيب" },
        body: {
          en: "Curved rear glass needs the film shrunk to shape before it goes on. Skipping this is why cheap tints crease at the corners.",
          ar: "الزجاج الخلفي المنحني يحتاج تشكيل الفيلم حراريًا قبل التركيب. تجاهل ذلك هو سبب تجعّد التظليل الرخيص عند الزوايا.",
        },
      },
      {
        title: { en: "Cure and inspect", ar: "التجفيف والفحص" },
        body: {
          en: "A few days for residual moisture to clear. Leave the windows up — we'll tell you exactly how long for your film.",
          ar: "بضعة أيام حتى تزول الرطوبة المتبقية. أبقِ النوافذ مغلقة — سنخبرك بالمدة الدقيقة لفيلمك.",
        },
      },
    ],
    includes: [
      { en: "Heat-rejecting ceramic and carbon films", ar: "أفلام سيراميكية وكربونية عازلة للحرارة" },
      { en: "UAE-legal VLT percentages advised up front", ar: "نسب تظليل مطابقة للقانون الإماراتي نوضحها مسبقًا" },
      { en: "Windscreen strips and full front options", ar: "خيارات شريط الزجاج الأمامي والتظليل الكامل" },
      {
        en: "Manufacturer warranty against bubbling and fade",
        ar: "ضمان من المصنّع ضد الفقاعات والبهتان",
      },
    ],
    faqs: [
      {
        question: { en: "What tint percentage is legal in the UAE?", ar: "ما نسبة التظليل المسموحة في الإمارات؟" },
        answer: {
          en: "Up to 50% on side and rear windows for privately registered cars, with the windscreen left clear apart from a top strip. Rules differ for company-registered and rental vehicles, so tell us how the car is registered and we'll advise before we cut anything.",
          ar: "حتى ٥٠٪ على النوافذ الجانبية والخلفية للسيارات المسجلة باسم أفراد، مع بقاء الزجاج الأمامي شفافًا عدا شريط علوي. القواعد تختلف لسيارات الشركات والإيجار، فأخبرنا بنوع التسجيل وسنوضح لك قبل القص.",
        },
      },
      {
        question: { en: "How long does tinting take?", ar: "كم يستغرق التظليل؟" },
        answer: {
          en: "Two to four hours for a full car. You can wait if you'd rather not leave it.",
          ar: "من ساعتين إلى أربع ساعات للسيارة كاملة. يمكنك الانتظار إن لم ترغب بتركها.",
        },
      },
      {
        question: { en: "Does darker mean cooler?", ar: "هل الأغمق يعني أبرد؟" },
        answer: {
          en: "No — that's the most common misunderstanding. Heat rejection comes from the film's infrared blocking, not its darkness. A quality light film outperforms a dark cheap one.",
          ar: "لا — وهذا أكثر سوء فهم شائع. عزل الحرارة يأتي من حجب الأشعة تحت الحمراء لا من درجة العتمة. فيلم فاتح عالي الجودة يتفوق على فيلم غامق رخيص.",
        },
      },
      {
        question: { en: "Will it interfere with my signal?", ar: "هل يؤثر على الإشارة؟" },
        answer: {
          en: "Our ceramic films are non-metallic, so GPS, tolls and phone signal are unaffected. Older metallic films did cause problems.",
          ar: "أفلامنا السيراميكية غير معدنية، فلا تتأثر إشارة GPS ولا سالك ولا الهاتف. الأفلام المعدنية القديمة كانت تسبب مشاكل.",
        },
      },
    ],
  },

  "car-wrapping": {
    lede: {
      en: "A full colour change in satin, gloss, matte or chrome — reversible, and gentler on resale value than a respray. Your factory paint sits untouched underneath the whole time.",
      ar: "تغيير لون كامل بلمسة ساتان أو لامعة أو مطفية أو كروم — قابل للإزالة، وأرفق بقيمة إعادة البيع من إعادة الدهان. طلاء المصنع يبقى سليمًا تحته طوال الوقت.",
    },
    process: [
      {
        title: { en: "Colour and finish selection", ar: "اختيار اللون واللمسة" },
        body: {
          en: "Physical samples on your actual car, in daylight. Colours behave differently on different body shapes and screen swatches lie.",
          ar: "عينات حقيقية على سيارتك تحت ضوء النهار. الألوان تختلف حسب شكل الهيكل، وعينات الشاشة مضللة.",
        },
      },
      {
        title: { en: "Deep clean and disassembly", ar: "تنظيف عميق وفك القطع" },
        body: {
          en: "Handles, badges, lights and trim come off. Wrapping around them instead of removing them is what makes a wrap look like a wrap.",
          ar: "تُفك المقابض والشعارات والمصابيح والإطارات. التغليف حولها بدل فكها هو ما يجعل التغليف يبدو تغليفًا.",
        },
      },
      {
        title: { en: "Application", ar: "التركيب" },
        body: {
          en: "Cast vinyl laid panel by panel, heated into the contours, with seams placed where the body naturally breaks.",
          ar: "فينيل مصبوب يُركّب قطعة بقطعة، ويُشكّل حراريًا حسب الانحناءات، مع وضع الوصلات عند الفواصل الطبيعية للهيكل.",
        },
      },
      {
        title: { en: "Post-heat and reassembly", ar: "التثبيت الحراري وإعادة التركيب" },
        body: {
          en: "Every edge post-heated so the vinyl keeps its shape and doesn't lift, then everything goes back on properly.",
          ar: "تُسخّن كل حافة لتحافظ على شكلها ولا ترتفع، ثم تُعاد كل القطع بشكل صحيح.",
        },
      },
    ],
    includes: [
      { en: "Premium cast vinyl in gloss, satin, matte or chrome", ar: "فينيل مصبوب فاخر لامع أو ساتان أو مطفي أو كروم" },
      { en: "Full disassembly rather than wrapping around parts", ar: "فك كامل للقطع بدل التغليف حولها" },
      { en: "Partial wraps, roofs, mirrors and accents", ar: "تغليف جزئي للسقف والمرايا والتفاصيل" },
      { en: "Clean removal whenever you want it gone", ar: "إزالة نظيفة متى أردت" },
    ],
    faqs: [
      {
        question: { en: "Does wrapping damage the paint underneath?", ar: "هل يضر التغليف بالطلاء تحته؟" },
        answer: {
          en: "Not on healthy factory paint — it usually protects it. On resprayed or already-flaking panels there is real risk of lifting, and we'll tell you honestly before we start.",
          ar: "لا على طلاء المصنع السليم — بل يحميه غالبًا. أما القطع المعاد دهانها أو المتقشرة فهناك خطر حقيقي بالانتزاع، وسنخبرك بصراحة قبل البدء.",
        },
      },
      {
        question: { en: "How long does a wrap last?", ar: "كم يدوم التغليف؟" },
        answer: {
          en: "Three to five years in this climate. Parking in shade and hand washing pushes it toward the longer end.",
          ar: "من ثلاث إلى خمس سنوات في هذا المناخ. الركن في الظل والغسيل اليدوي يطيلان العمر.",
        },
      },
      {
        question: { en: "How long does it take?", ar: "كم يستغرق؟" },
        answer: {
          en: "Three to five days for a full colour change done properly. Anyone quoting a day is wrapping around the handles.",
          ar: "من ثلاثة إلى خمسة أيام لتغيير لون كامل بإتقان. من يعدك بيوم واحد يغلّف حول المقابض.",
        },
      },
      {
        question: { en: "Can I wrap and then apply PPF?", ar: "هل يمكن التغليف ثم وضع الفيلم الواقي؟" },
        answer: {
          en: "Yes — clear PPF over a wrap protects the vinyl from stone chips, which is common on satin and matte finishes that are hard to repair.",
          ar: "نعم — فيلم شفاف فوق التغليف يحمي الفينيل من الحصى، وهو شائع مع اللمسات الساتان والمطفية التي يصعب إصلاحها.",
        },
      },
    ],
  },

  "full-respray": {
    lede: {
      en: "Panel repairs, accident work, or a permanent colour change done in paint rather than vinyl. Colour-matched to your code, sprayed in booth conditions and baked so it cures hard.",
      ar: "إصلاح قطع، أو أعمال حوادث، أو تغيير لون دائم بالدهان لا بالفينيل. مطابقة لونية حسب كود سيارتك، ورش في غرفة مخصصة وتجفيف بالفرن ليتصلب الطلاء.",
    },
    process: [
      {
        title: { en: "Assessment and colour match", ar: "التقييم ومطابقة اللون" },
        body: {
          en: "We read your paint code, then spray-out test cards and check them against your panels in daylight. Factory codes drift with age and sun.",
          ar: "نقرأ كود الطلاء، ثم نرش بطاقات اختبار ونطابقها مع قطع سيارتك تحت ضوء النهار. أكواد المصنع تتغير مع الزمن والشمس.",
        },
      },
      {
        title: { en: "Strip and bodywork", ar: "الفك وأعمال الهيكل" },
        body: {
          en: "Trim and glass removed rather than masked wherever it matters. Dents pulled and panels straightened before any primer goes down.",
          ar: "تُفك الإطارات والزجاج بدل تغطيتها حيثما لزم. تُسحب الانبعاجات وتُقوّم القطع قبل وضع أي بطانة.",
        },
      },
      {
        title: { en: "Primer, base and clear", ar: "البطانة واللون والطبقة الشفافة" },
        body: {
          en: "Sprayed in a controlled booth so dust doesn't land in the finish, then baked to cure rather than left to air dry.",
          ar: "يُرش في غرفة مضبوطة حتى لا يعلق الغبار، ثم يُجفف بالفرن بدل تركه ليجف بالهواء.",
        },
      },
      {
        title: { en: "Flat, polish, reassemble", ar: "التسوية والتلميع وإعادة التركيب" },
        body: {
          en: "Wet-sanded flat and machine-polished to remove orange peel, so the new paint matches the gloss level of the old rather than standing out.",
          ar: "يُصنفر بالماء ويُلمّع آليًا لإزالة أثر قشرة البرتقال، ليطابق الطلاء الجديد لمعان القديم بدل أن يبدو مختلفًا.",
        },
      },
    ],
    includes: [
      { en: "Single panel, multi-panel or full body", ar: "قطعة واحدة أو عدة قطع أو الهيكل كاملًا" },
      { en: "Spray-out cards checked against your paint", ar: "بطاقات اختبار مطابقة لطلاء سيارتك" },
      { en: "Booth spraying and baked curing", ar: "رش في غرفة مخصصة وتجفيف بالفرن" },
      { en: "Colour sanding and machine polish to finish", ar: "صنفرة لونية وتلميع آلي نهائي" },
    ],
    faqs: [
      {
        question: { en: "How long does a full respray take?", ar: "كم تستغرق إعادة الدهان الكاملة؟" },
        answer: {
          en: "One to three weeks depending on how much bodywork and disassembly is involved. Single panels are usually two to four days.",
          ar: "من أسبوع إلى ثلاثة أسابيع حسب حجم أعمال الهيكل والفك. القطعة الواحدة عادة من يومين إلى أربعة.",
        },
      },
      {
        question: { en: "Will the new paint match exactly?", ar: "هل يطابق الطلاء الجديد تمامًا؟" },
        answer: {
          en: "We match to your car as it is today, not to the code as it left the factory, and blend into adjacent panels so there's no hard line. On heavily sun-faded cars a full respray is sometimes the honest answer.",
          ar: "نطابق حالة سيارتك اليوم لا كود المصنع الأصلي، وندمج مع القطع المجاورة فلا يظهر خط فاصل. أما السيارات الباهتة بشدة من الشمس فإعادة الدهان الكاملة أحيانًا هي الجواب الصادق.",
        },
      },
      {
        question: { en: "Respray or wrap for a colour change?", ar: "دهان أم تغليف لتغيير اللون؟" },
        answer: {
          en: "Wrap if you might want the original colour back, or you want a finish paint can't do. Respray if it's permanent, if the existing paint is beyond saving, or if you want engine bay and door shuts changed too.",
          ar: "التغليف إن أردت العودة للون الأصلي أو أردت لمسة لا يوفرها الدهان. الدهان إن كان القرار دائمًا، أو الطلاء الحالي غير قابل للإنقاذ، أو أردت تغيير حجرة المحرك وحواف الأبواب أيضًا.",
        },
      },
      {
        question: { en: "Do you handle insurance work?", ar: "هل تتعاملون مع أعمال التأمين؟" },
        answer: {
          en: "Talk to us about your claim before you commit — we'll tell you what's involved and what it realistically costs either way.",
          ar: "تحدث معنا عن مطالبتك قبل أن تلتزم — سنوضح لك ما يتطلبه الأمر وتكلفته الواقعية في الحالتين.",
        },
      },
    ],
  },
};
