import Image from "next/image";
import React, { useState } from "react";
import Text from "./Text";
import { HiOutlineUsers } from "react-icons/hi";
import Button from "./Button";
import { FiTrash } from "react-icons/fi";

const CompetitonCard = ({
  imgSrc,
  title,
  category,
  maxMembers,
  slug,
  setIsCompetitionDetail,
  setCompetitionName,
  isAdmin,
  onDelete,
  handleCLickButton,
}) => {
  const [isPopup, setIsPopup] = useState(false);
  // console.log(imgSrc);
  const handleViewDetailCompetition = () => {
    if (slug === "dummy") {
      setIsPopup(true);
      setTimeout(() => {
        setIsPopup(false);
      }, 3000);
    } else {
      window.scrollTo(0, 0);
      if (setIsCompetitionDetail != null && setCompetitionName != null) {
        setCompetitionName(slug);
        setIsCompetitionDetail(true);
      }
    }
  };
  //console.log(category, title);
  return (
    <div className="rounded-[30px] bg-slate-300 relative w-[300px] h-[400px] overflow-hidden shadow transition-all duration-300 hover:shadow-lg">
      {isAdmin && (
        <FiTrash
          onClick={onDelete}
          className="text-red cursor-pointer bg-red/20 text-3xl p-1 rounded absolute top-2 right-2"
        />
      )}
      <img
        className="w-full h-full object-cover"
        src={imgSrc}
        alt="Kucing"
        width={1080}
        height={1080}
      />

      <div className="absolute left-5 top-5 rounded-full bg-white px-4 pt-2 pb-1">
        <Text
          size={"smalltitle"}
          additionals={"text-slate-800"}
          weight={"semi"}
        >
          {title}
        </Text>
      </div>

      <div className="absolute left-5 right-5 bottom-5 rounded-full bg-white px-4 pt-2 pb-1 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <HiOutlineUsers className="text-dark" />
          <Text size={"description"} weight={"bold"}>
            {maxMembers} MAX
          </Text>
        </div>
        <Button
          additionals={"py-2"}
          onClick={isAdmin ? handleCLickButton : handleViewDetailCompetition}
          size={"sm"}
          color={"dark"}
        >
          {isAdmin ? "Edit" : "Lihat Detail"}
        </Button>
      </div>

      {isPopup && (
        <div className="absolute z-50 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-medium">
          <div className="bg-brown px-2 py-1 rounded-lg">
            Event belum dimulai
          </div>
        </div>
      )}

      {/* <div className="px-4 py-2 flex flex-col space-y-2">
        {category.map((item, index) =>
          index == 0
            ? item.name
            : index == category.length - 1
            ? ` & ${item.name}`
            : `, ${item.name}`
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <HiOutlineUsers className="text-dark" />
            <Text size={"small"}>{maxMembers} MAX</Text>
          </div>
          <Button
            additionals={"w-28 py-2"}
            onClick={isAdmin ? handleCLickButton : handleViewDetailCompetition}
            size={"sm"}
          >
            {isAdmin ? "Edit" : "Detail"}
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default CompetitonCard;
