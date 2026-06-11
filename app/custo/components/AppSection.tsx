import Image from "next/image";
import styles from "../custo.module.css";
import { appSteps } from "../data";

export function AppSection() {
  return (
    <section id="app" className="px-7 py-24 md:px-[5.333vw] md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-2">
          <div className="md:sticky md:top-24">
            <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:text-[max(4vw,40px)]">
              Custo&apos;s app is your personal assistant for all your parcels.
            </h2>
            <div className="mt-12 hidden space-y-10 md:block">
              {appSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12 md:col-span-5 md:col-start-7">
          {appSteps.map((step) => (
            <article key={step.title}>
              <div
                className={`${styles.imageReveal} relative aspect-[1090/1550] rounded-lg`}
              >
                <Image
                  className="object-cover"
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="mt-6 md:hidden">
                <h3 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
