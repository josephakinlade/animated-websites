import Image from "next/image";
import styles from "../custo.module.css";

export function ProductSection() {
  return (
    <section id="product" className="px-7 py-24 md:px-[5.333vw] md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <p className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:col-span-3 md:text-[max(1.4vw,20px)]">
          Custo is the very first smart mailbox of its kind.
        </p>
        <h2 className="text-[max(10.1333333333vw,38px)] leading-[1.046875] md:col-span-7 md:col-start-6 md:text-[max(4vw,40px)]">
          Never worry about a delivery again, Custo is here.
        </h2>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-12">
        <a className="group md:col-span-8" href="#app">
          <div
            className={`${styles.imageReveal} relative aspect-[1770/1500] rounded-lg`}
          >
            <Image
              className="object-cover"
              src="/custo/product.jpg"
              alt="Custo 1 smart parcel box"
              fill
              sizes="(max-width: 768px) 100vw, 62vw"
            />
          </div>
          <div className="mt-6 flex items-baseline justify-between text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
            <span className="text-[max(8vw,30px)] leading-[1.25] md:text-[max(2.6666666667vw,30px)]">
              Custo 1
            </span>
            <span className="text-neutral-500">From EUR 1.599</span>
          </div>
        </a>
        <div className="hidden md:col-span-4 md:block">
          <div
            className={`${styles.imageReveal} relative aspect-[860/1130] rounded-lg`}
          >
            <Image
              className="object-cover"
              src="/custo/designer.jpg"
              alt="Designer standing beside a Custo mailbox"
              fill
              sizes="31vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
