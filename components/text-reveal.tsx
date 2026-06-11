// components/TextReveal.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  duration = 1,
}: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const words =
        containerRef.current?.querySelectorAll("[data-reveal-word]");
      if (!words || words.length === 0) return;

      // Check for user accessibility preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(words, { yPercent: 0 });
        return;
      }

      // Execute the clean reveal animation
      gsap.fromTo(
        words,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: "power4.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <h1 ref={containerRef} className={className}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.2em] inline-block overflow-hidden align-bottom"
        >
          <span data-reveal-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}
