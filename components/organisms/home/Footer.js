import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import Text from "@/components/atoms/Text";
import Container from "@/components/molecules/Container";
import NavLink from "@/components/molecules/NavLink";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  const githubUrl = "https://github.com/";
  const developers = [
    {
      name: "Adrian",
      githubUrl: githubUrl + "rianmz-genz",
    },
    {
      name: "Didi",
      githubUrl: githubUrl + "prasetyodidi",
    },
    {
      name: "Taufik",
      githubUrl: githubUrl + "Taufik-H",
    },
  ];
  return (
    <footer className="bg-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center  gap-3   ">
          <div className="bg-white flex justify-center items-center rounded-full w-[60px] h-[60px]">
            <Image
              src="/images/LOGO/amikom.png"
              alt="logo footer"
              width={20}
              height={20}
              priority
              className="w-10 p-2 object-contain "
            />
          </div>
          <div className="bg-white flex justify-center items-center rounded-full w-[60px] h-[60px]">
            <Image
              src="/images/LOGO/logofix2025.png"
              alt="logo footer"
              className="w-full"
              width={20}
              height={20}
              priority
            />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-slate-100">
          menyaring generasi muda yang penuh potensi dalam industri dengan
          kompetisi yang sportif
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-slate-300 transition hover:text-slate-300/75"
              href="#about"
            >
              About
            </a>
          </li>

          <li>
            <a
              className="text-slate-300 transition hover:text-slate-300/75"
              href="#skema"
            >
              Skema
            </a>
          </li>

          <li>
            <a
              className="text-slate-300 transition hover:text-slate-300/75"
              href="#lomba"
            >
              Lomba
            </a>
          </li>

          <li>
            <a
              className="text-slate-300 transition hover:text-slate-300/75"
              href="timeline"
            >
              Timeline
            </a>
          </li>

          <li>
            <a
              className="text-slate-300 transition hover:text-slate-300/75"
              href="#faq"
            >
              FAQ
            </a>
          </li>
        </ul>

        <ul className="mt-12 flex justify-center items-center gap-6 md:gap-8">
          {/* <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-slate-300 transition hover:text-slate-300/75"
            >
              <span className="sr-only">Tiktok</span>
              <FaTiktok size={21} />
            </a>
          </li> */}

          <li>
            <a
              href="https://www.instagram.com/iitc_intermedia/"
              rel="noreferrer"
              target="_blank"
              className="text-slate-300 transition hover:text-slate-300/75"
            >
              <span className="sr-only">Instagram</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="mailto:iitc.intermedia@gmail.com"
              rel="noreferrer"
              target="_blank"
              className="text-slate-300 transition hover:text-slate-300/75"
            >
              <span className="sr-only">Email</span>
              <BiMailSend size={26} />
            </a>
          </li>

          <li>
            <a
              href="https://wa.me/6285133711081"
              rel="noreferrer"
              target="_blank"
              className="text-slate-300 transition hover:text-slate-300/75"
            >
              <span className="sr-only">Whatsapp</span>
              <IoLogoWhatsapp size={23} />
            </a>
          </li>
        </ul>
      </div>

      {/* copyright */}

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 border-t border-slate-700">
        <p className="mt-4 text-center text-sm text-white lg:mt-0 ">
          Copyright &copy; 2025. intermedia All rights reserved.
          {/* <span className="font-bold mx-1">sincerity</span>
          by
          {developers.map(({ githubUrl, name }, i) => (
            <Link
              className="mx-1 text-blue-500 underline"
              key={i}
              href={githubUrl}
              target="_blank"
            >
              {name} {i != developers.length - 1 ? "," : "."}
            </Link>
          ))} */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
