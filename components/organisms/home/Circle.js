import React, { useState, useEffect } from "react";
import TimelineModal from "./TimelineModal";
import { endDate, startDate } from "./timelineData";

function Circle({ date, currentPercentage, modalContent, importantDates }) {
  const [percentage, setPercentage] = useState(0);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    setPercentage(
      Math.round(((date - startDate) / (endDate - startDate)) * 100)
    );
    setIsToday(new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0));
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isImportantDate = importantDates.some(
    (importantDate) => importantDate.getTime() === date.getTime()
  );

  const showTooltip = (isHovered || isClicked || isToday) && isImportantDate;
  const isFirstIndex = date === importantDates[0] && importantDates[1];
  const isAtLastIndex = date === importantDates[importantDates.length - 1];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`absolute flex  w-4 h-4 ${
        currentPercentage >= percentage ? "bg-[#FCEFCB]" : "bg-slate-800"
      } rounded-full flex items-center  justify-center lg:cursor-pointer`}
      style={{ marginLeft: `${percentage}%` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* circle inside */}
      <div
        className={`${
          isClicked || isHovered ? "bg-yellow-300" : "bg-yellow-200"
        } w-2 h-2 rounded-full `}
      ></div>

      {/* Tooltip */}
      <div className="relative">
        {showTooltip && modalContent && (
          <TimelineModal
            click={handleClick}
            className={`absolute mt-5 ${
              isAtLastIndex
                ? "right-[50%]"
                : "-left-32 right-0" && isFirstIndex
                ? "left-[50%]"
                : "-left-[32%] right-0"
            }`}
            importantDates={modalContent?.date}
            title={modalContent?.title}
            description={modalContent?.description}
          />
        )}
      </div>
    </div>
  );
}

export default Circle;
