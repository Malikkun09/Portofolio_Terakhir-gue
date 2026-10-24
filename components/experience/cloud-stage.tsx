"use client";

import { CloudFallbackSky } from "@/components/experience/cloud-fallback";
import { CloudScene } from "@/components/experience/cloud-scene";
import type { LoaderGate } from "@/hooks/use-loader-progress";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";

function GateBridge({
  onMark,
}: {
  onMark: (gate: LoaderGate) => void;
}) {
  const markedFrame = useRef(false);
  const map = useTexture("/textures/cloud.png");

  useEffect(() => {
    if (map) onMark("textures");
  }, [map, onMark]);

  useFrame(() => {
    if (markedFrame.current) return;
    markedFrame.current = true;
    onMark("frame");
  });

  return null;
}

function VisibilityPause({ paused }: { paused: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (!paused) invalidate();
  }, [invalidate, paused]);
  return null;
}

export function CloudStage({
  paused,
  compact,
  enabled,
  onMark,
  onContextLost,
}: {
  paused: boolean;
  compact: boolean;
  enabled: boolean;
  onMark: (gate: LoaderGate) => void;
  onContextLost?: () => void;
}) {
  if (!enabled) {
    return <CloudFallbackSky />;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen ${
        paused ? "opacity-0" : "opacity-100"
      }`}
      style={{ width: "100vw", height: "100dvh" }}
    >
      <Canvas
        className="block h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
        dpr={compact ? 1 : [1, 1.5]}
        frameloop={paused ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        camera={{ position: [0, 1.6, 9.5], fov: 42, near: 0.1, far: 40 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
          gl.setSize(window.innerWidth, window.innerHeight, false);
          onMark("webgl");
          const canvas = gl.domElement;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          const onLost = (event: Event) => {
            event.preventDefault();
            onContextLost?.();
          };
          canvas.addEventListener("webglcontextlost", onLost, { once: true });
        }}
      >
        <VisibilityPause paused={paused} />
        <Suspense fallback={null}>
          <GateBridge onMark={onMark} />
          <CloudScene compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  );
}
