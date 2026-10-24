import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { getListedProjects } from "@/lib/site";

export function Projects() {
  const listed = getListedProjects();

  return (
    <div className="border-t border-border py-20 sm:py-24">
      <div className="site-shell">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="kicker">Selected / more</p>
              <h2 className="font-heading mt-3 text-3xl sm:text-4xl">Other work</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm text-muted-foreground md:block">
              Public builds with live URLs or repositories. Hover a row for the full note.
            </p>
          </div>
        </Reveal>
        <div className="border-t border-border">
          {listed.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
