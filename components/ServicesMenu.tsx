"use client";

import Link from "next/link";
import { useEffect } from "react";

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/services/ai-llm", label: "AI & LLM" },
  { href: "/services/websites", label: "Websites & SEO" },
] as const;

const summaryClass =
  "flex h-8 cursor-pointer list-none items-center rounded-md border-0 bg-transparent px-3 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [anchor-name:--services-trigger]";

export function ServicesMenu() {
  useEffect(() => {
    const menu = document.getElementById("services-menu");
    const button = document.querySelector("[popovertarget='services-menu']");
    if (!(menu instanceof HTMLElement)) return;

    const closeIfOutside = (event: PointerEvent) => {
      if (!menu.matches(":popover-open")) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menu.contains(target) || button?.contains(target)) return;
      menu.hidePopover();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.matches(":popover-open")) {
        menu.hidePopover();
      }
    };

    document.addEventListener("pointerdown", closeIfOutside, true);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        popoverTarget="services-menu"
        className={summaryClass}
      >
        Services
      </button>
      <ul
        id="services-menu"
        popover="auto"
        className="m-0 min-w-48 rounded-md border border-border bg-surface p-2 shadow-lg"
        style={{
          positionAnchor: "--services-trigger",
          inset: "auto",
          top: "anchor(bottom)",
          right: "anchor(right)",
          marginTop: "0.5rem",
        }}
      >
        {serviceLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={(event) => {
                const menu = event.currentTarget.closest("[popover]");
                if (menu instanceof HTMLElement) {
                  menu.hidePopover();
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
