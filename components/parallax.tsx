// components/ParallaxObject.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Maps to their data-ratio
}

export default function ParallaxObject({
  children,
  speed = 0.2,
}: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const yMove = window.innerHeight * speed * 0.5;

    gsap.fromTo(
      element,
      { y: -yMove },
      {
        y: yMove,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, [speed]);

  return (
    <div ref={targetRef} className="will-change-transform">
      {children}
    </div>
  );
}
