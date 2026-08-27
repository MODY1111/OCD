import { useState } from "react";
import { Globe, ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter, type Route } from "../router";

const items: { key: string; route: Route }[] = [
  { key: "nav.home", route: "home" },
  { key: "nav.care", route: "care" },
  { key: "nav.team", route: "team" },
  { key: "nav.voices", route: "voices" },
  { key: "nav.clinics", route: "clinics" },
  { key: "nav.faq", route: "faq" },
];

export default function Navbar({
  dark = false,
  overlay = false,
}: {
  dark?: boolean;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();
  const { go, route } = useRouter();

  return (
    <div className="absolute top-4 left-1/2 z-50 w-[min(94vw,560px)] -translate-x-1/2 md:top-6">
      {/* ————— bar: bare on mobile, pill from md up ————— */}
      <div
        className={`flex items-center justify-between gap-2 rounded-full py-0 md:gap-4 md:border md:py-3 md:pe-3 md:ps-6 md:backdrop-blur-xl md:backdrop-saturate-150 ${
          dark
            ? "md:border-[#FFF9F2]/15 md:bg-[#321C04]/45 md:shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,249,242,0.18)]"
            : overlay
              ? "md:border-white/30 md:bg-white/15 md:shadow-[0_10px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.45)]"
              : "md:border-[#321C04]/10 md:bg-[#FFF9F2]/55 md:shadow-[0_10px_40px_rgba(50,28,4,0.14),inset_0_1px_0_rgba(255,255,255,0.7)]"
        }`}
      >
        <button
          onClick={() => go("home")}
          className={`cursor-pointer text-lg font-bold tracking-tight ${
            dark
              ? "text-[#FFF9F2]"
              : overlay
                ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:drop-shadow-none"
                : "text-[#321C04]"
          }`}
        >
          {t("brand")}
        </button>

        <div className="flex items-center gap-2">
          {/* language — desktop only */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`hidden cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors md:flex ${
              dark
                ? "border-[#FFF9F2]/15 bg-[#FFF9F2]/10 text-[#FFF9F2] hover:bg-[#FFF9F2]/20"
                : overlay
                  ? "border-white/30 bg-white/15 text-white hover:bg-white/25"
                  : "border-[#321C04]/10 bg-[#321C04]/5 text-[#321C04] hover:bg-[#321C04]/10"
            }`}
          >
            <Globe size={14} />
            {lang === "en" ? "AR" : "EN"}
          </button>

          {/* book — desktop only */}
          <button
            onClick={() => go("book")}
            className={`hidden cursor-pointer rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide uppercase shadow-[0_6px_20px_rgba(50,28,4,0.25)] transition-colors md:block ${
              dark
                ? "bg-[#FFF9F2] text-[#321C04] hover:bg-white"
                : "bg-[#321C04] text-[#FFF9F2] hover:bg-[#1F1003]"
            }`}
          >
            {t("nav.book")}
          </button>

          {/* hamburger — own circle on mobile, bare inside the pill on desktop */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-colors md:h-9 md:w-9 md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none ${
              dark
                ? "border-[#FFF9F2]/15 bg-[#321C04]/40 shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,249,242,0.18)]"
                : overlay
                  ? "border-white/30 bg-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  : "border-[#321C04]/10 bg-[#FFF9F2]/50 shadow-[0_8px_32px_rgba(50,28,4,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]"
            }`}
          >
            <span
              className={`block h-[2px] w-5 transition-transform duration-300 ${
                dark ? "bg-[#FFF9F2]" : overlay ? "bg-white" : "bg-[#321C04]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)",
                transform: open ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className={`block h-[2px] w-5 transition-transform duration-300 ${
                dark ? "bg-[#FFF9F2]" : overlay ? "bg-white" : "bg-[#321C04]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)",
                transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* ————— dropdown ————— */}
      <div
        className={`mt-3 origin-top rounded-2xl border p-2 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 md:mt-2 ${
          dark
            ? "border-[#FFF9F2]/15 bg-[#321C04]/70 shadow-[0_16px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,249,242,0.15)]"
            : "border-white/40 bg-white/70 shadow-[0_16px_48px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)]"
        } ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)" }}
      >
        {items.map((it) => (
          <button
            key={it.route}
            onClick={() => {
              go(it.route);
              setOpen(false);
            }}
            className={`block w-full cursor-pointer rounded-xl px-6 py-3 text-start text-sm font-medium transition-colors ${
              dark
                ? `hover:bg-[#FFF9F2]/10 ${
                    route === it.route ? "text-[#FFF9F2]" : "text-[#FFF9F2]/55"
                  }`
                : `hover:bg-black/5 ${route === it.route ? "text-black" : "text-black/55"}`
            }`}
          >
            {t(it.key)}
          </button>
        ))}

        {/* mobile-only actions moved out of the pill */}
        <div className="mt-2 flex flex-col gap-2 border-t border-black/10 pt-2 md:hidden">
          <button
            onClick={() => {
              setLang(lang === "en" ? "ar" : "en");
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-black/5 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/10"
          >
            <span className="flex items-center gap-2">
              <Globe size={15} />
              {lang === "en" ? "العربية" : "English"}
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase opacity-55">
              {lang === "en" ? "AR" : "EN"}
            </span>
          </button>

          <button
            onClick={() => {
              go("book");
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-[#321C04] px-6 py-3.5 text-sm font-medium text-[#FFF9F2]"
          >
            {t("nav.book")}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
