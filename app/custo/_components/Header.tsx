import { PrimaryNavItem } from "@/components/primary-nav-item";
import { CustoLogo } from "./CustoLogo";

export function Header() {
  return (
    <header
      // data-speed="0.8"
      className="absolute top-0 right-0 left-0 z-30 px-7 pt-6 pb-[2.3125rem] text-white md:px-[5.3333333333vw] md:pt-[2.3125rem]"
    >
      <nav className="flex items-center justify-between text-white">
        <a href="#" aria-label="Custo home">
          <CustoLogo className="h-auto w-[7.6875rem] fill-current md:w-[10.5rem]" />
        </a>
        <ul className="hidden items-center text-[max(1.4vw,20px)] leading-[1.4285714286] md:flex">
          <PrimaryNavItem type="button">Smart mailboxes</PrimaryNavItem>
          <PrimaryNavItem href="#life">How it works</PrimaryNavItem>
          <PrimaryNavItem href="#app">The app</PrimaryNavItem>
          <PrimaryNavItem href="#about">About</PrimaryNavItem>
        </ul>
        <a
          className="rounded-[2.5rem] bg-white/15 px-[1.3125rem] py-[0.5625rem] text-[max(5.3333333333vw,20px)] leading-[1.4285714286] transition-colors hover:bg-white hover:text-black md:rounded-[2.2vw] md:px-[2.5625rem] md:pt-[1.0625rem] md:pb-[1.1875rem] md:text-[max(1.4vw,20px)]"
          href="#product"
        >
          Order now
        </a>
      </nav>
    </header>
  );
}
