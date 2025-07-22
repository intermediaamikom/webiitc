import React from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import Marquee from "react-fast-marquee";

const sponsors = [
  { src: "/images/Sponsor/Mieayam.jpg", alt: "Sponsor Mie Ayam" },
  { src: "/images/Sponsor/rumahweb.png", alt: "Sponsor Rumahweb" },
  { src: "/images/Sponsor/dicoding.png", alt: "Sponsor Dicoding" },
  { src: "/images/Sponsor/purbasari.jpeg", alt: "Sponsor Purbasari" },
  { src: "/images/Sponsor/sanggaluri.png", alt: "Sponsor Sanggaluri" },
];

const SupportSection = () => {
  return (
    <div className="py-12 bg-gray-50 antialiased">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8 flex items-center justify-center gap-2">
          <AiFillHeart className="text-green-500" />
          Supported by
        </h2>
      </div>

      <div className="w-full">
        <Marquee
          autoFill
          speed={50}
          direction="left"
          pauseOnHover
          className="py-4"
        >
          {sponsors.map((sponsor, index) => (
            <div key={index} className="mx-8 flex justify-center items-center">
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                width={150}
                height={80}
                className="object-contain h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SupportSection;
