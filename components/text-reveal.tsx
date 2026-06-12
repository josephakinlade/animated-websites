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
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  scroll?: boolean;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  duration = 1,
  as,
  scroll = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const tag = as ?? "h1";
  const setContainerRef = (node: HTMLElement | null) => {
    containerRef.current = node;
  };

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
      const animation = {
        yPercent: 0,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power4.out",
      };

      if (scroll) {
        gsap.fromTo(
          words,
          { yPercent: 105 },
          {
            ...animation,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 84%",
            },
          },
        );
        return;
      }

      gsap.fromTo(words, { yPercent: 105 }, animation);
    },
    { dependencies: [delay, duration, scroll, stagger], scope: containerRef },
  );

  const content = text.split(" ").map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="mr-[0.2em] inline-block overflow-hidden align-bottom"
    >
      <span data-reveal-word className="inline-block will-change-transform">
        {word}
      </span>
    </span>
  ));

  if (tag === "h2") {
    return (
      <h2 ref={setContainerRef} className={className}>
        {content}
      </h2>
    );
  }

  if (tag === "h3") {
    return (
      <h3 ref={setContainerRef} className={className}>
        {content}
      </h3>
    );
  }

  if (tag === "p") {
    return (
      <p ref={setContainerRef} className={className}>
        {content}
      </p>
    );
  }

  if (tag === "span") {
    return (
      <span ref={setContainerRef} className={className}>
        {content}
      </span>
    );
  }

  if (tag === "div") {
    return (
      <div ref={setContainerRef} className={className}>
        {content}
      </div>
    );
  }

  return (
    <h1 ref={setContainerRef} className={className}>
      {content}
    </h1>
  );
}
