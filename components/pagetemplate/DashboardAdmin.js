import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiCategoryAlt, BiLogOutCircle } from "react-icons/bi";
import { CgEditBlackPoint } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter, withRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
const DashboardAdminTemplate = ({ title, children, props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  const handleLogout = () => {
    Cookies.remove("adminKey");
    router.replace("/admin");
  };
  const nav = [
    {
      href: "/admin/dashboard",
      label: (
        <>
          <LuLayoutDashboard /> <p>Dashboard</p>
        </>
      ),
    },
    {
      href: "/admin/users",
      label: (
        <>
          <FaUserCircle /> <p>Users</p>
        </>
      ),
    },
    {
      href: "/admin/teams",
      label: (
        <>
          <RiTeamLine /> <p>Tim</p>
        </>
      ),
    },
    {
      href: "/admin/competition",
      label: (
        <>
          <CgEditBlackPoint /> <p>Lomba</p>
        </>
      ),
    },
    {
      href: "/admin/competitioncategories",
      label: (
        <>
          <BiCategoryAlt /> <p>Kategori Lomba</p>
        </>
      ),
    },
    {
      href: "/admin/event",
      label: (
        <>
          <MdOutlineEventNote /> <p>Event</p>
        </>
      ),
    },
  ];
  return (
    <>
      <main className="bg-slate-200 w-full min-h-screen flex lg:flex-row flex-col">
        <div className="lg:min-w-[240px] h-20 lg:h-0">
          <div className="bg-white lg:bg-transparent w-full   p-5    fixed  lg:hidden visible ">
            <button onClick={() => setIsOpen(!isOpen)} className="">
              {isOpen ? (
                <FiX className="text-2xl text-red" />
              ) : (
                <GiHamburgerMenu className="text-2xl text-brown" />
              )}
            </button>
          </div>
          <nav
            className={`${
              isOpen ? "block" : "lg:block hidden"
            } w-full lg:max-w-[250px] bg-white py-12 px-3 min-h-screen fixed flex flex-col items-center justify-start z-20`}
          >
            <Image
              className="w-28 mx-auto lg:mx-0"
              src={"/images/LOGO/logofix2025.png"}
              alt="logo iitc"
              width={1080}
              height={1080}
            />
            <hr className="border border-gray-400/10 w-full my-7" />
            <ul className="gap-3 flex flex-col w-full h-full">
              {nav?.map(({ label, href }, i) => (
                <li
                  key={i}
                  className={`w-full text-slate-600transition-all duration-200 ease-out `}
                >
                  <Link
                    href={href}
                    className={`${
                      pathname.startsWith(href)
                        ? " text-brown bg-orange-100  transition-all duration-200 ease-out"
                        : ""
                    } flex items-center gap-3 hover:text-brown  py-2 px-7 hover:bg-orange-100 rounded-xl  transition-all duration-200 ease-out`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <hr className="border border-gray-400/10 w-full my-4" />
              <button
                onClick={handleLogout}
                className="flex text-slate-600 items-center gap-3 hover:text-rose-500 px-7 hover:bg-rose-100 hover:border-rose-500 py-2 rounded-lg border border-slate-200 transition-all duration-200 ease-out"
              >
                <BiLogOutCircle />
                <p>Keluar</p>
              </button>
            </ul>
          </nav>
        </div>
        <div className="w-full py-8 gap-3 flex flex-col">{children}</div>
      </main>
    </>
  );
};

export default DashboardAdminTemplate;
