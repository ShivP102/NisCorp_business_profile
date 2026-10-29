"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceLinks } from "@/components/service-nav-links";

const pageLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const linkClass =
  "block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const servicesMenuId = useId();
  const mobilePanelId = useId();

  useEffect(() => {
    if (!mobileOpen && !servicesOpen) {
      return;
    }

    const closeIfOutside = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) {
        return;
      }
      const target = event.target;
      if (target instanceof Node && root.contains(target)) {
        return;
      }
      setMobileOpen(false);
      setServicesOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeIfOutside, true);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen, servicesOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <div ref={rootRef} className="relative flex items-center">
      <nav aria-label="Main" className="hidden shrink-0 md:block">
        <ul className="flex flex-nowrap items-center gap-x-1">
          <li className="relative">
            <DesktopServicesMenu
              open={servicesOpen}
              setOpen={setServicesOpen}
              menuId={servicesMenuId}
            />
          </li>
          {pageLinks.map((item) => (
            <li key={item.href}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-foreground/5 hover:text-accent"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        aria-expanded={mobileOpen}
        aria-controls={mobilePanelId}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((value) => !value)}
      >
        {mobileOpen ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </Button>

      {mobileOpen ? (
        <div
          id={mobilePanelId}
          className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,16rem)] rounded-md border border-border bg-surface p-2 shadow-lg md:hidden"
        >
          <ul className="flex flex-col gap-0.5">
            <li>
              <button
                type="button"
                className={`${linkClass} flex w-full items-center justify-between`}
                aria-expanded={servicesOpen}
                aria-controls={`${servicesMenuId}-mobile`}
                onClick={() => setServicesOpen((value) => !value)}
              >
                Services
              </button>
              {servicesOpen ? (
                <ul
                  id={`${servicesMenuId}-mobile`}
                  className="mb-1 ml-2 border-l border-border pl-2"
                >
                  {serviceLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={linkClass}
                        onClick={closeMobile}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            {pageLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass}
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type DesktopServicesMenuProps = {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  menuId: string;
};

function DesktopServicesMenu({
  open,
  setOpen,
  menuId,
}: DesktopServicesMenuProps) {
  const triggerClass =
    "flex h-8 cursor-pointer items-center rounded-md border-0 bg-transparent px-3 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <>
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        Services
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-md border border-border bg-surface p-2 shadow-lg"
        >
          {serviceLinks.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
