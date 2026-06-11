import Image from "next/image";
import styles from "../custo.module.css";
import { lifeSteps } from "../data";
import { SecondaryLink } from "./SecondaryLink";

export function LifeSection() {
  return (
    <section id="life" className="px-7 py-24 md:px-[5.333vw] md:py-40">
      <div className="grid items-end gap-12 md:grid-cols-12">
        <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:col-span-7 md:text-[max(4vw,40px)]">
          Custo will integrate with your life seamlessly.
        </h2>
        <div className="md:col-span-3 md:col-start-10">
          <SecondaryLink>Discover how it works</SecondaryLink>
        </div>
      </div>

      <ol className="mt-16 divide-y divide-neutral-200">
        {lifeSteps.map((step) => (
          <li
            className={`${styles.stepCard} grid gap-6 py-8 md:grid-cols-12 md:items-center`}
            key={step.index}
          >
            <div className="md:col-span-3">
              <div className="relative aspect-[600/410] overflow-hidden rounded-lg">
                <Image
                  className="object-cover"
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 24vw"
                />
              </div>
            </div>
            <span className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:col-span-1 md:col-start-6 md:text-[max(1.4vw,20px)]">
              {step.index}
            </span>
            <h3 className="text-[max(8vw,30px)] leading-[1.25] md:col-span-6 md:text-[max(2.6666666667vw,30px)]">
              {step.title}
            </h3>
          </li>
        ))}
      </ol>
    </section>
  );
}
