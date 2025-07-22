import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <div className="relative flex md:mt-5 lg:-mt-10 flex-col items-center overflow-hidden h-[200px] lg:h-[235px] p-20">
      <div className="relative bg-[#E9A319] py-2 shadow-lg transform rotate-6 md:rotate-3 lg:rotate-6 -mb-10 w-[110vw] -mx-10">
        <div className="border-t-2 border-b-2 border-white py-2">
          <Marquee
            autoFill
            speed={30}
            direction="left"
            className="text-white font-bold space-x-8"
          >
            <span className="mx-10 text-lg md:text-xl lg:text-2xl">
              IIT Competition
            </span>
          </Marquee>
        </div>

        <div className="absolute top-0 left-0 h-full w-16 lg:w-40 bg-gradient-to-r from-[#A86523] to-transparent pointer-events-none z-20"></div>

        <div className="absolute top-0 right-0 h-full w-16 lg:w-40 bg-gradient-to-l from-[#A86523] to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Bottom Marquee Section */}
      <div className="relative bg-[#E9A319] py-2 shadow-xl transform -rotate-6 md:-rotate-3 lg:-rotate-6 -mt-7 w-[110vw] -mx-10">
        <div className="border-t-2 border-b-2 border-white py-2">
          <Marquee
            autoFill
            speed={35}
            direction="right"
            className="text-white font-bold space-x-8"
          >
            <span className="mx-10 text-lg md:text-xl lg:text-2xl">
              IIT Competition
            </span>
          </Marquee>
        </div>
        <div className="absolute top-0 left-0 h-full w-16 lg:w-40 bg-gradient-to-r from-[#A86523] to-transparent pointer-events-none z-20"></div>
        <div className="absolute top-0 right-0 h-full w-16 lg:w-40 bg-gradient-to-l from-[#A86523] to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );
};

export default MarqueeSection;
