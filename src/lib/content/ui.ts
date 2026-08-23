import type { Translated } from "@/lib/i18n";

/**
 * Interface copy. Service and page content lives alongside its own data;
 * this file is only the furniture — buttons, labels, section headings.
 *
 * The Arabic here is a first pass and is flagged for review by a native
 * speaker before launch.
 */
export const ui = {
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    services: { en: "Services", ar: "الخدمات" },
    gallery: { en: "Our work", ar: "أعمالنا" },
    pricing: { en: "Pricing", ar: "الأسعار" },
    about: { en: "About", ar: "من نحن" },
    promotions: { en: "Offers", ar: "العروض" },
    contact: { en: "Contact", ar: "اتصل بنا" },
  },
  cta: {
    quote: { en: "Get a free quote", ar: "احصل على عرض سعر" },
    whatsapp: { en: "WhatsApp us", ar: "راسلنا واتساب" },
    call: { en: "Call us", ar: "اتصل بنا" },
    email: { en: "Email us", ar: "راسلنا بالبريد" },
    viewServices: { en: "See all services", ar: "كل الخدمات" },
    viewWork: { en: "See our work", ar: "شاهد أعمالنا" },
    learnMore: { en: "Learn more", ar: "التفاصيل" },
    bookNow: { en: "Book a slot", ar: "احجز موعدًا" },
    seePricing: { en: "See pricing", ar: "عرض الأسعار" },
  },
  labels: {
    comingSoon: { en: "Coming soon", ar: "قريبًا" },
    servicesCount: { en: "services", ar: "خدمة" },
    before: { en: "Before", ar: "قبل" },
    after: { en: "After", ar: "بعد" },
    dragToCompare: { en: "Drag to compare", ar: "اسحب للمقارنة" },
    openToday: { en: "Open today", ar: "مفتوح اليوم" },
    closedToday: { en: "Closed today", ar: "مغلق اليوم" },
    closed: { en: "Closed", ar: "مغلق" },
    phone: { en: "Phone", ar: "الهاتف" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    address: { en: "Address", ar: "العنوان" },
    hours: { en: "Opening hours", ar: "ساعات العمل" },
    findUs: { en: "Find the studio", ar: "موقع الاستوديو" },
    followUs: { en: "Follow", ar: "تابعنا" },
    language: { en: "العربية", ar: "English" },
    menu: { en: "Menu", ar: "القائمة" },
    close: { en: "Close", ar: "إغلاق" },
  },
  sections: {
    pillarsEyebrow: { en: "What we do", ar: "ما نقدمه" },
    pillarsTitle: { en: "Three ways we work on a car", ar: "ثلاثة مسارات للعمل على سيارتك" },
    workEyebrow: { en: "Our work", ar: "أعمالنا" },
    workTitle: { en: "Before and after", ar: "قبل وبعد" },
    faqEyebrow: { en: "Questions", ar: "أسئلة" },
    faqTitle: { en: "Things people ask us", ar: "أسئلة يطرحها عملاؤنا" },
    reviewsEyebrow: { en: "Reviews", ar: "آراء العملاء" },
    reviewsTitle: { en: "What clients say", ar: "ماذا يقول عملاؤنا" },
    contactEyebrow: { en: "Get in touch", ar: "تواصل معنا" },
    contactTitle: { en: "Tell us about your car", ar: "أخبرنا عن سيارتك" },
  },
  form: {
    name: { en: "Your name", ar: "الاسم" },
    phone: { en: "Phone or WhatsApp", ar: "الهاتف أو واتساب" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    vehicle: { en: "Car make and model", ar: "نوع السيارة وطرازها" },
    service: { en: "What do you need?", ar: "ما الخدمة المطلوبة؟" },
    servicePlaceholder: { en: "Choose a service", ar: "اختر خدمة" },
    message: { en: "Anything else we should know?", ar: "أي تفاصيل إضافية؟" },
    submit: { en: "Send enquiry", ar: "إرسال الطلب" },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    success: {
      en: "Got it. We'll come back to you within one working day.",
      ar: "وصلنا طلبك. سنرد عليك خلال يوم عمل واحد.",
    },
    error: {
      en: "That didn't send. Please WhatsApp us instead — it's faster anyway.",
      ar: "تعذّر الإرسال. راسلنا على واتساب — أسرع على أي حال.",
    },
    required: { en: "Required", ar: "مطلوب" },
    privacy: {
      en: "We'll only use this to answer your enquiry.",
      ar: "نستخدم بياناتك للرد على طلبك فقط.",
    },
  },
} satisfies Record<string, Record<string, Translated>>;
