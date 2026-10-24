import { Reveal } from "@/components/site/reveal";
import { about } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-24 sm:py-28">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
        <Reveal>
          <p className="kicker">01 / {about.kicker}</p>
          <h2 className="font-heading mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-semibold">
            {about.title}
          </h2>
        </Reveal>
        <div>
          <Reveal>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <ul className="mt-10 border-t border-border">
            {about.focus.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <li className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[8.5rem_1fr]">
                  <span className="kicker pt-0.5">{item.label}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
