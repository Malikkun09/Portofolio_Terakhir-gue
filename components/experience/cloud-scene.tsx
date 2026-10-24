"use client";

import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MeshLambertMaterial } from "three";

const desktopClouds = [
  { seed: 1, position: [-4.2, 0.4, -4] as const, volume: 9, color: "#9aaebc", scale: 1.15 },
  { seed: 2, position: [3.6, -0.2, -2.4] as const, volume: 8, color: "#b7c4ce", scale: 1 },
  { seed: 3, position: [0.2, 1.1, -6] as const, volume: 11, color: "#8a9eae", scale: 1.35 },
  { seed: 4, position: [-1.8, -0.8, -1.2] as const, volume: 6, color: "#cbb6a6", scale: 0.85 },
  { seed: 5, position: [5.4, 0.8, -5.5] as const, volume: 7, color: "#d8c4b4", scale: 0.95 },
  { seed: 6, position: [-6.2, -0.4, -3.2] as const, volume: 8, color: "#7f93a4", scale: 1.1 },
];

const mobileClouds = [
  desktopClouds[0],
  desktopClouds[1],
  desktopClouds[2],
];

export function CloudScene({ compact }: { compact: boolean }) {
  const group = useRef<Group>(null);
  const layers = compact ? mobileClouds : desktopClouds;

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.028;
    group.current.position.x = Math.sin(performance.now() * 0.00007) * 0.35;
    group.current.position.z = Math.cos(performance.now() * 0.00005) * 0.25;
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 10, 26]} />
      <hemisphereLight args={["#c5d2de", "#120e0c", 0.95]} />
      <directionalLight position={[7, 8, -3]} intensity={1.55} color="#ffd2b8" />
      <directionalLight position={[-6, 3, 4]} intensity={0.25} color="#8ea4b8" />
      <group ref={group} position={[0, -0.2, 0]}>
        <Clouds
          material={MeshLambertMaterial}
          texture="/textures/cloud.png"
          limit={compact ? 80 : 160}
          frustumCulled={false}
        >
          {layers.map((cloud) => (
            <Cloud
              key={cloud.seed}
              seed={cloud.seed}
              fade={28}
              speed={0.12}
              growth={4}
              segments={compact ? 22 : 36}
              bounds={[8, 1.6, 2.2]}
              volume={cloud.volume}
              color={cloud.color}
              opacity={0.72}
              position={cloud.position}
              scale={cloud.scale}
            />
          ))}
        </Clouds>
      </group>
    </>
  );
}
