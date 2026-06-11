import type { ReactNode } from "react";
import styles from "../custo.module.css";

export function SecondaryLink({
  children,
  href = "#product",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      className={`${styles.secondaryLink} text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]`}
      href={href}
    >
      <span className={styles.secondaryLinkLabel}>
        {children}
      </span>
    </a>
  );
}
