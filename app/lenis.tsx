"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let tickerCallback: ((time: number) => void) | null = null;
    let gsapInstance: any = null;

    // Sync Lenis with GSAP ScrollTrigger
    const syncScrollTrigger = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapInstance = gsap;

        gsap.registerPlugin(ScrollTrigger);

        // Connect Lenis scroll to ScrollTrigger
        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });

        // Use Lenis requestAnimationFrame with GSAP ticker
        tickerCallback = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      } catch {
        // Fallback standard animation frame loop
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };

    syncScrollTrigger();

    return () => {
      if (tickerCallback && gsapInstance) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
