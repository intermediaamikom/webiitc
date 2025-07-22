import React from "react";
import { RiFlashlightFill } from "react-icons/ri";
const FlashParagraph = ({ isHorizontal, value, className }) => {
  return (
    <div
      className={`${
        isHorizontal
          ? "flex space-x-2 items-center w-full"
          : "flex flex-col items-center space-y-2 w-full"
      } ${className}`}
    >
      <RiFlashlightFill className="text-lg text-[#E9A319]" />
      <p className="font-bold text-md  text-[#E9A319]">{value}</p>
    </div>
  );
};

export default FlashParagraph;
