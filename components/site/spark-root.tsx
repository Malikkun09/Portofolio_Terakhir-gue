"use client";

import ClickSpark from "@/components/ClickSpark";
import { SPARKS_EVENT } from "@/lib/loader-copy";
import { useEffect, useState, type ReactNode } from "react";

export function SparkRoot({ children }: { children: ReactNode }) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let loaderOff = true;

    const update = () => {
      setDisabled(loaderOff || motion.matches || coarse.matches);
    };

    const onSparks = (event: Event) => {
      const detail = (event as CustomEvent<{ on?: boolean }>).detail;
      loaderOff = !detail?.on;
      update();
    };

    update();
    motion.addEventListener("change", update);
    coarse.addEventListener("change", update);
    window.addEventListener(SPARKS_EVENT, onSparks);
    return () => {
      motion.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
      window.removeEventListener(SPARKS_EVENT, onSparks);
    };
  }, []);

  return (
    <ClickSpark
      className="min-h-full"
      sparkColor="#C8FF00"
      sparkCount={8}
      sparkRadius={22}
      sparkSize={10}
      sparkWidth={1.5}
      duration={420}
      easing="ease-out"
      glow={0}
      disabled={disabled}
    >
      {children}
    </ClickSpark>
  );
}
