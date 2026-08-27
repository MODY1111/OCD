import type { ReactNode } from "react";

export function Mark({ fill = "#321C04", size = 40 }: { fill?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
        fill={fill}
      />
    </svg>
  );
}

export function Divider({ tone = "#D9C4AA" }: { tone?: string }) {
  return (
    <div className="flex w-full items-center">
      <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
      <span className="w-[2px]" />
      <span className="h-[2px] flex-1" style={{ background: tone }} />
      <span className="w-[2px]" />
      <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
    </div>
  );
}

/** Cream page header used by every inner page. */
export function PageHead({
  title,
  sub,
  children,
}: {
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative z-10 bg-[#F6E4CF] px-5 pt-28 pb-12 md:px-6 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <Mark />
        <h1 className="mt-6 max-w-3xl text-[2rem] leading-[1.1] font-normal text-[#321C04] sm:text-4xl md:mt-8 md:text-5xl lg:text-[56px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#321C04]/70 md:mt-6 md:text-base">
            {sub}
          </p>
        )}
        {children}
        <div className="mt-10 md:mt-12">
          <Divider />
        </div>
      </div>
    </header>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return (
    <em
      className="not-italic"
      style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
    >
      {children}
    </em>
  );
}
