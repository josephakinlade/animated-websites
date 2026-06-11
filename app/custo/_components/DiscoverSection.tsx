"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { discoverImages } from "../data";
import { SecondaryLink } from "./SecondaryLink";

export function DiscoverSection() {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="relative z-20 overflow-x-hidden bg-[#fbfbfb] py-24 text-neutral-900 md:py-40">
      {/* 2. Added the horizontal padding explicitly to the text grid */}
      <div className="grid gap-12 px-7 md:grid-cols-12 md:px-[5.333vw]">
        <p className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:col-span-3 md:text-[max(1.4vw,20px)]">
          Never let a parcel delivery rule your entire schedule again.
        </p>
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:text-[max(4vw,40px)]">
            Spending time looking for your parcel around the neighbourhood is a
            thing of the past. That is a promise.
          </h2>
          <div className="mt-10 max-w-md">
            <SecondaryLink>Discover our smart mailbox</SecondaryLink>
          </div>
        </div>
      </div>

      {/* 3. The Embla Viewport now spans 100% of the screen width */}
      <div
        className="mt-20 w-full cursor-grab overflow-hidden active:cursor-grabbing"
        ref={emblaRef}
      >
        {/* 4. Applied the container padding directly to the flex track */}
        <div className="flex w-full gap-6">
          {[...discoverImages].map((image, index, array) => {
            // 3. Dynamically calculate if it's the first or last item
            const isFirst = index === 0;
            const isLast = index === array.length - 1;

            return (
              <div
                id="image-reveal"
                className={`relative aspect-545/370 shrink-0 overflow-hidden rounded-lg bg-red-800 md:w-[38vw] ${isFirst ? "ml-7 md:ml-[5.333vw]" : ""} ${isLast ? "mr-7 md:mr-[5.333vw]" : ""} `}
                key={`${image.src}-${index}`}
              >
                <div
                  data-speed="0.9"
                  className="absolute top-[-15%] right-0 bottom-[-15%] left-0 will-change-transform"
                >
                  <Image
                    className="pointer-events-none object-cover"
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 78vw, 38vw"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Re-applied the horizontal padding to the bottom text blocks */}
      <div className="mt-24 grid gap-12 px-7 md:grid-cols-12 md:px-[5.333vw]">
        <div className="space-y-12 md:col-span-5 md:col-start-6">
          <div>
            <h3 className="text-xl leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
              Smart technology at your front door.
            </h3>
            <p className="mt-4 text-xl leading-[1.4285714286] text-[#8e9194] md:text-[max(1.4vw,20px)]">
              Codes, smart bells or special door locks are a thing of the past.
              The Custo® smart mailbox opens by scanning the barcode on the
              parcel, without knowing it upfront! No more extra work (both for
              yourself and the courier) because, thanks to our 4G connection we
              can do the necessary (API) check, for +1500 couriers, before
              opening the door...
            </p>
          </div>
          <div>
            <h3 className="text-xl leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
              Always a secure delivery option with Custo.
            </h3>
            <p className="mt-4 text-xl leading-[1.4285714286] text-[#8e9194] md:text-[max(1.4vw,20px)]">
              We are all busy. That&apos;s why Custo® works for you, not the other
              way around. This allows you to free up more time for what really
              matters: family, friends, sports, hobbies, travel, ... Without
              stress or worry about missing a delivery. And last but not least,
              we also created a slot (on the side) for all your letters and
              newspapers....
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
