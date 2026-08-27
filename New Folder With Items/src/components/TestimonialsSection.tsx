import { useEffect, useRef, useState } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";
import { voices } from "../data";

export default function TestimonialsSection() {
  const { t, lang, rtl } = useI18n();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setRevealed(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % voices.length), 7000);
    return () => clearInterval(id);
  }, []);

  const move = (dir: number) => setIndex((v) => (v + dir + voices.length) % voices.length);

  return (
    <section id="voices" className="relative px-5 py-16 md:px-10 md:py-32 lg:px-16">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl rounded-3xl bg-black/20 p-5 backdrop-blur-sm transition-all duration-700 ease-out md:p-14 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <Quote size={36} className="text-white/40" />
            <p className="mt-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
              {t("voices.title")}
            </p>
          </div>
          <p className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            0{index + 1} / 0{voices.length}
          </p>
        </div>

        <div className="relative mt-8 min-h-[260px] sm:min-h-[230px] md:mt-10 md:min-h-[250px]">
          {voices.map((v, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-out ${
                i === index
                  ? "relative translate-y-0 opacity-100"
                  : "pointer-events-none absolute inset-0 translate-y-4 opacity-0"
              }`}
            >
              <p className="text-xl leading-[1.3] font-normal text-white sm:text-3xl sm:leading-[1.25] md:text-4xl lg:text-[42px]">
                {v.quote[lang]}
              </p>
              <p className="mt-6 text-[11px] font-semibold tracking-widest text-white/50 uppercase md:mt-8 md:text-xs">
                {v.name[lang]} — {v.role[lang]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {voices.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Voice ${i + 1}`}
                className={`h-[3px] cursor-pointer rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-white" : "w-5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => move(rtl ? 1 : -1)}
              aria-label="Previous"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => move(rtl ? -1 : 1)}
              aria-label="Next"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
