"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "cn";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
};

export function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) {
      return;
    }

    node.removeAttribute("data-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      node.setAttribute("data-reveal", "visible");
      return;
    }

    node.setAttribute("data-reveal", "pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        node.setAttribute("data-reveal", "visible");
        observer.disconnect();
        observerRef.current = null;
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return (
    <div ref={setRef} className={cn("home-scroll-reveal", className)}>
      {children}
    </div>
  );
}
