import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  brand: "Aurelia.",
  "nav.home": "Home",
  "nav.care": "Care",
  "nav.team": "Team",
  "nav.voices": "Voices",
  "nav.clinics": "Clinics",
  "nav.faq": "FAQ",
  "nav.book": "Book a session",

  "hero.line1": "Own your calm",
  "hero.line2a": "without",
  "hero.line2b": "the rush",
  "hero.sub":
    "A specialist OCD and anxiety practice in Dubai and Doha — assessment, ERP, and an hour that belongs to you",
  "hero.bar": "No clipboards. No five-minute history. Just the next agreed step.",
  "hero.barMobile": "No clipboards. Just the next step.",
  "hero.cta": "Book a session",

  "about.lead":
    "We craft care that moves with your rhythm, not over it. Designed for ease, presence, and flow.",
  "about.hello": "Say hello",
  "about.informed": "Stay informed",
  "about.tag": "Calm /\nAmplified",
  "about.body":
    "We assess, we build a hierarchy, and we sit with you while you decline the ritual. But, most importantly, we help you remember what an unhurried hour feels like when a clinic moves with you, not over you. We carry the structure, so you can attend to what truly counts.",

  "features.title": "Care that flows with your mind, not over it",
  "features.bar": "No noise. No complicated systems. Just the next agreed step.",
  "features.cta": "Book a session",
  "features.1.title": "Built for ease, not urgency",
  "features.1.desc":
    "Nothing is sprung on you. Every exposure is written down and agreed before it is attempted, so the only surprise is how manageable step three turns out to be.",
  "features.2.title": "The gentlest way to start",
  "features.2.desc":
    "A first hour is ninety minutes and a Y-BOCS, not a form and a prescription. We take the whole history before anything is named.",
  "features.3.title": "Deep, undivided focus",
  "features.3.desc":
    "Twelve to sixteen weekly sessions of Exposure and Response Prevention, then six months of monthly check-ins. Paced to you, never theatrical.",

  "voices.title": "In their words",
  "voices.sub": "Understated notes from people who finished a hierarchy.",

  "team.title": "The people who hold the quiet",
  "team.sub": "Clinicians across Dubai and Doha, and a shared refusal to rush a story.",
  "team.cta": "Meet the team",
  "team.book": "Book with this clinician",

  "clinics.title": "Two cities, one standard",
  "clinics.sub": "Attend in person, or meet us online from anywhere in the Gulf.",
  "clinics.inperson": "In clinic",
  "clinics.online": "Online",
  "clinics.hours": "Hours",
  "clinics.directions": "Get directions",

  "faq.title": "Questions, answered before you write",
  "faq.sub": "You do not need a diagnosis, or the right words for it.",

  "book.title": "Book a session",
  "book.sub": "Six short steps. Nothing is charged until the final step.",
  "book.step": "Step",
  "book.of": "of",
  "book.next": "Continue",
  "book.back": "Back",
  "book.s1": "Format",
  "book.s2": "Location",
  "book.s3": "Service",
  "book.s4": "Time",
  "book.s5": "Details",
  "book.s6": "Payment",
  "book.formatQ": "How would you like to meet?",
  "book.inperson": "In clinic",
  "book.inpersonDesc": "Attend one of our rooms in Dubai or Doha.",
  "book.online": "Online",
  "book.onlineDesc": "A private video room. Same hour, same clinician.",
  "book.locationQ": "Which clinic?",
  "book.onlineNote": "Online sessions are hosted by our Dubai team unless you choose otherwise.",
  "book.serviceQ": "What are we starting with?",
  "book.timeQ": "Pick a day and time",
  "book.detailsQ": "Who are we expecting?",
  "book.name": "Full name",
  "book.email": "Email",
  "book.phone": "Phone",
  "book.notes": "Anything you would like us to read first (optional)",
  "book.paymentQ": "Payment",
  "book.card": "Card",
  "book.applepay": "Apple Pay",
  "book.clinic": "Pay at the clinic",
  "book.cardNumber": "Card number",
  "book.expiry": "Expiry",
  "book.cvc": "CVC",
  "book.holder": "Name on card",
  "book.summary": "Summary",
  "book.total": "Total",
  "book.pay": "Confirm and pay",
  "book.payLater": "Confirm booking",
  "book.doneTitle": "You are booked.",
  "book.doneBody":
    "A confirmation is on its way. We will call before the appointment to answer anything you would rather ask by voice.",
  "book.doneRef": "Reference",
  "book.doneHome": "Back to home",
  "book.minutes": "min",
  "book.free": "Free",

  "footer.tag": "A quieter practice for OCD and anxiety. Dubai · Doha · Online.",
  "footer.rights": "All rights reserved.",
  "footer.calm": "Calm / Amplified",
};

