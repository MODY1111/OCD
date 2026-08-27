import { Mail, Plus } from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter } from "../router";
import { Divider, Mark } from "./ui";

export default function AboutSection() {
  const { t } = useI18n();
  const { go } = useRouter();

  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden rounded-t-[25px] bg-[#F6E4CF] px-5 py-16 md:px-6 md:py-32"
    >
      {/* frosted light catching the top edge, like the navbar glass */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/55 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 md:gap-10">
        <p className="max-w-lg text-center text-[15px] leading-relaxed text-[#321C04] md:text-lg">
          {t("about.lead")}
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <button
            onClick={() => go("faq")}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-[#321C04] py-2 pe-6 ps-2 text-[#FFF9F2] shadow-[0_10px_30px_rgba(50,28,4,0.28)] transition-colors hover:bg-[#1F1003]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <Mail size={16} className="text-[#321C04]" />
            </span>
            <span className="text-sm font-medium tracking-wide uppercase">{t("about.hello")}</span>
          </button>

          {/* glass secondary */}
          <button
            onClick={() => go("clinics")}
            className="flex cursor-pointer items-center gap-3 rounded-full border border-white/60 bg-white/25 py-2 pe-6 ps-2 text-[#321C04] shadow-[0_10px_30px_rgba(50,28,4,0.12),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white/40"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
              <Plus size={16} className="text-[#321C04]" />
            </span>
            <span className="text-sm font-medium tracking-wide uppercase">
              {t("about.informed")}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-14 md:mt-28">
        <Divider />
      </div>

      <div className="relative mx-auto mt-12 flex max-w-6xl flex-col gap-8 md:mt-20 md:flex-row md:gap-20">
        <div className="flex shrink-0 flex-col gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-white/30 shadow-[0_10px_30px_rgba(50,28,4,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
            <Mark size={34} />
          </span>
          <p className="text-xs leading-relaxed font-semibold tracking-widest whitespace-pre-line text-[#321C04] uppercase">
            {t("about.tag")}
          </p>
        </div>

        <p className="text-xl leading-[1.35] font-normal text-[#321C04] sm:text-3xl sm:leading-[1.3] md:text-4xl lg:text-[42px]">
          {t("about.body")}
        </p>
      </div>
    </section>
  );
}
