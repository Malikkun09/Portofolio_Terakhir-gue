import { Reveal } from "@/components/site/reveal";
import { stack } from "@/lib/site";
import {
  Boxes,
  Braces,
  Cpu,
  GitBranch,
  LayoutTemplate,
  MonitorSmartphone,
  PenTool,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "Next.js": LayoutTemplate,
  React: MonitorSmartphone,
  TypeScript: Braces,
  "Tailwind CSS": Boxes,
  Motion: Sparkles,
  Laravel: Boxes,
  PHP: Braces,
  MySQL: Boxes,
  Python: Terminal,
  Figma: PenTool,
  Git: GitBranch,
  Linux: Terminal,
  "HTML / CSS": LayoutTemplate,
  "AI interfaces": Cpu,
  "NVIDIA NIM": Cpu,
  "Computer vision demos": Cpu,
};

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 border-t border-border py-24 sm:py-28">
      <div className="site-shell">
        <Reveal>
          <p className="kicker">03 / Tech stack</p>
          <h2 className="font-heading mt-4 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-semibold">
            Tools I actually use.
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 md:border-t md:border-l border-border">
          {stack.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.05}>
              <article className="border-b border-border p-6 sm:p-8 md:border-r">
                <h3 className="kicker">{group.group}</h3>
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {group.items.map((item) => {
                    const Icon = icons[item] ?? Boxes;
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-3 py-3 text-sm"
                      >
                        <Icon className="size-4 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
