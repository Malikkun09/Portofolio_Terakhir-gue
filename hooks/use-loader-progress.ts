"use client";

import { LOADER_SESSION_KEY } from "@/lib/loader-copy";
import { useCallback, useEffect, useRef, useState } from "react";

export const LOADER_WEIGHTS = {
  shell: 0.12,
  fonts: 0.18,
  webgl: 0.3,
  textures: 0.25,
  frame: 0.15,
} as const;

export type LoaderGate = keyof typeof LOADER_WEIGHTS;

export type LoaderPhase =
  | "loading"
  | "nearComplete"
  | "ready"
  | "exiting"
  | "complete"
  | "fallback";

const MIN_HOLD_MS = 1200;
const HARD_CAP_MS = 8000;
const FONT_TIMEOUT_MS = 2500;
const REDUCE_MS = 400;
const LERP_K = 5.4;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Options = {
  armed: boolean;
  skip3d: boolean;
  sessionSkip: boolean;
  reducedMotion: boolean;
};

export function useLoaderProgress({
  armed,
  skip3d,
  sessionSkip,
  reducedMotion,
}: Options) {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [displayProgress, setDisplayProgress] = useState(0);
  const gates = useRef<Record<LoaderGate, boolean>>({
    shell: false,
    fonts: false,
    webgl: false,
    textures: false,
    frame: false,
  });
  const displayed = useRef(0);
  const started = useRef(0);
  const phaseRef = useRef<LoaderPhase>("loading");

  const setPhaseSafe = useCallback((next: LoaderPhase) => {
    if (phaseRef.current === "complete") return;
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const targetProgress = useCallback(() => {
    const current = phaseRef.current;
    if (current === "complete" || current === "fallback" || current === "ready" || current === "exiting") {
      return 1;
    }
    let sum = 0;
    (Object.keys(LOADER_WEIGHTS) as LoaderGate[]).forEach((key) => {
      if (gates.current[key]) sum += LOADER_WEIGHTS[key];
    });
    const all = (Object.keys(LOADER_WEIGHTS) as LoaderGate[]).every(
      (key) => gates.current[key],
    );
    if (all) return 1;
    return Math.min(sum, 0.99);
  }, []);

  const mark = useCallback((gate: LoaderGate) => {
    if (gates.current[gate]) return;
    gates.current[gate] = true;
  }, []);

  useEffect(() => {
    if (!armed || sessionSkip) return;

    started.current = performance.now();

    mark("shell");
    if (skip3d) {
      mark("webgl");
      mark("textures");
      mark("frame");
    }

    let fontsSettled = false;
    const finishFonts = () => {
      if (fontsSettled) return;
      fontsSettled = true;
      mark("fonts");
    };

    const fontTimer = window.setTimeout(finishFonts, FONT_TIMEOUT_MS);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(finishFonts);
    } else {
      finishFonts();
    }

    const cap = window.setTimeout(() => {
      (Object.keys(LOADER_WEIGHTS) as LoaderGate[]).forEach((key) => {
        gates.current[key] = true;
      });
      displayed.current = 1;
      setDisplayProgress(1);
      if (phaseRef.current === "loading" || phaseRef.current === "nearComplete") {
        setPhaseSafe("fallback");
      }
    }, HARD_CAP_MS);

    let last = performance.now();

    const step = (now: number) => {
      if (phaseRef.current === "complete") return;
      const dt = Math.min(0.08, Math.max(0.016, (now - last) / 1000));
      last = now;
      const target = targetProgress();
      const k = reducedMotion ? 16 : LERP_K;
      displayed.current = Math.max(
        displayed.current,
        lerp(displayed.current, target, 1 - Math.exp(-k * dt)),
      );
      if (target >= 1 && displayed.current > 0.992) {
        displayed.current = 1;
      }
      setDisplayProgress(displayed.current);

      const all = (Object.keys(LOADER_WEIGHTS) as LoaderGate[]).every(
        (key) => gates.current[key],
      );
      const elapsed = now - started.current;
      const hold = reducedMotion ? REDUCE_MS : MIN_HOLD_MS;

      if (phaseRef.current === "loading" && displayed.current >= 0.92) {
        setPhaseSafe("nearComplete");
      }

      if (
        (phaseRef.current === "loading" || phaseRef.current === "nearComplete") &&
        all &&
        elapsed >= hold
      ) {
        displayed.current = 1;
        setDisplayProgress(1);
        setPhaseSafe("ready");
      }
    };

    const rafLoop = (now: number) => {
      step(now);
      if (phaseRef.current !== "complete") {
        raf = requestAnimationFrame(rafLoop);
      }
    };
    let raf = requestAnimationFrame(rafLoop);
    const interval = window.setInterval(() => step(performance.now()), 50);

    return () => {
      window.clearTimeout(fontTimer);
      window.clearTimeout(cap);
      window.clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, [armed, mark, reducedMotion, sessionSkip, setPhaseSafe, skip3d, targetProgress]);

  const beginExit = useCallback(() => {
    if (phaseRef.current === "complete") return;
    setPhaseSafe("exiting");
  }, [setPhaseSafe]);

  const finish = useCallback(() => {
    displayed.current = 1;
    setDisplayProgress(1);
    setPhaseSafe("complete");
    try {
      sessionStorage.setItem(LOADER_SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
  }, [setPhaseSafe]);

  return {
    phase: sessionSkip ? "complete" : phase,
    displayProgress: sessionSkip ? 1 : displayProgress,
    mark,
    beginExit,
    finish,
  };
}

export function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
