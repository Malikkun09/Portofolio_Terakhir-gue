import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { contact, profiles, site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="site-shell">
        <Reveal>
          <p className="kicker">05 / Contact</p>
          <h2 className="font-heading mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.92] font-semibold">
            If you want to build something, I’m listening.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 border-t border-border pt-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {contact.emailNote}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-[4px] px-6 text-sm"
            >
              <a href={contact.whatsapp.href}>
                Message on WhatsApp
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            <p className="mt-3 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {contact.whatsapp.display}
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              {site.availability}
            </p>
          </Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {profiles.map((profile, index) => (
              <Reveal key={profile.href} delay={index * 0.04}>
                <li>
                  <a
                    href={profile.href}
                    className="group flex items-center justify-between py-4 text-sm transition-colors hover:text-primary"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{profile.label}</span>
                    <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
