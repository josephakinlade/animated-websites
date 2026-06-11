"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const parallaxWrappers =
        gsap.utils.toArray<HTMLDivElement>(".product-parallax");

      parallaxWrappers.forEach((wrapper) => {
        const triggerContainer = wrapper.parentElement;
        if (!triggerContainer) return;

        gsap.fromTo(
          wrapper,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: triggerContainer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white px-7 py-24 text-neutral-900 md:px-[5.333vw] md:py-40"
    >
      {/* Header Grid */}
      <div className="grid gap-12 md:grid-cols-12 pb-12">
        <p className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:col-span-3 md:text-[max(1.4vw,20px)]">
          Custo is the very first smart mailbox of its kind.
        </p>
        <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:col-span-7 md:col-start-6 md:text-[max(4vw,40px)]">
          Never worry about a delivery again, Custo is here.
        </h2>
      </div>
      {/* Product Images Grid */}
      <div className="grid grid-cols-6 gap-6 md:grid-cols-12">
        <div className="col-span-6 md:col-span-8">
          <a
            href="/custo-1"
            className="group block hover:cursor-none"
            data-cursor="arrow"
          >
            {/* Added group-hover:scale-[0.98] to shrink the card */}
            <div className="relative aspect-[885/750] overflow-hidden rounded-lg bg-neutral-100 transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:rounded-2xl">
              <div className="product-parallax absolute -top-[10%] right-0 -bottom-[10%] left-0 will-change-transform">
                <Image
                  src="/custo/product.jpg"
                  alt="Custo 1 Smart Parcel Box"
                  fill
                  className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl font-medium md:text-3xl">Custo 1</span>
              <span className="text-lg text-neutral-500">From €1.599</span>
            </div>
          </a>
        </div>

        {/* Secondary Lifestyle Image (Right) */}
        <div className="col-span-6 mt-12 md:col-span-4 md:mt-0">
          <div className="group">
            {/* Added group-hover:scale-[0.98] to shrink the card */}
            <div className="relative aspect-[430/565] overflow-hidden rounded-lg bg-neutral-100 transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:rounded-2xl">
              <div className="product-parallax absolute -top-[10%] right-0 -bottom-[10%] left-0 will-change-transform">
                <Image
                  src="/custo/designer.jpg"
                  alt="Custo design detail"
                  fill
                  className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
