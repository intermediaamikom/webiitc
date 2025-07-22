import React from "react";
import { BiGitBranch } from "react-icons/bi";

function TimelineModal({ title, description, importantDates }) {
  return (
    <div className="max-sm:max-w-full max-sm:w-full max-md:w-[calc(50%-1.25rem)] max-lg:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.25rem)] h-auto md:h-[88px]">
      <div className="h-full flex flex-col items-start justify-start bg-[#E9A319] border-b-8 border-slate-800 rounded-md overflow-hidden shadow-lg">
        <div className="flex p-2 text-white gap-3">
          <div className="p-2 bg-slate-800 rounded-md h-fit">
            <BiGitBranch size={35} />
          </div>
          <div className="flex flex-col">
            <p className=" font-bold text-xs uppercase">{importantDates}</p>
            <p className=" font-bold text-xs uppercase">{title}</p>
            <p className="text-white text-xs ">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineModal;
