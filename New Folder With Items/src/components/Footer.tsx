import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter, type Route } from "../router";
import { Mark } from "./ui";

const links: { key: string; route: Route }[] = [
  { key: "nav.care", route: "care" },
  { key: "nav.team", route: "team" },
  { key: "nav.clinics", route: "clinics" },
  { key: "nav.faq", route: "faq" },
];

export default function Footer() {
  const { t } = useI18n();
  const { go } = useRouter();

  return (
    <footer className="relative z-10 rounded-t-[25px] bg-[#321C04] px-5 py-7 md:px-6 md:py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:gap-6">
        {/* Row 1 — brand + links + CTA */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-5">
          <div className="flex items-center gap-3">
            <Mark fill="#F6E4CF" size={26} />
            <span className="text-base font-bold tracking-tight text-[#FFF9F2]">{t("brand")}</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.route}
                onClick={() => go(l.route)}
                className="cursor-pointer text-sm font-medium text-[#F6E4CF]/70 transition-colors hover:text-[#FFF9F2]"
              >
                {t(l.key)}
              </button>
            ))}
          </nav>

          <button
            onClick={() => go("book")}
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FFF9F2] py-2.5 pe-4 ps-5 text-xs font-semibold tracking-wide text-[#321C04] uppercase transition-colors hover:bg-white md:w-auto md:py-2"
          >
            {t("nav.book")}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Row 2 — hairline + meta */}
        <div className="flex flex-col gap-3 border-t border-[#F6E4CF]/15 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-[#F6E4CF]/45">{t("footer.tag")}</p>
          <p className="text-[11px] font-semibold tracking-widest text-[#F6E4CF]/45 uppercase">
            © {new Date().getFullYear()} · {t("footer.calm")}
          </p>
        </div>
      </div>
    </footer>
  );
}
