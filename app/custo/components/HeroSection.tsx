"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
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

  useEffect(() => {
    const context = gsap.context(() => {
      const section = sectionRef.current;
      const product = productRef.current;
      const cta = ctaRef.current;
      const logo = logoRef.current?.querySelector("svg");
      const award = awardRef.current;

      if (!section) return;

      const words = gsap.utils.toArray<HTMLElement>(
        "[data-hero-word]",
        section,
      );
      const logoLetters = logo ? Array.from(logo.children) : [];
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ...words,
            product,
            cta,
            ...logoLetters,
            award,
          ].filter(Boolean),
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
          },
        );
        return;
      }

      gsap.set(words, {
        yPercent: 105,
      });

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .to(words, {
          yPercent: 0,
          duration: 1,
          stagger: 0.035,
        })
      if (product) {
        intro.fromTo(
          product,
          {
            scale: 1.4,
          },
          {
            scale: 1,
            duration: 1.5,
          },
          0,
        );

        gsap.to(product, {
          y: () => window.innerHeight * -0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (cta) {
        intro.fromTo(
          cta,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0.5,
        );
      }

      if (logoLetters.length > 0) {
        intro.fromTo(
          logoLetters,
          {
            y: 34,
          },
          {
            y: 0,
            duration: 1.2,
            stagger: 0.08,
          },
          0.58,
        );
      }

      if (award) {
        intro.fromTo(
          award,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
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
      <div className="relative grid h-full grid-cols-6 gap-3 pt-30 md:grid-cols-12 md:gap-6 md:pt-[18vh]">
        <div className="relative z-10 col-span-6 md:col-span-5">
          <h1 className="pr-2.5 text-[max(10.1333333333vw,38px)] leading-[1.046875] tracking-normal md:text-[max(4vw,40px)]">
            {heroTitle.split(" ").map((word) => (
              <span
                className="mr-[0.2em] inline-block overflow-hidden align-bottom"
                key={word}
              >
                <span className={styles.heroWord} data-hero-word>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <div ref={ctaRef} className={`${styles.heroCta} mt-11.5`}>
            <SecondaryLink>Discover our smart mailbox</SecondaryLink>
          </div>
        </div>

        <div className="pointer-events-none absolute top-30 left-0 h-full w-full md:top-[18vh]">
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

        <div
          ref={logoRef}
          className={`${styles.heroLogo} absolute bottom-[5vh] left-0 w-full fill-current`}
        >
          <CustoLogo className="w-full" />
        </div>

        <Image
          ref={awardRef}
          className={`${styles.award} absolute right-3 bottom-[43vw] h-auto w-11.25 md:bottom-3 md:w-18.75`}
          src="/custo/ces-award.png"
          alt="CES Innovation Awards 2024 honoree"
          width={154}
          height={212}
        />
      </div>
    </section>
  );
}
