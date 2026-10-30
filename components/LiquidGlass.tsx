"use client";

import { useEffect, useRef } from "react";

type LiquidGlassProps = {
  variant?: "hero" | "title";
};

export function LiquidGlass({ variant = "hero" }: LiquidGlassProps) {
  const primaryRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "hero") {
      return;
    }

    const primary = primaryRef.current;
    const ambient = ambientRef.current;
    if (!primary || !ambient) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const place = () => {
      if (media.matches) {
        primary.style.transform = "translate3d(-50%, 0, 0)";
        ambient.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const travel = Math.min(window.scrollY / 6, 72);
      primary.style.transform = `translate3d(calc(-50% + ${travel * 0.35}px), ${travel}px, 0)`;
      ambient.style.transform = `translate3d(${travel * -0.2}px, ${travel * 0.55}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", place);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", place);
    };
  }, [variant]);

  if (variant === "title") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 z-0 h-28 w-40 sm:h-36 sm:w-56"
      >
        <div className="liquid-glass liquid-glass-still h-full w-full" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <div
        ref={ambientRef}
        className="absolute top-2 right-0 h-36 w-36 sm:top-4 sm:right-4 sm:h-44 sm:w-44 md:h-52 md:w-52"
      >
        <div className="liquid-glass-ambient h-full w-full" />
      </div>
      <div
        ref={primaryRef}
        className="absolute bottom-6 left-1/2 h-56 w-56 -translate-x-1/2 sm:h-80 sm:w-[32rem]"
      >
        <div className="liquid-glass h-full w-full" />
      </div>
    </div>
  );
}
