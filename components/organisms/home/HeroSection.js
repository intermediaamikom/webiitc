import React from "react";
import Navbar from "./Navbar";
import Container from "@/components/molecules/Container";
import { motion } from "framer-motion";
import HeroBackground from "@/components/atoms/HeroBackground";
import Text from "@/components/atoms/Text";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import NavLink from "@/components/molecules/NavLink";
import NavItem from "@/components/molecules/NavItem";
const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden lg:mt-24">
      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-50  lg:hidden">
        <HeroBackground />
      </div>
      <Container className="flex flex-col-reverse lg:flex-row h-[90vh] items-center justify-center z-10">
        <Navbar />
        <div className="w-11/12 mx-auto my-20 mt-[200px] sm:mt-[200px] md:mt-[300px] flex flex-col lg:mt-20  md:flex-row  md:items-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }} // added y here
            animate={{ opacity: 1, y: 0 }} // and here
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: "100",
              bounce: 0.3,
            }}
            className="font-black sm:min-w-[400px] text-center md:text-start text-slate-800 z-10 text-4xl md:text-3xl lg:text-5xl leading-10 w-11/12  md:w-6/12"
          >
            <div className=" text-center text-xs mx-auto md:mx-0 mb-5  w-fit px-3 border border-[#E9A319] py-1 rounded-full text-[#E9A319] bg-white">
              National IT Competition
            </div>
            Tunjukan pada{" "}
            <p className="md:my-5">
              Dunia{" "}
              <span className="text-transparent bg-gradient-to-tr from-[#A86523] to bg-[#E9A319] bg-clip-text">
                Bahwa Kamu
              </span>{" "}
            </p>
            Bisa
            <Text
              color={"dark"}
              additionals="text-center md:text-start my-5 max-w-2xl"
            >
              <span className="font-bold">IITC</span> adalah sebuah event
              nasional yang diselenggarakan oleh Unit kegiatan mahasiswa
              INTERMEDIA{" "}
              <span className="font-bold">Universitas Amikom Purwokerto</span>
            </Text>
            <div className="flex items-center justify-center md:justify-start gap-x-3">
              <Link href={"/signup"}>
                <Button additionals={"text-[20px] lg:py-3"}>
                  Daftar Sekarang
                </Button>
              </Link>
              <NavItem additionals={"-mt-1 font-semibold "}>
                <NavLink target="#skema">Learn More</NavLink>
              </NavItem>
            </div>
          </motion.div>

          <div className="flex w-full h-full justify-center max-w-3xl ">
            <div className="absolute inset-0 -z-10 hidden   right-10 lg:block">
              <HeroBackground />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="hidden md:block md:w-7/12 md:bg-contain  self-start w-full object-cover bg-red-500 -ml-5 lg:-ml-0 lg:-mr-44"
            >
              <Image
                src={"/images/LOGO/logofix2025.png"}
                alt="Gambar Tunjukan Skill"
                width={1080}
                height={1080}
                className="min-w-[300px]"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
