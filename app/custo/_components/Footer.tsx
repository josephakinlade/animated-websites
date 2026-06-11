import Image from "next/image";
import { footerGroups, footerLinks } from "../data";
import { CustoLogo } from "./CustoLogo";
import { SocialIcon, type SocialType } from "./SocialIcon";

const socialTypes: SocialType[] = ["facebook", "instagram", "linkedin", "x"];
const [discoverGroup, ...secondaryFooterGroups] = footerGroups;

function FooterLinkGroup({ group }: { group: (typeof footerGroups)[number] }) {
  return (
    <div>
      <h2 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
        {group.title}
      </h2>
      <ul className="mt-[1.125rem] text-[max(5.3333333333vw,20px)] leading-[1.619047619] text-neutral-500 md:text-[max(1.4vw,20px)]">
        {group.links.map((link) => (
          <li key={link}>
            <a
              className="border-b border-transparent transition-colors hover:border-current hover:text-black"
              href="#"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-[3.4375rem] border-t border-[#d8d8d8] px-7 pt-[4.875rem] pb-0 md:mt-[6.875rem] md:px-[5.333vw] md:pt-[6.875rem]">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-2">
          <CustoLogo className="w-36 fill-current" />
          <p className="mt-[2.125rem] text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
            Never worry about a parcel delivery again.
          </p>
        </div>

        <div className="grid gap-10 md:col-span-5 md:col-start-4 md:grid-cols-2 md:px-10">
          <FooterLinkGroup group={discoverGroup} />
          <div className="space-y-[30px]">
            {secondaryFooterGroups.map((group) => (
              <FooterLinkGroup group={group} key={group.title} />
            ))}
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 className="text-[max(5.3333333333vw,20px)] leading-[1.4285714286] md:text-[max(1.4vw,20px)]">
            Subscribe to our newsletter.
          </h2>
          <p className="mt-5 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] text-neutral-500 md:text-[max(1.4vw,20px)]">
            Want to stay up to date with news and updates about our product?
            Subscribe.
          </p>
          <form className="relative mt-[1.875rem] mb-5" action="#">
            <label className="sr-only" htmlFor="custo-newsletter">
              Email address
            </label>
            <input
              className="h-[4.625rem] w-full rounded-lg border border-[#d8d8d8] bg-transparent px-8 pr-28 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] outline-none placeholder:text-[#b3b3b3] focus:border-black md:text-[max(1.4vw,20px)]"
              id="custo-newsletter"
              type="email"
              name="email"
              placeholder="email@provider.com"
              required
            />
            <button
              className="absolute top-0 right-0 flex h-[4.625rem] items-center justify-center rounded-lg px-8 text-[max(5.3333333333vw,20px)] leading-[1.4285714286] transition-colors hover:bg-[#d8d8d8] md:text-[max(1.4vw,20px)]"
              type="submit"
              aria-label="Subscribe"
            >
              <span>→</span>
            </button>
          </form>
          <p className="mt-5 text-[max(3.7333333333vw,14px)] leading-[1.375] text-neutral-400 md:text-[max(1.0666666667vw,14px)]">
            By subscribing to our newsletter you agree to our privacy policy and
            will get commercial communication.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-end gap-0">
        <Image
          className="mr-[5px] mb-[5px] h-[65px] w-auto"
          src="/custo/ces-award.png"
          alt="CES Innovation Awards 2024 honoree"
          width={154}
          height={212}
        />
        <Image
          className="h-auto w-[130px]"
          src="/custo/red-dot-winner.png"
          alt="Red Dot winner award"
          width={1613}
          height={945}
        />
      </div>

      <div className="mt-[2em] flex flex-col gap-8 border-t border-[#d8d8d8] py-[1.875rem] md:flex-row md:items-center md:justify-between md:py-[3.375rem]">
        <div className="flex w-full flex-wrap items-center md:w-auto">
          <div className="relative w-full md:w-auto">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-4 h-[1.5625rem] w-[1.5625rem] -translate-y-1/2 rounded-full bg-neutral-400"
            />
            <select
              className="w-full appearance-none rounded-[0.4375rem] border border-[#d8d8d8] bg-white py-4 pr-[3.75rem] pl-[3.25rem] text-[max(5.3333333333vw,20px)] leading-[1.4285714286] outline-none focus:border-black md:w-auto md:text-[max(1.4vw,20px)]"
              aria-label="Language"
              defaultValue="English"
            >
              <option>English</option>
              <option>Français</option>
              <option>Nederlands</option>
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-[1.125rem] h-[0.5625rem] w-[0.9375rem] -translate-y-1/2 text-[#c7c7c7]"
            >
              <svg viewBox="0 0 15 9" className="h-full w-full fill-current">
                <path d="M0 1.414 1.414 0 7.32 5.904 13.223 0l1.414 1.414L7.32 8.733 0 1.414Z" />
              </svg>
            </span>
          </div>
          <ul className="mx-auto mt-6 flex items-center md:mt-0 md:ml-[3.375rem]">
            {socialTypes.map((type) => (
              <li className="ml-[1.125rem] first:ml-0" key={type}>
                <a
                  className="block text-[#8e9194] transition-colors hover:text-black"
                  href="#"
                  aria-label={type}
                >
                  <SocialIcon type={type} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mx-auto flex flex-wrap items-center justify-center text-center text-[max(5.0666666667vw,19px)] leading-[1.4210526316] text-[#8e9194] md:mx-0 md:text-[max(1.2666666667vw,19px)]">
          <li className="mx-5 max-md:last:mr-5 md:last:mr-0">
            <Image
              src="/custo/logo-vlaanderen.jpg"
              alt="Logo Vlaanderen"
              width={50}
              height={50}
            />
          </li>
          {footerLinks.map((link) => (
            <li className="mx-5 max-md:last:mr-5 md:last:mr-0" key={link}>
              <a
                className="border-b border-transparent transition-colors hover:border-current hover:text-black"
                href="#"
              >
                {link}
              </a>
            </li>
          ))}
          <li className="mx-5 max-md:last:mr-5 md:last:mr-0">© Custo 2026</li>
        </ul>
      </div>
    </footer>
  );
}
