"use client";

import { useEffect, useRef } from "react";

export function LiquidGlass() {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = shapeRef.current;
    if (!node) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const place = () => {
      if (media.matches) {
        node.style.transform = "translate3d(-50%, 0, 0)";
        return;
      }
      const travel = Math.min(window.scrollY / 6, 72);
      node.style.transform = `translate3d(calc(-50% + ${travel * 0.35}px), ${travel}px, 0)`;
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
  }, []);

  return (
    <div
      ref={shapeRef}
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 -z-0 h-56 w-56 -translate-x-1/2 sm:h-80 sm:w-[32rem]"
    >
      <div className="liquid-glass h-full w-full" />
    </div>
  );
}
