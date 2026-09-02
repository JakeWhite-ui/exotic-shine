import type { Translated } from "@/lib/i18n";

/**
 * The client's own footage, cut down by scripts/build-media.py.
 *
 * This is the answer to the thing Alli flagged on 1 September: every service
 * card was an AI render, and the reference he sent (thevelondubai.com) sells
 * on an Instagram wall of reels. These are the same idea served from our own
 * origin — no embed, no third-party script, no account needed to see the work.
 *
 * A caption should say what the viewer is looking at, not what the service is
 * called. "A Mazda CX-5 going under film" beats "Paint Protection Film"; the
 * heading above the wall already says what the business does.
 */
export type Clip = {
  id: string;
  /** Drives the quote link under the clip, and groups clips by service. */
  serviceSlug: string;
  caption: Translated;
  /** Portrait unless stated — the hero is the one landscape take. */
  landscape?: boolean;
};

const base = "/clips";

export function clipVideo(clip: Clip) {
  return `${base}/${clip.id}.mp4`;
}

export function clipPoster(clip: Clip) {
  return `${base}/${clip.id}-poster.webp`;
}

/**
 * The homepage hero. 4K master, shot wide, and the only one where the work,
 * the hands and the signage are all in frame at once — which is what a hero
 * has to do in the two seconds before someone scrolls.
 */
export const heroClip: Clip = {
  id: "ppf-hood-white",
  serviceSlug: "paint-protection-film",
  landscape: true,
  caption: {
    en: "Squeegeeing paint protection film onto a bonnet in our Ras Al Khor bay",
    ar: "تثبيت فيلم حماية الطلاء على غطاء المحرك في ورشتنا برأس الخور",
  },
};

/**
 * The wall, in the order it reads best: film going on, film finished, a colour
 * change, then the wet work. Five PPF clips in a row is accurate to what they
 * do all day but monotonous to scroll, so the wraps and the wash break it up.
 */
export const reelClips: Clip[] = [
  {
    id: "ppf-cx5",
    serviceSlug: "paint-protection-film",
    caption: {
      en: "A Mazda CX-5 going under film, panel by panel",
      ar: "مازدا CX-5 تُغطى بالفيلم قطعة تلو الأخرى",
    },
  },
  {
    id: "wrap-maybach",
    serviceSlug: "car-wrapping",
    caption: {
      en: "Mercedes-Maybach S-Class, colour change wrap in mint and pink",
      ar: "مرسيدس مايباخ الفئة S، تغليف بتغيير اللون إلى النعناعي والوردي",
    },
  },
  {
    id: "ppf-porsche",
    serviceSlug: "paint-protection-film",
    caption: {
      en: "Full sheets of film pulled over a white sports car",
      ar: "ألواح كاملة من الفيلم تُمد على سيارة رياضية بيضاء",
    },
  },
  {
    id: "wash-polish-gwagon",
    serviceSlug: "vehicle-washing",
    caption: {
      en: "A Brabus G-Class: foam wash, machine polish, mint leather interior",
      ar: "برابوس فئة G: غسيل بالرغوة، وتلميع آلي، ومقصورة جلد نعناعية",
    },
  },
  {
    id: "ppf-escalade",
    serviceSlug: "paint-protection-film",
    caption: {
      en: "Wet-applying film to a black SUV, then the finish it leaves",
      ar: "تركيب الفيلم بالطريقة الرطبة على سيارة سوداء، والنتيجة بعدها",
    },
  },
  {
    id: "wheels-cx5",
    serviceSlug: "alloy-rim-protection",
    caption: {
      en: "Alloys dressed and sealed, inside and out",
      ar: "معالجة الجنوط وحمايتها من الداخل والخارج",
    },
  },
  {
    id: "detail-grey-suv",
    serviceSlug: "exterior-detailing",
    caption: {
      en: "Exterior and cabin detail on a grey SUV, start to finish",
      ar: "عناية كاملة بالهيكل والمقصورة لسيارة رمادية من البداية للنهاية",
    },
  },
  {
    id: "ppf-white-suv",
    serviceSlug: "paint-protection-film",
    caption: {
      en: "Laying film over the front end of a white SUV",
      ar: "مد الفيلم على مقدمة سيارة بيضاء",
    },
  },
];
