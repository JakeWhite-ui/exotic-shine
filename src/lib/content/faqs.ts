import type { Translated } from "@/lib/i18n";

/**
 * Homepage FAQ. Kept to the questions people actually ask before booking —
 * the old site had twenty-one, most of them restating the service list, which
 * buries the three that decide whether someone calls.
 */
export const generalFaqs: { question: Translated; answer: Translated }[] = [
  {
    question: {
      en: "Where are you, and do I need an appointment?",
      ar: "أين موقعكم، وهل أحتاج موعدًا؟",
    },
    answer: {
      en: "Warehouse 09, Al Maklai Warehouses in Ras Al Khor Industrial Area 3. Walk-ins are fine for a look and a quote, but book ahead for anything that needs the car left with us.",
      ar: "مستودع رقم ٩، مستودعات المكلاي في رأس الخور الصناعية ٣. يمكنك الحضور مباشرة للمعاينة والتسعير، لكن احجز مسبقًا لأي خدمة تتطلب ترك السيارة.",
    },
  },
  {
    question: {
      en: "How long will you have my car?",
      ar: "كم ستبقى سيارتي لديكم؟",
    },
    answer: {
      en: "A wash or interior clean is a few hours. Tinting is half a day. Ceramic coating and PPF run one to three days because the correction and curing can't be rushed. Respray work is one to three weeks.",
      ar: "الغسيل أو تنظيف المقصورة بضع ساعات. التظليل نصف يوم. الطلاء السيراميكي والفيلم الواقي من يوم إلى ثلاثة، لأن التصحيح والتجفيف لا يُستعجلان. أعمال الدهان من أسبوع إلى ثلاثة.",
    },
  },
  {
    question: {
      en: "Do you work on supercars and classics?",
      ar: "هل تعملون على السيارات الخارقة والكلاسيكية؟",
    },
    answer: {
      en: "Yes. Same process, more caution — we measure paint depth on everything, and on older or resprayed cars we'll tell you what we won't risk before we touch it.",
      ar: "نعم. الطريقة نفسها مع حذر أكبر — نقيس سماكة الطلاء على كل سيارة، وفي السيارات القديمة أو المعاد دهانها نخبرك بما لن نخاطر به قبل أن نلمسها.",
    },
  },
  {
    question: {
      en: "What's the difference between PPF and ceramic coating?",
      ar: "ما الفرق بين الفيلم الواقي والطلاء السيراميكي؟",
    },
    answer: {
      en: "PPF is a physical barrier — it stops stone chips and scratches reaching the paint. Ceramic is a chemical one — it resists etching, adds gloss and makes washing far easier. They solve different problems and most people end up with both.",
      ar: "الفيلم حاجز مادي يمنع الحصى والخدوش من الوصول إلى الطلاء. والسيراميك حاجز كيميائي يقاوم التآكل ويضيف لمعانًا ويسهّل الغسيل كثيرًا. كل منهما يعالج مشكلة مختلفة، ومعظم العملاء ينتهون بالاثنين.",
    },
  },
  {
    question: {
      en: "Can you remove scratches and swirl marks?",
      ar: "هل يمكنكم إزالة الخدوش والعلامات الدائرية؟",
    },
    answer: {
      en: "Most of them, yes — machine polishing removes clear coat to level the surface. If a scratch catches your fingernail it's usually through the clear coat, and that needs touch-up or paint rather than polishing.",
      ar: "معظمها نعم — التلميع الآلي يزيل طبقة رقيقة لتسوية السطح. أما إذا علق ظفرك في الخدش فهو غالبًا اخترق الطبقة الشفافة، ويحتاج لمسة دهان لا تلميعًا.",
    },
  },
  {
    question: {
      en: "How do I keep the finish once it's done?",
      ar: "كيف أحافظ على النتيجة بعد الانتهاء؟",
    },
    answer: {
      en: "Hand wash with two buckets and a pH-neutral shampoo, or bring it to us. The single fastest way to undo the work is an automatic brush wash — it puts the swirls straight back in.",
      ar: "اغسلها يدويًا بطريقة الدلوين وشامبو متعادل الحموضة، أو أحضرها إلينا. أسرع طريقة لإفساد العمل هي المغاسل الآلية بالفرش — فهي تعيد الخدوش فورًا.",
    },
  },
  {
    question: {
      en: "Do you offer a warranty?",
      ar: "هل تقدمون ضمانًا؟",
    },
    answer: {
      en: "XPEL paint protection film carries up to ten years from the manufacturer, ceramic coatings three to five depending on the system, and our tint film is warranted for life against bubbling and fade.",
      ar: "فيلم XPEL الواقي بضمان مصنّع يصل إلى عشر سنوات، والطلاء السيراميكي من ثلاث إلى خمس سنوات حسب النظام، وأفلام التظليل لدينا مضمونة مدى الحياة ضد الفقاعات والبهتان.",
    },
  },
  {
    question: {
      en: "How do I get a price?",
      ar: "كيف أحصل على سعر؟",
    },
    answer: {
      en: "Send us the make, model and year on WhatsApp with what you're after. For anything involving paint we'll want to see the car before committing to a number — quoting paint work off a photo is how people get surprised at collection.",
      ar: "أرسل لنا النوع والطراز وسنة الصنع على واتساب مع الخدمة المطلوبة. أما ما يتعلق بالطلاء فنفضّل رؤية السيارة قبل تحديد الرقم — التسعير من صورة هو سبب المفاجآت عند الاستلام.",
    },
  },
];
