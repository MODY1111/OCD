import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter } from "../router";
import { clinics, doctors } from "../data";
import { Divider } from "./ui";

export default function TeamSection({ full = false }: { full?: boolean }) {
  const { t, lang } = useI18n();
  const { go } = useRouter();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="team" className="relative z-10 bg-[#F6E4CF] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        {!full && (
          <>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-xl text-2xl leading-[1.2] font-normal text-[#321C04] sm:text-3xl md:text-4xl lg:text-[46px]">
                {t("team.title")}
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-[#321C04]/70">{t("team.sub")}</p>
            </div>
            <div className="mt-12">
              <Divider />
            </div>
          </>
        )}

        <div
          className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 ${
            full ? "" : "mt-10 md:mt-14"
          }`}
        >
          {doctors.map((d, i) => {
            const clinic = clinics.find((c) => c.id === d.clinic);
            return (
              <div
                key={d.id}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#D9C4AA]">
                  <img
                    src={d.image}
                    alt={d.name[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-[#FFF9F2] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#321C04] uppercase sm:top-4 sm:start-4 sm:px-3 sm:text-[11px]">
                    {clinic?.city[lang]}
                  </span>
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#321C04]/95 to-transparent p-5 transition-opacity duration-500 ${
                      hover === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-xs leading-relaxed font-medium text-[#FFF9F2]">
                      {d.bio[lang]}
                    </p>
                  </div>
                </div>

                <h3 className="mt-4 text-[15px] leading-snug font-medium text-[#321C04] sm:mt-5 sm:text-lg">
                  {d.name[lang]}
                </h3>
                <p className="mt-1 text-[10px] leading-relaxed font-semibold tracking-widest text-[#321C04]/55 uppercase sm:text-xs">
                  {d.role[lang]}
                </p>
                {full && (
                  <button
                    onClick={() => go("book")}
                    className="mt-4 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#D9C4AA] px-4 py-2 text-xs font-semibold tracking-wide text-[#321C04] uppercase transition-colors hover:bg-[#CEBA9E]"
                  >
                    {t("team.book")}
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {!full && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => go("team")}
              className="flex cursor-pointer items-center gap-3 rounded-full bg-[#321C04] py-2 pr-6 pl-2 text-[#FFF9F2] transition-colors hover:bg-[#1F1003]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <ArrowUpRight size={16} className="text-[#321C04]" />
              </span>
              <span className="text-sm font-medium tracking-wide uppercase">{t("team.cta")}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
