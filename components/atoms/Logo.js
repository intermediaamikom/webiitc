import Image from "next/image";
import React from "react";

const Logo = ({ children }) => {
  return (
    <Image
      className="w-28 p-0"
      src="/images/LOGO/logofix2025.png"
      width={900}
      height={900}
      alt="Logo IIT Competition"
      priority
    />
  );
};

export default Logo;
