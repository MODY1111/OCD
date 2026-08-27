import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useRouter } from "../router";
import AutoVideo from "./AutoVideo";

const BG_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85";

const videos = [
  "https://videos.pexels.com/video-files/16478021/16478021-uhd_3840_2160_24fps.mp4",
  "https://videos.pexels.com/video-files/9647121/9647121-uhd_3840_2160_24fps.mp4",
  "https://videos.pexels.com/video-files/11878518/11878518-hd_1920_1080_30fps.mp4",
];

const posters = [
  "https://images.pexels.com/videos/16478021/4k-abstract-background-black-and-blue-16478021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  "https://images.pexels.com/videos/9647121/pexels-photo-9647121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  "https://images.pexels.com/videos/11878518/pexels-photo-11878518.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
];

function CardLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none">
      <path
        d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
        fill="rgba(255,255,255,0.8)"
      />
    </svg>
  );
}

export function FeaturesBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
      aria-hidden="true"
    />
  );
}

export default function FeaturesSection() {
  const { t } = useI18n();
  const { go } = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            if (Number.isFinite(i)) setActiveIndex(i);
          }
        });
      },
      { threshold: 0.6 }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setRevealed((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => {
      if (!el) return;
      activeObserver.observe(el);
      revealObserver.observe(el);
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <section id="features" className="relative px-5 py-16 md:px-10 md:py-40 lg:px-16 lg:py-48">
      <FeaturesBackground />

      <div className="grid gap-10 md:gap-16 lg:grid-cols-[400px_1fr] lg:gap-24 xl:grid-cols-[460px_1fr] xl:gap-48">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-32">
          <h2 className="text-[1.7rem] leading-[1.15] font-normal text-white sm:text-3xl lg:text-[46px]">
            {t("features.title")}
          </h2>

          <div className="hidden flex-col gap-2 lg:flex">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() =>
                  cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className={`cursor-pointer rounded-xl bg-black/20 px-5 py-4 text-start text-sm font-medium transition-colors ${
                  activeIndex === i ? "text-white" : "text-white/40"
                }`}
              >
                {t(`features.${i + 1}.title`)}
              </button>
            ))}
          </div>

          <div className="hidden items-center rounded-xl bg-black/25 py-1 pr-1 pl-6 backdrop-blur-md lg:flex">
            <p className="text-sm font-medium text-white">{t("features.bar")}</p>
            <button
              onClick={() => go("book")}
              className="ms-4 shrink-0 cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              {t("features.cta")}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-16">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-index={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`flex flex-col gap-5 rounded-3xl bg-black/20 p-5 backdrop-blur-sm transition-all duration-700 ease-out md:gap-6 md:p-10 ${
                revealed[i] ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0 md:translate-x-16"
              }`}
            >
              <CardLogo />
              <h3 className="text-lg font-medium text-white md:text-2xl">
                {t(`features.${i + 1}.title`)}
              </h3>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black/30">
                <AutoVideo
                  src={videos[i]}
                  poster={posters[i]}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm leading-relaxed font-medium text-white/60 md:text-base">
                {t(`features.${i + 1}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
