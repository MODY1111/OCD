import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Only play while on screen (saves battery on mobile). */
  lazy?: boolean;
};

/**
 * Autoplay video that actually works on iOS / Android.
 *
 * iOS Safari refuses autoplay unless the element is *literally* muted +
 * playsInline before the first load, and it silently rejects play() when
 * Low Power Mode is on. So we:
 *   1. set muted/playsinline imperatively (React sometimes writes them late)
 *   2. call play() on loadeddata, on visibility change and on first touch
 *   3. fall back to a tap-to-play poster if the promise keeps rejecting
 */
export default function AutoVideo({ src, poster, className = "", lazy = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // 1 — hard-set the attributes iOS looks for.
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    let cancelled = false;

    const attempt = () => {
      if (cancelled || !v) return;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => !cancelled && setBlocked(false)).catch(() => {
          if (!cancelled) setBlocked(true);
        });
      }
    };

    // 2 — try at every point the browser might allow it.
    attempt();
    v.addEventListener("loadeddata", attempt);
    v.addEventListener("canplay", attempt);

    const onVisible = () => document.visibilityState === "visible" && attempt();
    document.addEventListener("visibilitychange", onVisible);

    // 3 — first user gesture anywhere unlocks media on iOS.
    const unlock = () => {
      attempt();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });

    // 4 — pause off-screen, resume on-screen.
    let obs: IntersectionObserver | undefined;
    if (lazy) {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) attempt();
          else v.pause();
        },
        { threshold: 0.15 }
      );
      obs.observe(v);
    }

    return () => {
      cancelled = true;
      v.removeEventListener("loadeddata", attempt);
      v.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
      obs?.disconnect();
    };
  }, [src, lazy]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={
          typeof window !== "undefined" && window.innerWidth < 768 ? "metadata" : "auto"
        }
        disablePictureInPicture
        controls={false}
        tabIndex={-1}
        aria-hidden="true"
      />

      {blocked && (
        <button
          onClick={() => {
            ref.current?.play().then(
              () => setBlocked(false),
              () => {}
            );
          }}
          aria-label="Play video"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
            <Play size={20} className="ms-0.5" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
