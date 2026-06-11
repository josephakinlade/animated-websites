import type { ReactNode } from "react";

type PrimaryNavItemProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "link";
};

const triggerClassName =
  "group relative inline-block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-inherit no-underline outline-none [font:inherit] before:pointer-events-none before:absolute before:-bottom-[0.3125rem] before:left-0 before:h-px before:w-full before:translate-y-2.5 before:bg-current before:opacity-0 before:transition-[opacity,transform] before:duration-[600ms] before:ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:before:translate-y-0 hover:before:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

function PrimaryNavItemInner({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-block overflow-hidden">
      <span className="block transform-[translateZ(0)] transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:transform-[translateY(-100%)_translateZ(0)] group-hover:opacity-0">
        {children}
      </span>
      <span className="pointer-events-none absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)_translateY(100%)_translateZ(0)] whitespace-nowrap opacity-0 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:transform-[translate(-50%,-50%)_translateY(0%)_translateZ(0)] group-hover:opacity-100">
        {children}
      </span>
    </div>
  );
}

export function PrimaryNavItem({
  children,
  href = "#",
  type = "link",
}: PrimaryNavItemProps) {
  return (
    <li className="ml-12.5 first:ml-0">
      {type === "button" ? (
        <button className={triggerClassName} type="button">
          <PrimaryNavItemInner>{children}</PrimaryNavItemInner>
        </button>
      ) : (
        <a className={triggerClassName} href={href}>
          <PrimaryNavItemInner>{children}</PrimaryNavItemInner>
        </a>
      )}
    </li>
  );
}
