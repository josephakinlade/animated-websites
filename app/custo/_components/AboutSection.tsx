import Image from "next/image";
import styles from "../custo.module.css";
import { SecondaryLink } from "./SecondaryLink";

export function AboutSection() {
  return (
    <section
      id="about"
      className="grid gap-12 px-7 py-24 md:grid-cols-12 md:px-[5.333vw] md:py-40"
    >
      <div className="md:col-span-6">
        <div
          className={`${styles.imageReveal} relative aspect-[1310/1710] rounded-lg`}
        >
          <Image
            className="object-cover"
            src="/custo/home-about.jpg"
            alt="Custo team member working on the smart mailbox design"
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-16 md:col-span-4 md:col-start-8">
        <div>
          <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:text-[max(4vw,40px)]">
            Custo was created by experts and investors with a unique vision of
            the future.
          </h2>
          <div className="mt-10 max-w-md">
            <SecondaryLink>Learn more about us</SecondaryLink>
          </div>
        </div>
        <div>
          <h3 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
            Custo is supported by investors.
          </h3>
          <p className="mt-4 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
            Our investors believe in a more sustainable delivery solution. Custo
            offers this option in the form of beautiful and innovative design.
          </p>
        </div>
      </div>
    </section>
  );
}
