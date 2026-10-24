import { Reveal } from "@/components/site/reveal";
import { journey } from "@/lib/site";

export function Journey() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28"
    >
      <div className="site-shell">
        <Reveal>
          <p className="kicker">04 / Learning journey</p>
          <h2 className="font-heading mt-4 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-semibold">
            What I can verify.
          </h2>
        </Reveal>
        <div className="relative mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-2 right-0 left-0 hidden h-px bg-border lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {journey.map((item, index) => (
              <li key={item.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-px hidden size-2 bg-primary lg:block"
                />
                <Reveal delay={index * 0.06}>
                  <p className="kicker">{item.period}</p>
                  <h3 className="font-heading mt-4 text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
