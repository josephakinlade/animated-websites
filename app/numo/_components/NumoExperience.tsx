"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CanScene } from "./CanScene";
import styles from "../numo.module.css";

const headline = ["Summer", "in a", "can."];

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set("[data-numo-loader]", { display: "none" });
        gsap.set("[data-entry]", {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
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
          { yPercent: 115, rotate: 5 },
          { yPercent: 0, rotate: 0, duration: 0.75 },
        )
        .to("[data-loader-word]", {
          yPercent: -115,
          rotate: -4,
          duration: 0.75,
          delay: 0.35,
        })
        .to(
          "[data-numo-loader]",
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-word]",
          { yPercent: 112, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.09 },
          "-=0.35",
        )
        .fromTo(
          "[data-entry='copy']",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.72",
        )
        .fromTo(
          "[data-entry='nav']",
          { y: -28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=1",
        )
        .fromTo(
          "[data-sparkle]",
          { scale: 0, rotate: -35 },
          { scale: 1, rotate: 0, duration: 0.75, stagger: 0.12 },
          "-=0.65",
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
              start: "top 82%",
            },
          },
        );
      });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef} className={styles.page}>
      <div aria-hidden={isLoaded} className={styles.loader} data-numo-loader>
        <div className={styles.loaderWord}>
          <span data-loader-word>NUMO</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.water} />

        <nav className={styles.nav} data-entry="nav">
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
          <div>
            <h1 className={styles.headline} aria-label="Summer in a can.">
              {headline.map((word) => (
                <span className={styles.wordMask} key={word}>
                  <span className={styles.word} data-hero-word>
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <div className="mt-8 grid gap-5 md:max-w-xl md:grid-cols-[1fr_auto] md:items-end">
              <p className={styles.heroCopy} data-entry="copy">
                A playful sparkling drink brand built around joy, bold labels,
                tiny games, and the easy feeling of opening something bright.
              </p>
              <a
                className={styles.pillButton}
                data-entry="copy"
                data-magnetic
                href="#flavors"
              >
                Explore the fizz
              </a>
            </div>
          </div>

          <div className={styles.stageWrap} aria-label="Animated Numo cans">
            <div className={styles.stageShell}>
              <CanScene />
            </div>
            <span
              className={styles.sparkle}
              data-sparkle
              style={{ left: "4%", top: "12%" }}
            />
            <span
              className={styles.sparkle}
              data-sparkle
              style={{ right: "10%", top: "24%" }}
            />
            <span
              className={styles.sparkle}
              data-sparkle
              style={{ left: "26%", bottom: "5%" }}
            />
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <span>
          SCAN PLAY WIN&nbsp; NUMO SPARKLING&nbsp; SUMMER IN A CAN&nbsp;{" "}
        </span>
        <span>
          SCAN PLAY WIN&nbsp; NUMO SPARKLING&nbsp; SUMMER IN A CAN&nbsp;{" "}
        </span>
      </div>

      <section id="flavors" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className="mb-10 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <p className="text-xl leading-tight uppercase" data-reveal>
              three sparkling moods
            </p>
            <h2
              className="text-5xl leading-none font-black tracking-normal md:text-8xl"
              data-reveal
            >
              Light flavours, loud personality.
            </h2>
          </div>

          <div className={styles.flavorGrid}>
            {flavors.map((flavor) => (
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
                <p className="mb-3 text-lg font-black uppercase">
                  0{flavors.indexOf(flavor) + 1}
                </p>
                <h3 className="text-5xl leading-none font-black tracking-normal">
                  {flavor.name}
                </h3>
                <p className="mt-5 max-w-xs text-2xl leading-tight">
                  {flavor.text}
                </p>
                <span className={styles.flavorIcon} aria-hidden="true">
                  {flavor.icon}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storyBand}>
        <div className={styles.storyCard} data-reveal>
          <p className="mb-8 text-xl uppercase">packaging system</p>
          <h2 className="max-w-5xl text-5xl leading-none font-black tracking-normal md:text-8xl">
            Built for shelf impact, made to feel collectible.
          </h2>
        </div>
        <div className={styles.storyCard} data-reveal>
          <p className="text-2xl leading-tight md:text-4xl">
            Each can becomes a small game ticket: scan, play, unlock flavours,
            collect points. The motion language stays bouncy, tactile, and
            slightly imperfect, like cold cans rolling around in a beach cooler.
          </p>
        </div>
      </section>

      <footer id="shop" className={styles.footer}>
        <div>
          <p className="text-7xl leading-none font-black tracking-normal md:text-9xl">
            NUMO
          </p>
          <p className="mt-4 max-w-xl text-2xl leading-tight">
            Sparkling cans for bright breaks, beach walks, and small wins.
          </p>
        </div>
        <a className={styles.pillButton} data-magnetic href="/numo">
          Back to top
        </a>
      </footer>
    </main>
  );
}
