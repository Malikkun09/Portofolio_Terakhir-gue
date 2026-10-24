import { profiles, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-black py-6">
      <div className="site-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {site.fullName}
        </p>
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {site.location}
        </p>
        <a
          href={profiles[0].href}
          className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-primary"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
