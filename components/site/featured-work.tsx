"use client";

import { Badge } from "@/components/ui/badge";
import { useDesktopPin } from "@/hooks/use-media";
import { featuredVisual, getFeaturedProject } from "@/lib/site";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FeaturedWork() {
  const project = getFeaturedProject();
  const root = useRef<HTMLDivElement>(null);
  const pin = useDesktopPin();

  useGSAP(
    () => {
      if (!pin || !root.current) return;

      const kicker = root.current.querySelector("[data-feat-kicker]");
      const title = root.current.querySelector("[data-feat-title]");
      const copy = root.current.querySelector("[data-feat-copy]");
      const links = root.current.querySelector("[data-feat-links]");
      const frame = root.current.querySelector("[data-feat-frame]");

      gsap.set([kicker, title, copy, links], { clearProps: "all" });
      gsap.set(frame, { autoAlpha: 0, y: 36, scale: 0.98, transformOrigin: "center center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 64px",
          end: "+=120%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(frame, { autoAlpha: 1, y: 0, scale: 1, duration: 1 });
    },
    { scope: root, dependencies: [pin], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="border-t border-border">
      <div
        data-feat-stage
        className="site-shell py-20 sm:py-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <p data-feat-kicker className="kicker">
              02 / Featured · {project.context} · {project.year}
            </p>
            <h2
              data-feat-title
              className="font-heading mt-5 max-w-xl text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.9] font-semibold"
            >
              {project.title}
            </h2>
            <p
              data-feat-copy
              className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {project.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge
                    variant="outline"
                    className="rounded-[4px] border-border font-mono text-[10px] tracking-[0.12em] uppercase"
                  >
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
            <div data-feat-links className="mt-8 flex flex-wrap gap-5">
              {project.live ? (
                <a
                  href={project.live}
                  className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.16em] text-primary uppercase transition-opacity hover:opacity-80"
                  rel="noreferrer"
                  target="_blank"
                >
                  Live
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Code2 className="size-3.5" />
                  Source
                </a>
              ) : null}
            </div>
          </div>

          <div
            data-feat-frame
            className="frame-ticks relative aspect-[4/5] border border-border sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <div className="absolute inset-4 border border-primary/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(200_255_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(200_255_0/0.05)_1px,transparent_1px)] bg-size-[28px_28px]" />
            <div className="absolute top-8 left-8 right-8 flex justify-between font-mono text-[10px] tracking-[0.22em] text-primary uppercase">
              <span>Case 02</span>
              <span>{project.year}</span>
            </div>
            <p className="font-heading absolute right-8 bottom-10 left-8 text-4xl leading-none sm:text-5xl">
              {featuredVisual}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
