import React, { useRef } from "react";
import timelineData from "./timelineData";
import FlashParagraph from "@/components/atoms/FlashParagraph";
import TimelineModal from "./TimelineModal";

const Timeline = () => {
  const { importantDates, modalContent } = timelineData;
  const timelineRef = useRef(null);
  const timelineItems = [];

  importantDates.forEach((date, index) => {
    const keyDate = date.toISOString().split("T")[0];
    const content = modalContent[keyDate];
    if (content) {
      timelineItems.push(
        <TimelineModal
          key={index}
          importantDates={content.date}
          title={content.title}
          description={content.description}
        />
      );
    }
  });

  return (
    <div
      id="timeline"
      className={`p-10  bg-slate-600  flex   justify-center items-center flex-col w-full`}
    >
      <div className="flex flex-col gap-3 items-center text-center">
        <FlashParagraph value={"Don't forget your misson"} />
        <h1 className="text-md font-semibold text-white md:text-2xl lg:text-3xl">
          Timeline kami dalam lomba ini
        </h1>
        <p className="text-slate-300 mb-10">jangan sampai terlewat </p>
      </div>
      <div
        className={"flex w-full flex-wrap gap-5 justify-center items-start"}
        ref={timelineRef}
      >
        {timelineItems}
      </div>
    </div>
  );
};

export default Timeline;
