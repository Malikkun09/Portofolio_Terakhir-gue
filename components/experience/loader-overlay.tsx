"use client";

import { RotatingPhrase } from "@/components/experience/rotating-phrase";
import { site } from "@/lib/site";
import type { LoaderPhase } from "@/hooks/use-loader-progress";
import { forwardRef } from "react";

type Props = {
  progress: number;
  phase: LoaderPhase;
  reduced: boolean;
};

export const LoaderOverlay = forwardRef<HTMLDivElement, Props>(
  function LoaderOverlay({ progress, phase, reduced }, ref) {
    const percent = Math.round(Math.min(100, Math.max(0, progress * 100)));
    const busy = phase !== "complete" && phase !== "exiting";

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-busy={busy}
        aria-label="Loading experience"
        className="fixed inset-0 z-[60] flex flex-col justify-between bg-black/25 px-5 py-6 sm:px-8 sm:py-8"
      >
        <p className="font-mono text-[11px] tracking-[0.28em] text-white/45 uppercase">
          {site.brand}
        </p>

        <div className="grid items-end gap-8 sm:grid-cols-[1fr_minmax(0,26rem)] sm:gap-12">
          <div>
            <p
              className="font-mono text-[clamp(3.4rem,12vw,7.5rem)] leading-none font-medium text-primary tabular-nums"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              role="progressbar"
            >
              {String(percent).padStart(2, "0")}
            </p>
            <div className="mt-4 h-px w-[min(100%,11rem)] bg-white/15">
              <div
                className="h-px bg-primary"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <RotatingPhrase
            active={busy && phase !== "fallback"}
            reduced={reduced}
          />
        </div>
      </div>
    );
  },
);
