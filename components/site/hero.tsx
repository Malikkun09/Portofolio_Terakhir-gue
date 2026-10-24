"use client";

import Magnet from "@/components/Magnet";
import { Button } from "@/components/ui/button";
import { useCoarsePointer, usePrefersReducedMotion } from "@/hooks/use-media";
import { contact, profiles, site } from "@/lib/site";
import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";

const headline = ["Interfaces that feel", "designed, not default."];

export function Hero({
  revealNow = true,
  holdForGsap = false,
}: {
  revealNow?: boolean;
  holdForGsap?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const magnetOff = reduce || coarse;
  const hide = holdForGsap && !revealNow;

  return (
    <section
      id="top"
      className="relative z-10 min-h-[100svh] overflow-hidden border-b border-border pt-20 pb-16 sm:pt-24 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,#000,transparent)]"
      />

      <div className="site-shell relative">
        <div className="mb-10 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p
            data-hero-rest
            className={cn("kicker", hide && "invisible")}
          >
            {site.location}
          </p>
          <p
            data-hero-rest
            className={cn(
              "hidden font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase md:block",
              hide && "invisible",
            )}
          >
            {site.displayName} · {site.role}
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_18.5rem] lg:gap-16">
          <div className="min-w-0">
            <h1 className="font-heading max-w-[11ch] text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.9] font-semibold">
              {headline.map((line) => (
                <span key={line} className="clip-line block">
                  <span
                    data-hero-line
                    className={cn("block", hide && "opacity-0")}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-rest
              className={cn(
                "mt-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
                hide && "invisible",
              )}
            >
              {site.fullName}. {site.intro}
            </p>

            <div
              data-hero-rest
              className={cn(
                "mt-9 flex flex-wrap items-center gap-3",
                hide && "invisible",
              )}
            >
              <Magnet
                disabled={magnetOff}
                padding={28}
                magnetStrength={0.35}
                maxOffset={10}
                wrapperClassName="inline-flex"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-[4px] px-5 font-medium transition-transform duration-200 hover:-translate-y-px active:translate-y-0"
                >
                  <a href={contact.whatsapp.href}>
                    {contact.whatsapp.label}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              </Magnet>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[4px] border-border px-5 hover:border-primary/40 hover:bg-transparent"
              >
                <a href="#work">Featured work</a>
              </Button>
            </div>
          </div>

          <aside
            data-hero-rest
            className={cn("frame-ticks border border-border bg-black/40 p-5", hide && "invisible")}
          >
            <p className="kicker">Status</p>
            <p className="mt-3 text-sm leading-relaxed">{site.availability}</p>
            <dl className="mt-6 space-y-0 font-mono text-[11px] tracking-[0.14em] uppercase">
              <div className="flex justify-between gap-4 border-t border-border py-3">
                <dt className="text-muted-foreground">Base</dt>
                <dd>Cimahi</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border py-3">
                <dt className="text-muted-foreground">Zone</dt>
                <dd>GMT+7</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border py-3">
                <dt className="text-muted-foreground">School</dt>
                <dd>PPLG</dd>
              </div>
            </dl>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4">
              {profiles.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-primary"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
