import { useI18n } from "../i18n";
import { useRouter } from "../router";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import TeamSection from "../components/TeamSection";
import AutoVideo from "../components/AutoVideo";
import { Serif } from "../components/ui";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4";

const HERO_POSTER = "/images/hero-cosmos.jpg";

export default function HomePage() {
  const { t } = useI18n();
  const { go } = useRouter();

  return (
    <>
      <section className="relative mb-[-25px] h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <AutoVideo
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            lazy={false}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-6 md:pb-16">
          <h1 className="text-center text-[2.6rem] leading-[1.05] font-normal tracking-tight text-white [text-wrap:balance] sm:text-6xl md:text-8xl lg:text-[96px]">
            {t("hero.line1")}
            <br />
            {t("hero.line2a")} <Serif>{t("hero.line2b")}</Serif>
          </h1>

          <p className="mx-auto mt-5 max-w-[440px] text-center text-[13px] leading-relaxed font-medium text-white/80 md:mt-6 md:text-base">
            {t("hero.sub")}
          </p>

          {/* stacks on phones, single pill from sm up */}
          <div className="mx-auto mt-6 flex w-full max-w-[420px] flex-col gap-2 rounded-2xl bg-black/25 p-2 backdrop-blur-md sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:py-1 sm:pe-1 sm:ps-6">
            <p className="hidden text-sm font-medium text-white sm:block">{t("hero.bar")}</p>
            <p className="px-2 pt-1 text-center text-[13px] leading-snug font-medium text-white sm:hidden">
              {t("hero.barMobile")}
            </p>
            <button
              onClick={() => go("book")}
              className="w-full shrink-0 cursor-pointer rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:ms-4 sm:w-auto sm:py-2.5"
            >
              {t("hero.cta")}
            </button>
          </div>
        </div>
      </section>

      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <TeamSection />
    </>
  );
}
