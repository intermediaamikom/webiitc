import React, { useState } from "react";
import Text from "./Text";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import ModalSkema from "../organisms/home/ModalSkema";
import { motion } from "framer-motion";

const SkemaCard = ({
  imgUrl,
  title,
  description,
  buttonHref,
  buttonValue,
  modalDescription,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-[400px]  group w-full bg-white hover:bg-[#E9A319] border  md:border-none hover:shadow-2xl transition-all duration-700 p-5 pt-20 rounded-3xl flex flex-col justify-between"

    >
      <Image
        className="w-3/12 mx-auto drop-shadow-2xl"
        src={imgUrl}
        alt={`Image ${title}`}
        width={1080}
        height={1080}
      />

      <div className="lg:my-6 my-2">
        <Text
          size={"description"}
          weight={"bold"}
          additionals={
            "md:text-xs  lg:text-lg flex items-start justify-center group-hover:text-white bg-red-500 transition-all duration-200"
          }
        >
          {title}
        </Text>
        <Text
          size={"small"}
          additionals={
            "text-center group-hover:text-white transition-all duration-200"
          }
        >
          {description}
        </Text>
      </div>
      <button
        className="px-8 py-2 z-30 w-full cursor-default lg:cursor-pointer bg-slate-800 text-white group-hover:bg-white group-hover:text-orange-400 transition-all duration-200 rounded-full"
        onClick={handleOpenModal}
      >
        Lihat Detail
      </button>
      <div className="z-40">
        <ModalSkema
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
          description={description}
        >
          <h2
            id="modal-title"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {title}
          </h2>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {modalDescription ? modalDescription : ""}
            </p>
            {buttonHref && (
              <div className="mt-5">
                <Link href={buttonHref}>
                  <Button color={"orentransparent"}>{buttonValue}</Button>
                </Link>
              </div>
            )}
          </div>
        </ModalSkema>
      </div>
    </motion.div>
  );
};

export default SkemaCard;
