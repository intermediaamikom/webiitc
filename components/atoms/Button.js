import React from "react";
import { variant } from "@/utils/utils";
const Button = ({ color, size, additionals, isSquare = false, ...props }) => {
  const button = variant(
    `${isSquare ? "rounded-md" : "rounded-full"} ${additionals}`,
    {
      color: {
        red: "text-red bg-red/10 ",
        bluelight: "bg-blue-600/40 text-white hover:scale-95",
        blue: "bg-blue-600 text-white hover:scale-95",
        gradient2:
          "bg-gradient-to-br from-[#FFCC49] to-[#F37F00] text-white hover:scale-95",
        gradient:
          "bg-gradient-to-r from-oren to-kuning text-white hover:scale-95",
        silver: "bg-silver/20 text-black",
        white: "bg-white text-softyellow hover:bg-kuning hover:text-white",
        orentransparent: "bg-oren/10 text-oren hover:shadow-lg",
        brown: "bg-[#E9A319] py-2 text-white hover:scale-95 ttransition-all duration-300",
        oren: "bg-orange-500 py-2  text-white  hover:scale-95 ttransition-all duration-300",
        dark: "bg-slate-800  text-white hover:scale-95 ttransition-all duration-300",
        green: "bg-green-400/20 text-green-400",
        outlinedark:
          "bg-white border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white",
      },
      size: {
        sm: "px-5 py-1 text-sm font-semibold  ",
        base: "px-4 py-2",
        md: "lg:px-8 py-2 font-semibold px-4",
        lg: "lg:px-10 lg:py-3 px-4 py-2 text-lg font-bold ",
      },
    }
  );
  return (
    <button
      className={`transition-all cursor-default lg:cursor-pointer duration-300 ${button(
        { color, size }
      )}`}
      {...props}
    />
  );
};
Button.defaultProps = {
  color: "brown",
  size: "md",
};
export default Button;
