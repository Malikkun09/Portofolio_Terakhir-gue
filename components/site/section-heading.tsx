export function SectionHeading({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          <span className="text-primary">{index}</span>
          {kicker}
        </p>
        <h2 className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
          {description}
        </p>
      ) : null}
    </header>
  );
}
