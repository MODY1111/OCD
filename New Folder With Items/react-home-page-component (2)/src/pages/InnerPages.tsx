import { useState } from "react";
import { MapPin, Clock, Video, Building2, Plus, ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter } from "../router";
import { clinics, faqs, voices } from "../data";
import { PageHead, Serif } from "../components/ui";
import FeaturesSection from "../components/FeaturesSection";
import TeamSection from "../components/TeamSection";

/* ————————————————— CARE ————————————————— */
export function CarePage() {
  const { t } = useI18n();
  return (
    <>
      <PageHead title={t("features.title")} sub={t("about.lead")} />
      <FeaturesSection />
    </>
  );
}

/* ————————————————— TEAM ————————————————— */
export function TeamPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHead title={t("team.title")} sub={t("team.sub")} />
      <TeamSection full />
    </>
  );
}

/* ————————————————— VOICES ————————————————— */
export function VoicesPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHead title={t("voices.title")} sub={t("voices.sub")} />
      <section className="relative z-10 bg-[#F6E4CF] px-5 pb-20 md:px-6 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 md:gap-6">
          {voices.map((v, i) => (
            <article
              key={i}
              className="flex flex-col justify-between rounded-3xl bg-[#FFF9F2] p-6 md:p-9"
            >
              <p className="text-lg leading-[1.4] font-normal text-[#321C04] md:text-2xl md:leading-[1.35]">
                “{v.quote[lang]}”
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9C4AA] text-xs font-semibold text-[#321C04]">
                  {v.name[lang].slice(0, 1)}
                </span>
                <p className="text-xs font-semibold tracking-widest text-[#321C04]/55 uppercase">
                  {v.name[lang]} — {v.role[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/* ————————————————— CLINICS ————————————————— */
export function ClinicsPage() {
  const { t, lang } = useI18n();
  const { go } = useRouter();

  return (
    <>
      <PageHead title={t("clinics.title")} sub={t("clinics.sub")}>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#321C04] px-4 py-2 text-xs font-semibold tracking-wide text-[#FFF9F2] uppercase">
            <Building2 size={14} /> {t("clinics.inperson")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D9C4AA] px-4 py-2 text-xs font-semibold tracking-wide text-[#321C04] uppercase">
            <Video size={14} /> {t("clinics.online")}
          </span>
        </div>
      </PageHead>

      <section className="relative z-10 bg-[#F6E4CF] px-5 pb-20 md:px-6 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-6">
          {clinics.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-3xl bg-[#FFF9F2]">
              <img src={c.image} alt={c.city[lang]} className="h-36 w-full object-cover md:h-44" />
              <div className="p-6">
                <h2 className="text-xl font-medium text-[#321C04]">{c.city[lang]}</h2>
                <p className="mt-1 text-xs font-semibold tracking-widest text-[#321C04]/50 uppercase">
                  {c.country[lang]}
                </p>

                <div className="mt-5 flex flex-col gap-3 text-sm text-[#321C04]/75">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    {c.address[lang]}
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock size={15} className="mt-0.5 shrink-0" />
                    {c.hours[lang]}
                  </p>
                </div>

                <button
                  onClick={() => go("book")}
                  className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#321C04] px-5 py-3 text-xs font-semibold tracking-wide text-[#FFF9F2] uppercase transition-colors hover:bg-[#1F1003]"
                >
                  {t("nav.book")}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/* ————————————————— FAQ ————————————————— */
export function FaqPage() {
  const { t, lang } = useI18n();
  const { go } = useRouter();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHead title={t("faq.title")} sub={t("faq.sub")} />
      <section className="relative z-10 bg-[#F6E4CF] px-5 pb-20 md:px-6 md:pb-24">
        <div className="mx-auto max-w-4xl">
          {faqs.map((f, i) => (
            <div key={i} className="border-t border-[#D9C4AA] last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center gap-5 py-6 text-start"
              >
                <span className="text-[11px] font-semibold tracking-widest text-[#321C04]/40 md:text-xs">
                  0{i + 1}
                </span>
                <span className="flex-1 text-[15px] leading-snug font-medium text-[#321C04] md:text-xl">
                  {f.q[lang]}
                </span>
                <Plus
                  size={19}
                  className={`shrink-0 text-[#321C04] transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-[#321C04]/70 md:ps-11 md:text-base">
                    {f.a[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-[#321C04] px-6 py-12 text-center">
            <p className="max-w-md text-2xl font-normal text-[#FFF9F2] md:text-3xl">
              {t("hero.line1")} <Serif>{t("hero.line2b")}</Serif>
            </p>
            <button
              onClick={() => go("book")}
              className="cursor-pointer rounded-full bg-[#FFF9F2] px-7 py-3 text-xs font-semibold tracking-wide text-[#321C04] uppercase transition-colors hover:bg-white"
            >
              {t("nav.book")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
