"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/text-reveal";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CanScene } from "./CanScene";
import styles from "../numo.module.css";

const flavors = [
  {
    color: "#f7ec98",
    icon: "L",
    name: "Lemon",
    text: "Bright, crisp, and clean with a little electric sparkle.",
    tilt: "-1.5deg",
  },
  {
    color: "#f6bb9d",
    icon: "P",
    name: "Peach",
    text: "Soft golden fizz for slow afternoons and loud laughs.",
    tilt: "1deg",
  },
  {
    color: "#f4bdd2",
    icon: "R",
    name: "Raspberry",
    text: "Juicy, expressive, and made for moments that need color.",
    tilt: "-0.8deg",
  },
];

export function NumoExperience() {
  const pageRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    const content = contentRef.current;
    if (!page || !content) return;

    const smoother = ScrollSmoother.create({
      content,
      effects: true,
      smooth: 1.08,
      smoothTouch: 0.08,
      wrapper: page,
    });

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set("[data-numo-loader]", { display: "none" });
        gsap.set("[data-entry], [data-can-stage]", { opacity: 1, y: 0 });
        setIsLoaded(true);
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
        onComplete: () => setIsLoaded(true),
      });

      timeline
        .fromTo(
          "[data-loader-word]",
          { yPercent: 112, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 0.72 },
        )
        .to("[data-loader-word]", {
          yPercent: -112,
          rotate: -4,
          duration: 0.72,
          delay: 0.28,
        })
        .to(
          "[data-numo-loader]",
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.18",
        )
        .fromTo(
          "[data-entry]",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.48",
        )
        .fromTo(
          "[data-can-stage]",
          { opacity: 0 },
          { opacity: 1, duration: 0.75 },
          "-=0.7",
        );

      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((item) => {
        const onMove = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;
          gsap.to(item, {
            x: x * 0.18,
            y: y * 0.18,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "elastic.out(1, 0.45)",
          });
        };

        item.addEventListener("pointermove", onMove);
        item.addEventListener("pointerleave", onLeave);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
            },
          },
        );
      });
    }, page);

    return () => {
      context.revert();
      smoother.kill();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className={styles.page}
      data-numo-smooth-wrapper
      data-loaded={isLoaded}
    >
      <div aria-hidden={isLoaded} className={styles.loader} data-numo-loader>
        <div className={styles.loaderWord}>
          <span data-loader-word>NUMO</span>
        </div>
      </div>

      <div aria-hidden="true" className={styles.canvasLayer} data-can-stage>
        <CanScene />
      </div>

      <div ref={contentRef} className={styles.content} data-numo-smooth-content>
        <section className={styles.hero}>
          <div className={styles.water} />

          <nav className={styles.nav} data-entry>
            <a
              className="text-3xl leading-none font-black tracking-normal"
              href="/numo"
            >
              NUMO
            </a>
            <div className="flex items-center gap-3 text-sm font-black uppercase md:text-base">
              <a className={styles.ghostButton} data-magnetic href="#flavors">
                Flavours
              </a>
              <a className={styles.pillButton} data-magnetic href="#shop">
                Scan Play Win
              </a>
            </div>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopyBlock}>
              <TextReveal
                className={styles.headline}
                delay={2.05}
                duration={1.05}
                text="NUMO"
              />
              <div className="mt-8 grid gap-5 md:max-w-xl md:grid-cols-[1fr_auto] md:items-end">
                <TextReveal
                  as="p"
                  className={styles.heroCopy}
                  delay={2.25}
                  duration={0.9}
                  text="A playful sparkling drink brand built around joy, bold labels, tiny games, fresh fruit, and the easy feeling of opening something bright."
                />
                <a
                  className={styles.pillButton}
                  data-entry
                  data-magnetic
                  href="#flavors"
                >
                  Explore the fizz
                </a>
              </div>
            </div>

            <div className={styles.heroStageSpace} />
          </div>
        </section>

        <section id="flavors" className={styles.variantSection}>
          <div className={styles.variantIntro}>
            <TextReveal
              as="p"
              className="text-xl leading-tight uppercase"
              scroll
              text="three sparkling moods"
            />
            <TextReveal
              as="h2"
              className="max-w-5xl text-5xl leading-none font-black tracking-normal md:text-8xl"
              scroll
              text="Light flavours, loud personality."
            />
          </div>

          <div className={styles.flavorGrid}>
            {flavors.map((flavor, index) => (
              <article
                className={styles.flavorCard}
                data-reveal
                key={flavor.name}
                style={
                  {
                    background: flavor.color,
                    "--tilt": flavor.tilt,
                  } as CSSProperties
                }
              >
                <TextReveal
                  as="p"
                  className="mb-3 text-lg font-black uppercase"
                  scroll
                  text={`0${index + 1}`}
                />
                <TextReveal
                  as="h3"
                  className="text-5xl leading-none font-black tracking-normal"
                  scroll
                  text={flavor.name}
                />
                <TextReveal
                  as="p"
                  className="mt-5 max-w-xs text-2xl leading-tight"
                  scroll
                  text={flavor.text}
                />
                <span className={styles.flavorIcon} aria-hidden="true">
                  {flavor.icon}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storyBand}>
          <div className={styles.storyCard} data-reveal>
            <TextReveal
              as="p"
              className="mb-8 text-xl uppercase"
              scroll
              text="packaging system"
            />
            <TextReveal
              as="h2"
              className="max-w-5xl text-5xl leading-none font-black tracking-normal md:text-8xl"
              scroll
              text="Built for shelf impact, made to feel collectible."
            />
          </div>
          <div className={styles.storyCard} data-reveal>
            <TextReveal
              as="p"
              className="text-2xl leading-tight md:text-4xl"
              scroll
              text="Each can becomes a small game ticket: scan, play, unlock flavours, collect points. The motion language stays bouncy, tactile, and slightly imperfect, like cold cans rolling through a beach cooler."
            />
          </div>
        </section>

        <footer id="shop" className={styles.footer}>
          <div data-reveal>
            <TextReveal
              as="h2"
              className="text-7xl leading-none font-black tracking-normal md:text-9xl"
              scroll
              text="NUMO"
            />
            <TextReveal
              as="p"
              className="mt-4 max-w-xl text-2xl leading-tight"
              scroll
              text="Sparkling cans for bright breaks, beach walks, and small wins."
            />
          </div>
          <a
            className={`${styles.pillButton} ${styles.footerButton}`}
            data-magnetic
            href="#"
          >
            Back to top
          </a>
        </footer>
      </div>
    </main>
  );
}
