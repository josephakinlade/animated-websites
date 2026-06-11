import Image from "next/image";
import styles from "../custo.module.css";
import { discoverImages } from "../data";
import { SecondaryLink } from "./SecondaryLink";

export function DiscoverSection() {
  return (
    <section className="px-7 py-24 md:px-[5.333vw] md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
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

      <div className="mt-20 overflow-hidden">
        <div className={`${styles.sliderTrack} flex w-max gap-6`}>
          {[...discoverImages, ...discoverImages].map((image, index) => (
            <div
              className={`${styles.imageReveal} relative aspect-[1090/740] w-[78vw] shrink-0 rounded-lg md:w-[38vw]`}
              key={`${image.src}-${index}`}
            >
              <Image
                className="object-cover"
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 78vw, 38vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-12 md:grid-cols-12">
        <div className="space-y-12 md:col-span-5 md:col-start-6">
          <div>
            <h3 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
              Smart technology at your front door.
            </h3>
            <p className="mt-4 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
              Codes, smart bells or special door locks are a thing of the past.
              Custo opens by scanning the parcel barcode and checking more than
              1500 couriers through its 4G connection.
            </p>
          </div>
          <div>
            <h3 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
              Always a secure delivery option with Custo.
            </h3>
            <p className="mt-4 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
              Free up more time for family, friends, sports, hobbies and travel
              without stress about missing a delivery. There is even a slot for
              letters and newspapers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
