"use client";

import { loaderPhrases, type LoaderPhrase } from "@/lib/loader-copy";
import { cn } from "cn";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ENTER_MS = 420;
const HOLD_MS = 1600;
const EXIT_MS = 320;

function faceClass(phrase: LoaderPhrase) {
  return cn(
    phrase.face === "space" && "font-[family-name:var(--font-space),var(--font-geist-sans),sans-serif]",
    phrase.face === "serif" && "font-[family-name:var(--font-instrument),Georgia,serif]",
    phrase.face === "geist" && "font-[family-name:var(--font-geist-sans),sans-serif]",
    phrase.face === "mono" && "font-mono",
    phrase.italic && "italic",
    phrase.weight === "bold" && "font-bold",
    phrase.weight === "medium" && "font-medium",
    phrase.tracking === "tight" && "tracking-[-0.04em]",
    phrase.tracking === "wide" && "tracking-[0.08em]",
    !phrase.tracking && "tracking-[-0.02em]",
  );
}

export function RotatingPhrase({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % loaderPhrases.length;
        if (next === current) return (next + 1) % loaderPhrases.length;
        return next;
      });
    }, ENTER_MS + HOLD_MS + EXIT_MS);
    return () => window.clearInterval(id);
  }, [active, reduced]);

  const phrase = loaderPhrases[index] ?? loaderPhrases[0];

  return (
    <div
      className="relative min-h-[2.4em] overflow-hidden text-right"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={phrase.text}
          className={cn(
            "text-[clamp(1.35rem,3.4vw,2.35rem)] leading-[1.15] text-[#f4eee6]",
            faceClass(phrase),
          )}
          initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{
            duration: reduced ? 0.01 : ENTER_MS / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {phrase.stagger && !reduced
            ? phrase.text.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.018, duration: 0.32 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))
            : phrase.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
