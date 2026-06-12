"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/text-reveal";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CanScene } from "./CanScene";

const pageBackground = {
  background:
    "radial-gradient(circle at 12% 8%, rgb(255 255 255 / 0.72), transparent 16rem), radial-gradient(circle at 82% 16%, rgb(245 221 77 / 0.48), transparent 18rem), linear-gradient(180deg, #75d1ef 0%, #eaf8fa 46%, #fbf2cf 100%)",
} satisfies CSSProperties;

const waterBackground = {
  background:
    "radial-gradient(ellipse at 20% 20%, rgb(255 255 255 / 0.85), transparent 16%), radial-gradient(ellipse at 80% 35%, rgb(255 255 255 / 0.45), transparent 20%), linear-gradient(135deg, #5cc7ec 0%, #2d9cc7 45%, #96e3ef 100%)",
} satisfies CSSProperties;

const waterLayerBackground = {
  backgroundImage:
    "repeating-linear-gradient(115deg, transparent 0 1.8rem, rgb(255 255 255 / 0.38) 1.9rem 2rem), repeating-linear-gradient(35deg, transparent 0 2.4rem, rgb(255 255 255 / 0.28) 2.5rem 2.65rem)",
} satisfies CSSProperties;

const storyCardBackground = {
  background:
    "radial-gradient(circle at 20% 20%, rgb(255 255 255 / 0.55), transparent 13rem), #fbf2cf",
} satisfies CSSProperties;

const buttonBase =
  "relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#17110f] px-4 py-3 font-black text-inherit no-underline transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:-rotate-1 hover:shadow-[0_0.65rem_0_#17110f]";

const pillButton = `${buttonBase} bg-[#f5dd4d] shadow-[0_0.35rem_0_#17110f]`;
const ghostButton = `${buttonBase} bg-white/30 backdrop-blur-[18px]`;

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

      gsap.to("[data-water-layer='primary']", {
        xPercent: 8,
        yPercent: 5,
        rotate: 2,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-water-layer='secondary']", {
        xPercent: -8,
        yPercent: -5,
        rotate: -2,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

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
      className="relative min-h-screen overflow-hidden bg-[#fbf2cf] [font-family:'PP_Neue_Montreal_Medium','Arial_Rounded_MT_Bold',Arial,sans-serif] text-[#17110f]"
      data-loaded={isLoaded}
      data-numo-smooth-wrapper
      style={pageBackground}
    >
      <div
        aria-hidden={isLoaded}
        className="fixed inset-0 z-60 grid place-items-center bg-[#fbf2cf] text-[#17110f]"
        data-numo-loader
      >
        <div className="overflow-hidden text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-normal">
          <span className="block" data-loader-word>
            NUMO
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-3 opacity-0"
        data-can-stage
      >
        <CanScene />
      </div>

      <div
        ref={contentRef}
        className="relative min-h-screen"
        data-numo-smooth-content
      >
        <section className="relative isolate min-h-dvh p-5">
          <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={waterBackground}
          >
            <div
              className="absolute -inset-1/4 opacity-35 blur-[1px]"
              data-water-layer="primary"
              style={waterLayerBackground}
            />
            <div
              className="absolute -inset-1/4 rotate-[10deg] opacity-20 blur-[1px]"
              data-water-layer="secondary"
              style={waterLayerBackground}
            />
          </div>

          <nav
            className="relative z-5 flex items-center justify-between text-[#17110f]"
            data-entry
          >
            <a
              className="text-3xl leading-none font-black tracking-normal"
              href="/numo"
            >
              NUMO
            </a>
            <div className="flex items-center gap-3 text-sm font-black uppercase md:text-base">
              <a className={ghostButton} data-magnetic href="#flavors">
                Flavours
              </a>
              <a className={pillButton} data-magnetic href="#shop">
                Scan Play Win
              </a>
            </div>
          </nav>

          <div className="grid min-h-[calc(100dvh-5rem)] grid-cols-1 items-end gap-6 pt-8 md:grid-cols-[minmax(0,0.92fr)_minmax(26rem,1fr)] md:items-center md:gap-0 md:pt-0">
            <div className="relative z-5">
              <TextReveal
                className="max-w-[9ch] text-[clamp(4.8rem,16vw,16rem)] leading-[0.78] tracking-normal"
                delay={2.05}
                duration={1.05}
                text="NUMO"
              />
              <div className="mt-8 grid gap-5 md:max-w-xl md:grid-cols-[1fr_auto] md:items-end">
                <TextReveal
                  as="p"
                  className="max-w-[34rem] text-[clamp(1.15rem,2vw,1.7rem)] leading-[1.08]"
                  delay={2.25}
                  duration={0.9}
                  text="A playful sparkling drink brand built around joy, bold labels, tiny games, fresh fruit, and the easy feeling of opening something bright."
                />
                <a
                  className={pillButton}
                  data-entry
                  data-magnetic
                  href="#flavors"
                >
                  Explore the fizz
                </a>
              </div>
            </div>

            <div className="min-h-[42vh] md:min-h-[76vh]" />
          </div>
        </section>

        <section
          id="flavors"
          className="relative z-5 min-h-dvh px-5 py-[clamp(5rem,10vw,10rem)]"
        >
          <div className="mx-auto mb-[clamp(2rem,5vw,4rem)] grid max-w-[88rem] gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
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

          <div className="mx-auto grid max-w-[88rem] gap-4 md:grid-cols-3 md:pr-[38vw]">
            {flavors.map((flavor, index) => (
              <article
                className="group relative min-h-96 overflow-hidden rounded-3xl border-2 border-[#17110f] p-5 transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-3 hover:rotate-[var(--tilt)] hover:shadow-[0_1rem_0_#17110f]"
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
                <span
                  className="absolute -right-4 -bottom-4 text-[12rem] leading-none transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.08] group-hover:rotate-6"
                  aria-hidden="true"
                >
                  {flavor.icon}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-5 grid gap-4 border-y-2 border-[#17110f] bg-[#f8dce8] p-4 md:grid-cols-[1.15fr_0.85fr]">
          <div
            className="min-h-88 rounded-3xl border-2 border-[#17110f] p-[clamp(1.25rem,4vw,3rem)]"
            data-reveal
            style={storyCardBackground}
          >
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
          <div
            className="min-h-88 rounded-3xl border-2 border-[#17110f] p-[clamp(1.25rem,4vw,3rem)]"
            data-reveal
            style={storyCardBackground}
          >
            <TextReveal
              as="p"
              className="text-2xl leading-tight md:text-4xl"
              scroll
              text="Each can becomes a small game ticket: scan, play, unlock flavours, collect points. The motion language stays bouncy, tactile, and slightly imperfect, like cold cans rolling through a beach cooler."
            />
          </div>
        </section>

        <footer
          id="shop"
          className="relative z-5 grid gap-8 border-t-2 border-[#17110f] bg-[#17110f] px-5 py-[clamp(2rem,5vw,5rem)] text-[#fbf2cf] md:grid-cols-[1fr_auto] md:items-end"
        >
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
            className={`${pillButton} self-end text-[#17110f]`}
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
