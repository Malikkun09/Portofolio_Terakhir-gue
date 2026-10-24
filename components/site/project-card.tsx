"use client";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/site";
import { ArrowUpRight, Code2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const number = String(index + 3).padStart(2, "0");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-border"
    >
      <div className="grid items-start gap-3 py-7 md:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(0,0.9fr)_auto] md:gap-6">
        <span className="font-mono text-[11px] tracking-[0.22em] text-primary">
          {number}
        </span>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-heading text-2xl leading-none md:text-[1.85rem]">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              {project.context} · {project.year}
            </span>
          </div>
          <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:transition-[grid-template-rows] md:duration-300 md:ease-out md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
            <p className="mt-3 overflow-hidden text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 md:justify-end">
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
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          {project.live ? (
            <a
              href={project.live}
              className="inline-flex items-center gap-1 text-primary transition-opacity hover:opacity-80"
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
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              <Code2 className="size-3.5" />
              Source
            </a>
          ) : null}
          {!project.live && !project.repo ? (
            <span className="text-muted-foreground">No public link yet</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
