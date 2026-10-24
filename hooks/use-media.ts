"use client";

import { useEffect, useState } from "react";

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMedia("(prefers-reduced-motion: reduce)");
}

export function useCoarsePointer() {
  return useMedia("(pointer: coarse)");
}

export function useDesktopPin() {
  const wide = useMedia("(min-width: 1024px)");
  const coarse = useCoarsePointer();
  const reduce = usePrefersReducedMotion();
  return wide && !coarse && !reduce;
}
