export type Clinic = {
  id: string;
  city: { en: string; ar: string };
  country: { en: string; ar: string };
  address: { en: string; ar: string };
  hours: { en: string; ar: string };
  currency: string;
  image: string;
};

export const clinics: Clinic[] = [
  {
    id: "dubai",
    city: { en: "Dubai", ar: "دبي" },
    country: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    address: { en: "Gate Village 4, DIFC, Dubai", ar: "جيت فيليدج ٤، مركز دبي المالي العالمي" },
    hours: { en: "Sun–Thu · 9:00–19:00", ar: "الأحد–الخميس · ٩:٠٠–١٩:٠٠" },
    currency: "AED",
    image:
      "https://images.pexels.com/photos/15605308/pexels-photo-15605308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: "abudhabi",
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    country: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    address: { en: "Al Maryah Island, Abu Dhabi", ar: "جزيرة المارية، أبوظبي" },
    hours: { en: "Sun–Thu · 9:00–18:00", ar: "الأحد–الخميس · ٩:٠٠–١٨:٠٠" },
    currency: "AED",
    image:
      "https://images.pexels.com/photos/8092165/pexels-photo-8092165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: "doha",
    city: { en: "Doha", ar: "الدوحة" },
    country: { en: "Qatar", ar: "قطر" },
    address: { en: "Msheireb Downtown, Doha", ar: "مشيرب قلب الدوحة" },
    hours: { en: "Sun–Thu · 10:00–20:00", ar: "الأحد–الخميس · ١٠:٠٠–٢٠:٠٠" },
    currency: "QAR",
    image:
      "https://images.pexels.com/photos/12969046/pexels-photo-12969046.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export type Service = {
  id: string;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  minutes: number;
  price: number; // AED
};

export const services: Service[] = [
  {
    id: "consult",
    title: { en: "Free 15-minute call", ar: "مكالمة تعارف ١٥ دقيقة" },
    desc: {
      en: "A short call before anything is booked. No history taken.",
      ar: "مكالمة قصيرة قبل أي حجز. بدون أخذ تاريخ مرضي.",
    },
    minutes: 15,
    price: 0,
  },
  {
    id: "assessment",
    title: { en: "Full assessment + Y-BOCS", ar: "تقييم كامل + مقياس Y-BOCS" },
    desc: {
      en: "Ninety minutes. The whole history, written down.",
      ar: "تسعون دقيقة. القصة كاملة، مكتوبة.",
    },
    minutes: 90,
    price: 1200,
  },
  {
    id: "erp",
    title: { en: "ERP session", ar: "جلسة تعرض ومنع استجابة" },
    desc: {
      en: "Fifty minutes of structured exposure and response prevention.",
      ar: "خمسون دقيقة من التعرض المنظم ومنع الاستجابة.",
    },
    minutes: 50,
    price: 750,
  },
  {
    id: "family",
    title: { en: "Family / carer session", ar: "جلسة عائلية" },
    desc: {
      en: "For accommodation and reassurance, with a script agreed in advance.",
      ar: "لمعالجة الطمأنة والتيسير، بنص متفق عليه مسبقاً.",
    },
    minutes: 60,
    price: 850,
  },
];

export type Doctor = {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  years: string;
  clinic: string;
  bio: { en: string; ar: string };
  image: string;
};

export const doctors: Doctor[] = [
  {
    id: "nadia",
    name: { en: "Dr Nadia Haddad", ar: "د. نادية حداد" },
    role: { en: "Clinical Lead · ERP Specialist", ar: "المديرة الإكلينيكية · أخصائية ERP" },
    years: "18 yrs",
    clinic: "dubai",
    bio: {
      en: "Trained in ERP and Inference-Based CBT, Nadia builds the hierarchy with you and refuses to move faster than the step in front of you.",
      ar: "مدرّبة على التعرض ومنع الاستجابة والعلاج المعرفي الاستدلالي، تبني معك التدرّج ولا تتجاوز الخطوة التي أمامك.",
    },
    image:
      "https://images.pexels.com/photos/37476745/pexels-photo-37476745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    id: "omar",
    name: { en: "Dr Omar Reyes", ar: "د. عمر رايس" },
    role: { en: "Consultant · Pharmacology", ar: "استشاري · علم الأدوية" },
    years: "14 yrs",
    clinic: "dubai",
    bio: {
      en: "Omar oversees medication where it supports the work rather than replaces it, with an interest in the quiet exhaustion of high-functioning life.",
      ar: "يشرف على الدواء حين يدعم العلاج لا حين يحل محله، ويهتم بالإرهاق الصامت لدى عالي الأداء.",
    },
    image:
      "https://images.pexels.com/photos/32254658/pexels-photo-32254658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    id: "lina",
    name: { en: "Dr Lina Farouk", ar: "د. لينا فاروق" },
    role: { en: "Young People's Lead", ar: "مسؤولة قسم الأطفال والمراهقين" },
    years: "11 yrs",
    clinic: "doha",
    bio: {
      en: "Lina works with families as carefully as with the hierarchy itself, trained in family-based ERP for children and adolescents.",
      ar: "تعمل مع العائلات بعناية توازي عنايتها بالتدرّج نفسه، ومدرّبة على ERP الأسري للأطفال والمراهقين.",
    },
    image:
      "https://images.pexels.com/photos/15960478/pexels-photo-15960478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    id: "samir",
    name: { en: "Dr Samir Ellis", ar: "د. سمير إليس" },
    role: { en: "Intrusive Thoughts", ar: "الأفكار الاقتحامية" },
    years: "16 yrs",
    clinic: "abudhabi",
    bio: {
      en: "Samir works with covert and mental rituals — reviewing, arguing, silently checking — where the compulsion is invisible to everyone but you.",
      ar: "يعمل على الطقوس الذهنية الخفية — المراجعة والجدال والتحقق الصامت — حيث لا يرى أحد القهر سواك.",
    },
    image:
      "https://images.pexels.com/photos/28516278/pexels-photo-28516278.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
];

export const voices = [
  {
    quote: {
      en: "I stopped asking whether it was true. That was the whole of it, and it took a year of Tuesdays.",
      ar: "توقفت عن السؤال إن كان الأمر حقيقياً. كان هذا كل شيء، واستغرق سنة من أيام الثلاثاء.",
    },
    name: { en: "R.", ar: "ر." },
    role: { en: "Intrusive thoughts", ar: "أفكار اقتحامية" },
  },
  {
    quote: {
      en: "Item fourteen on my list was leaving the house without going back to check. I did it on a Tuesday, and nobody clapped, which was perfect.",
      ar: "البند الرابع عشر في قائمتي كان مغادرة البيت دون العودة للتأكد. فعلتها يوم ثلاثاء، ولم يصفق أحد، وكان ذلك مثالياً.",
    },
    name: { en: "H.", ar: "هـ." },
    role: { en: "Checking", ar: "وسواس التحقق" },
  },
  {
    quote: {
      en: "They taught us to stop answering him kindly. It was the hardest thing we have ever been asked to do, and it worked.",
      ar: "علّمونا أن نتوقف عن طمأنته بلطف. كان أصعب ما طُلب منا يوماً، ونجح.",
    },
    name: { en: "M. & J.", ar: "م. و ج." },
    role: { en: "Parents", ar: "والدان" },
  },
  {
    quote: {
      en: "The first appointment where nobody looked at a clock. I said more in ninety minutes than in nine years.",
      ar: "أول موعد لم ينظر فيه أحد إلى الساعة. قلت في تسعين دقيقة أكثر مما قلته في تسع سنوات.",
    },
    name: { en: "S.", ar: "س." },
    role: { en: "Assessment", ar: "تقييم" },
  },
];

export const faqs = [
  {
    q: { en: "Do you treat OCD?", ar: "هل تعالجون الوسواس القهري؟" },
    a: {
      en: "Yes. OCD is the centre of this practice. We use Exposure and Response Prevention as the primary, evidence-based approach, alongside medication where appropriate.",
      ar: "نعم. الوسواس القهري هو محور هذه العيادة. نستخدم التعرض ومنع الاستجابة كنهج أساسي قائم على الأدلة، مع الدواء عند الحاجة.",
    },
  },
  {
    q: { en: "What does ERP involve?", ar: "ما الذي يتضمنه-علاٌ ERP؟" },
    a: {
      en: "Gradual, structured exposure to feared thoughts and situations while resisting the compulsion. Paced to the person, agreed in writing, never rushed.",
      ar: "تعرّض تدريجي منظّم للأفكار والمواقف المخيفة مع مقاومة الطقس القهري. بإيقاع الشخص، ومتفق عليه كتابةً، وبلا استعجال.",
    },
  },
  {
    q: { en: "How long does treatment take?", ar: "كم تستغرق مدة العلاج؟" },
    a: {
      en: "Most people complete twelve to sixteen weekly sessions, followed by monthly maintenance check-ins for six months.",
      ar: "يكمل معظم الناس من ١٢ إلى ١٦ جلسة أسبوعية، تتبعها متابعة شهرية لمدة ستة أشهر.",
    },
  },
  {
    q: { en: "Can I be seen online?", ar: "هل يمكن أن تكون الجلسة أونلاين؟" },
    a: {
      en: "Yes. ERP works well over video, and many people prefer doing exposures in the environment where the ritual actually happens — their own home.",
      ar: "نعم. ينجح ERP عبر الفيديو، ويفضّل كثيرون تنفيذ التعرض في البيئة التي يحدث فيها الطقس فعلاً — منزلهم.",
    },
  },
  {
    q: { en: "Do I need a referral?", ar: "هل أحتاج إلى تحويل طبي؟" },
    a: {
      en: "No. Write to us directly; we reply within one working day and offer a free fifteen-minute call before anything is booked.",
      ar: "لا. اكتب لنا مباشرة؛ نرد خلال يوم عمل واحد ونوفّر مكالمة مجانية مدتها ١٥ دقيقة قبل أي حجز.",
    },
  },
  {
    q: { en: "Is my care confidential?", ar: "هل رعايتي سرية؟" },
    a: {
      en: "Entirely, within the limits of the law. Nothing is shared with employers, insurers or family without your written consent.",
      ar: "سرية تماماً، ضمن حدود القانون. لا يُشارك أي شيء مع جهة العمل أو التأمين أو العائلة دون موافقتك الخطية.",
    },
  },
];
