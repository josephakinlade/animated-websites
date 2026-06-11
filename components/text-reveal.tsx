"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function SplitText({ text }: { text: string }) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const textElement = textRef.current;
      if (!textElement) return;

      const words = gsap.utils.toArray<HTMLElement>("[data-reveal-word]");

      gsap.fromTo(
        words,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.5,
        },
      );
    },
    { scope: textRef },
  );

  return (
    <h1 ref={textRef} className="text-5xl leading-tight font-medium">
      {text.split(" ").map((word) => (
        <span className="mr-[0.2em] inline-block overflow-hidden" key={word}>
          <span className="inline-block" data-reveal-word>
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}
