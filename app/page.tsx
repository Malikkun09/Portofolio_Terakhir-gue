import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { FeaturedWork } from "@/components/site/featured-work";
import { Journey } from "@/components/site/journey";
import { Projects } from "@/components/site/projects";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Stack } from "@/components/site/stack";
import { ExperienceRoot } from "@/components/experience/experience-root";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ExperienceRoot />
        <div className="relative z-10 bg-black">
          <About />
          <section id="work" className="scroll-mt-24">
            <FeaturedWork />
            <Projects />
          </section>
          <Stack />
          <Journey />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
