// components/HeroSection.tsx
"use client";

import { TextReveal } from "@/components/text-reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import styles from "../custo.module.css";
import { CustoLogo } from "./CustoLogo";
import { SecondaryLink } from "./SecondaryLink";

const heroTitle = "Receive the world at your doorstep.";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const awardRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const context = gsap.context(() => {
      const section = sectionRef.current;
      const product = productRef.current;
      const cta = ctaRef.current;
      const logo = logoRef.current?.querySelector("svg");
      const award = awardRef.current;

      if (!section) return;

      const logoLetters = logo ? Array.from(logo.children) : [];
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([product, cta, ...logoLetters, award].filter(Boolean), {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      if (product) {
        intro.fromTo(product, { scale: 1.2 }, { scale: 1, duration: 1.5 }, 0);
      }

      if (cta) {
        intro.fromTo(
          cta,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power3.inOut" },
          0.5,
        );
      }

      if (logoLetters.length > 0) {
        intro.fromTo(
          logoLetters,
          { y: 34 },
          { y: 0, duration: 1.2, stagger: 0.08 },
          0.58,
        );
      }

      if (award) {
        intro.fromTo(
          award,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          1.4,
        );
      }
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-dvh overflow-hidden bg-[#9ea29f] px-7 text-white md:px-[5.3333333333vw]"
    >
      {/* This layout container sets your responsive left/right boundaries */}
      <div data-speed="0.8" className="relative grid h-full grid-cols-6 gap-3 pt-30 md:grid-cols-12 md:gap-6 md:pt-[18vh]">
        {/* Text Column */}
        <div className="relative z-10 col-span-6 md:col-span-6">
          <TextReveal
            text={heroTitle}
            className="pr-2.5 text-[max(10.1333333333vw,38px)] leading-[1.02] font-medium tracking-[0.03rem] md:text-[max(4vw,40px)]"
          />

          <div ref={ctaRef} className={`${styles.heroCta} mt-11.5`}>
            <SecondaryLink>Discover our smart mailbox</SecondaryLink>
          </div>
        </div>

        {/* Product Image Structure */}
        <div
          data-speed="0.8"
          className="pointer-events-none absolute top-30 left-0 h-full w-full md:top-[16.1vh]"
        >
          <div
            className={`${styles.heroProduct} absolute -bottom-32.5 left-1/2 w-[70%] -translate-x-1/2 md:top-[16.5vh] md:bottom-auto md:w-[39.4666666667vw]`}
          >
            <div ref={productRef} className={styles.heroProductMotion}>
              <Image
              
                className="h-full w-full object-contain"
                src="/custo/custo-hero.png"
                alt="Tall black Custo smart parcel mailbox"
                width={592}
                height={1234}
                priority
                sizes="(max-width: 767px) 70vw, 39.4666666667vw"
              />
            </div>
          </div>
        </div>

        {/* Footer SVG Logo */}
        <div
          ref={logoRef}
          className={`${styles.heroLogo} absolute bottom-[5vh] left-0 w-full fill-current`}
        >
          <CustoLogo className="w-full" />
        </div>
      </div>
      {/* CRITICAL MOVE: Pinned Award Seal Inside Grid Container */}
      <Image
        ref={awardRef}
        className="absolute right-3 bottom-3 z-20 h-auto w-11.25 md:bottom-3 md:w-18.75"
        src="/custo/ces-award.png"
        alt="CES Innovation Awards 2024 honoree"
        width={154}
        height={212}
      />
    </section>
  );
}
