import Link from "next/link";
import { useState, useEffect } from "react";

const NavLink = ({ children, target, isSmall = false, isWhite = false }) => {
  const [isActive, setIsActive] = useState(false);
  const headerHeight = 92;
  useEffect(() => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      if (target === "#hero") {
        setIsActive(true);
      }
      window.addEventListener("scroll", () => {
        if (
          window.scrollY + headerHeight >
            targetElement.offsetTop - headerHeight &&
          window.scrollY <
            targetElement.offsetTop +
              targetElement.clientHeight -
              headerHeight -
              24
        ) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      });
    }
  }, [target]);
  return (
    <li>
      <Link
        scroll={false}
        href={target}
        className={`${
          isSmall ? "text-sm" : "text-xl"
        } text-poppins transition-all duration-300 ${
          isActive
            ? "font-semibold text-[#E9A319] dark:text-[#E9A319]"
            : "dark:hover:text-[#E9A319]"
        } ${
          isWhite
            ? "text-slate-900 dark:text-slate-900"
            : "text-black dark:text-black"
        } hover:text-[#E9A319]`}
        onClick={(e) => {
          e.preventDefault();
          if (document && window) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: "smooth",
              });
            }
          }
        }}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
