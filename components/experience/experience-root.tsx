"use client";

import { CloudFallbackSky } from "@/components/experience/cloud-fallback";
import { LoaderOverlay } from "@/components/experience/loader-overlay";
import { Hero } from "@/components/site/hero";
import { useCoarsePointer, usePrefersReducedMotion } from "@/hooks/use-media";
import {
  detectWebGL,
  useLoaderProgress,
  type LoaderGate,
} from "@/hooks/use-loader-progress";
import { LOADER_SESSION_KEY, SPARKS_EVENT } from "@/lib/loader-copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

gsap.registerPlugin(useGSAP);

const CloudStageClient = dynamic(
  () =>
    import("@/components/experience/cloud-stage").then((mod) => mod.CloudStage),
  { ssr: false, loading: () => <CloudFallbackSky /> },
);

function emitSparks(on: boolean) {
  window.dispatchEvent(new CustomEvent(SPARKS_EVENT, { detail: { on } }));
}

function subscribeNoop() {
  return () => undefined;
}

function readClientTrue() {
  return true;
}

function readClientFalse() {
  return false;
}

function readSessionSkip() {
  try {
    return sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function ExperienceRoot() {
  const reduce = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const isClient = useSyncExternalStore(subscribeNoop, readClientTrue, readClientFalse);
  const sessionSkip = useSyncExternalStore(subscribeNoop, readSessionSkip, readClientFalse);
  const webglOk = useMemo(() => (isClient ? detectWebGL() : false), [isClient]);
  const [webglLive, setWebglLive] = useState<boolean | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const exiting = useRef(false);

  const canvasOk = webglLive ?? webglOk;

  const skip3d = reduce || !canvasOk;
  const { phase, displayProgress, mark, beginExit, finish } = useLoaderProgress({
    armed: isClient,
    skip3d,
    sessionSkip,
    reducedMotion: reduce,
  });

  const onMark = useCallback(
    (gate: LoaderGate) => {
      mark(gate);
    },
    [mark],
  );

  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        setPastHero(entry.isIntersecting || rect.top < 80);
      },
      { threshold: [0, 0.08, 0.2] },
    );
    observer.observe(about);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const active = !sessionSkip && phase !== "complete";
    document.body.dataset.loader = active ? "active" : "done";
    document.body.style.overflow =
      active && phase !== "exiting" ? "hidden" : "";
    return () => {
      delete document.body.dataset.loader;
      document.body.style.overflow = "";
    };
  }, [phase, sessionSkip]);

  useEffect(() => {
    if (phase === "complete") emitSparks(true);
    else emitSparks(false);
  }, [phase]);

  useGSAP(
    () => {
      if (sessionSkip || phase === "complete") return;
      if (phase !== "ready" && phase !== "fallback") return;
      if (displayProgress < 0.995) return;
      if (exiting.current) return;
      exiting.current = true;
      beginExit();

      const overlay = overlayRef.current;
      const lines = stageRef.current?.querySelectorAll("[data-hero-line]");
      const rest = stageRef.current?.querySelectorAll("[data-hero-rest]");
      const tl = gsap.timeline({
        onComplete: () => finish(),
      });

      if (overlay) {
        tl.to(overlay, {
          autoAlpha: 0,
          duration: reduce ? 0.2 : 0.75,
          ease: "power2.inOut",
        });
      }
      if (!reduce && lines?.length) {
        tl.fromTo(
          lines,
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.28",
        );
      } else if (lines?.length) {
        gsap.set(lines, { autoAlpha: 1, yPercent: 0 });
      }
      if (rest?.length) {
        tl.fromTo(
          rest,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduce ? 0.15 : 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.45",
        );
      }
    },
    { dependencies: [beginExit, displayProgress, finish, phase, reduce, sessionSkip] },
  );

  const showOverlay = isClient && !sessionSkip && phase !== "complete";
  const cloudsOn = isClient && !skip3d;
  const canvasPaused = pastHero || pageHidden;

  const stage = isClient
    ? createPortal(
        <>
          {cloudsOn ? (
            <CloudStageClient
              enabled
              paused={canvasPaused}
              compact={coarse}
              onMark={onMark}
              onContextLost={() => setWebglLive(false)}
            />
          ) : (
            <CloudFallbackSky />
          )}
          {showOverlay ? (
            <LoaderOverlay
              ref={overlayRef}
              progress={displayProgress}
              phase={phase}
              reduced={reduce}
            />
          ) : null}
        </>,
        document.body,
      )
    : null;

  return (
    <div ref={stageRef} className="relative z-10">
      {stage}
      <Hero
        revealNow={sessionSkip || phase === "complete"}
        holdForGsap={!sessionSkip && !reduce}
      />
    </div>
  );
}
