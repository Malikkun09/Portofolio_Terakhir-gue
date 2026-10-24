"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contact, nav, site } from "@/lib/site";
import { cn } from "cn";
import { Menu } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-black/92"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="site-shell flex h-14 items-center justify-between">
        <a
          href="#top"
          className="font-heading text-sm font-semibold tracking-[0.24em]"
        >
          {site.brand}
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative font-mono text-[11px] tracking-[0.22em] uppercase transition-colors",
                active === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {active === item.href ? (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-primary" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden h-8 rounded-[4px] px-3 font-mono text-[11px] tracking-[0.16em] uppercase md:inline-flex"
          >
            <a href={contact.whatsapp.href}>{contact.whatsapp.label}</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-[4px] border-border md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-black pt-10">
              <SheetHeader>
                <SheetTitle className="font-heading tracking-[0.2em]">
                  {site.brand}
                </SheetTitle>
              </SheetHeader>
              <AnimatePresence>
                {open ? (
                  <motion.nav
                    aria-label="Mobile"
                    className="flex flex-col gap-1 px-4"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {nav.map((item, index) => (
                      <SheetClose asChild key={item.href}>
                        <a
                          href={item.href}
                          className="flex items-baseline justify-between border-b border-border py-4 font-heading text-2xl"
                        >
                          <span>{item.label}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            0{index + 1}
                          </span>
                        </a>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Button asChild className="mt-6 rounded-[4px]">
                        <a href={contact.whatsapp.href}>
                          {contact.whatsapp.label}
                        </a>
                      </Button>
                    </SheetClose>
                  </motion.nav>
                ) : null}
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