const ar: Dict = {
  brand: ".أوريليا",
  "nav.home": "الرئيسية",
  "nav.care": "الرعاية",
  "nav.team": "الفريق",
  "nav.voices": "تجارب",
  "nav.clinics": "العيادات",
  "nav.faq": "أسئلة شائعة",
  "nav.book": "احجز جلسة",

  "hero.line1": "استعد هدوءك",
  "hero.line2a": "بدون",
  "hero.line2b": "استعجال",
  "hero.sub":
    "عيادة متخصصة في الوسواس القهري والقلق في دبي والدوحة — تقييم، وعلاج بالتعرض ومنع الاستجابة، وساعة كاملة تخصّك",
  "hero.bar": "بلا أوراق. بلا تاريخ مرضي في خمس دقائق. فقط الخطوة التالية المتفق عليها.",
  "hero.barMobile": "بلا أوراق. فقط الخطوة التالية.",
  "hero.cta": "احجز جلسة",

  "about.lead": "نصنع رعاية تسير مع إيقاعك، لا فوقه. مصمّمة للسهولة والحضور والانسياب.",
  "about.hello": "تواصل معنا",
  "about.informed": "تابع الجديد",
  "about.tag": "هدوء /\nمُضاعَف",
  "about.body":
    "نقيّم، ونبني معك تدرّجاً للتعرض، ونجلس بجانبك بينما ترفض أداء الطقس. والأهم أننا نساعدك على تذكّر شعور الساعة غير المستعجلة، حين تتحرك العيادة معك لا فوقك. نحن نحمل البنية والتنظيم، لتتفرّغ أنت لما يستحق.",

  "features.title": "رعاية تنساب مع عقلك، لا فوقه",
  "features.bar": "بلا ضجيج. بلا أنظمة معقدة. فقط الخطوة التالية.",
  "features.cta": "احجز جلسة",
  "features.1.title": "مصمّمة للراحة، لا للاستعجال",
  "features.1.desc":
    "لا شيء يُفاجئك. كل خطوة تعرّض تُكتب ويُتفق عليها قبل تنفيذها، فالمفاجأة الوحيدة هي كم كانت الخطوة الثالثة أسهل مما تخيلت.",
  "features.2.title": "أرفق طريقة للبداية",
  "features.2.desc":
    "الجلسة الأولى تسعون دقيقة ومقياس Y-BOCS، لا استمارة ووصفة. نأخذ القصة كاملة قبل أن نسمّي أي شيء.",
  "features.3.title": "تركيز عميق وغير مجزّأ",
  "features.3.desc":
    "من ١٢ إلى ١٦ جلسة أسبوعية للتعرض ومنع الاستجابة، ثم ستة أشهر من المتابعة الشهرية. بإيقاعك أنت، وبلا مبالغة.",

  "voices.title": "بكلماتهم",
  "voices.sub": "ملاحظات هادئة من أشخاص أنهوا تدرّجهم العلاجي.",

  "team.title": "من يحملون هذا الهدوء",
  "team.sub": "أطباء في دبي والدوحة، ورفض مشترك لاستعجال أي قصة.",
  "team.cta": "تعرّف على الفريق",
  "team.book": "احجز مع هذا الطبيب",

  "clinics.title": "مدينتان، ومعيار واحد",
  "clinics.sub": "احضر شخصياً، أو قابلنا أونلاين من أي مكان في الخليج.",
  "clinics.inperson": "في العيادة",
  "clinics.online": "أونلاين",
  "clinics.hours": "ساعات العمل",
  "clinics.directions": "الاتجاهات",

  "faq.title": "أسئلة، مُجابة قبل أن تكتب",
  "faq.sub": "لا تحتاج تشخيصاً، ولا الكلمات الصحيحة لوصفه.",

  "book.title": "احجز جلسة",
  "book.sub": "ست خطوات قصيرة. لا يُخصم أي مبلغ قبل الخطوة الأخيرة.",
  "book.step": "خطوة",
  "book.of": "من",
  "book.next": "متابعة",
  "book.back": "رجوع",
  "book.s1": "الصيغة",
  "book.s2": "المكان",
  "book.s3": "الخدمة",
  "book.s4": "الموعد",
  "book.s5": "بياناتك",
  "book.s6": "الدفع",
  "book.formatQ": "كيف تفضّل أن نلتقي؟",
  "book.inperson": "في العيادة",
  "book.inpersonDesc": "احضر إلى إحدى غرفنا في دبي أو الدوحة.",
  "book.online": "أونلاين",
  "book.onlineDesc": "غرفة فيديو خاصة. نفس الساعة، ونفس الطبيب.",
  "book.locationQ": "أي عيادة؟",
  "book.onlineNote": "الجلسات الأونلاين يديرها فريق دبي ما لم تختر غير ذلك.",
  "book.serviceQ": "بماذا نبدأ؟",
  "book.timeQ": "اختر اليوم والوقت",
  "book.detailsQ": "من سنستقبل؟",
  "book.name": "الاسم الكامل",
  "book.email": "البريد الإلكتروني",
  "book.phone": "رقم الهاتف",
  "book.notes": "أي شيء تودّ أن نقرأه أولاً (اختياري)",
  "book.paymentQ": "الدفع",
  "book.card": "بطاقة",
  "book.applepay": "Apple Pay",
  "book.clinic": "الدفع في العيادة",
  "book.cardNumber": "رقم البطاقة",
  "book.expiry": "الانتهاء",
  "book.cvc": "CVC",
  "book.holder": "الاسم على البطاقة",
  "book.summary": "الملخص",
  "book.total": "الإجمالي",
  "book.pay": "تأكيد ودفع",
  "book.payLater": "تأكيد الحجز",
  "book.doneTitle": "تم حجز موعدك.",
  "book.doneBody":
    "التأكيد في طريقه إليك. سنتصل بك قبل الموعد للإجابة عن أي شيء تفضّل سؤاله صوتياً.",
  "book.doneRef": "الرقم المرجعي",
  "book.doneHome": "العودة للرئيسية",
  "book.minutes": "دقيقة",
  "book.free": "مجاناً",

  "footer.tag": "عيادة أهدأ للوسواس القهري والقلق. دبي · الدوحة · أونلاين.",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.calm": "هدوء / مُضاعَف",
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; rtl: boolean };

const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k, rtl: false });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const rtl = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const t = (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k;

  return <I18nCtx.Provider value={{ lang, setLang, t, rtl }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
