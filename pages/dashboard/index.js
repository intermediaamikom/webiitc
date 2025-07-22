import GetMineTeam from "@/api/team/Mine";
import { Button } from "@/components";
import DashboardCard from "@/components/atoms/DashboardCard";
import Text from "@/components/atoms/Text";
import DashboardUserTemplate from "@/components/pagetemplate/DashboardUser";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiLock, FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { getTwoChar, PopUp } from "../team";
import Head from "next/head";
import AlertGroup from "@/components/atoms/AlertGroup";
import Image from "next/image";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const DashboardUser = () => {
  const [teams, setTeams] = useState([]);
  const [email, setEmail] = useState("");
  const [isGrupShowing, setIsGrupShowing] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  console.log(teams);
  const valid = Cookies.get("valid");
  useEffect(() => {
    GetMineTeam().then((res) => {
      setTeams(res.data?.teams);
      if (res.data?.teams.some((team) => team.isActive === "VALID")) {
        setIsGrupShowing(true);
      } else {
        setIsGrupShowing(false);
      }
    });

    setEmail(Cookies.get("email"));
  }, []);
  const handleIsPopUp = (data) => {
    setIsPopUp(data)
  }
  return (
    <>
      <Head>
        <title>IITC Dashboard</title>
        <meta name="title" content="IITC Dashboard" />
      </Head>
      <PopUp isModal={isPopUp} onClose={() => setIsPopUp(false)}>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/images/LOGO/logofix2025.png"}
            alt="logo iitc"
            width={1080}
            height={1080}
            className="w-20"
          />
          <Text
            size={"smalltitle"}
            additionals={"my-3"}
            color={"text-black"}
            weight={"bold"}
          >
            Pendaftaran Ditutup
          </Text>
          <Text additionals={"text-center"}>
            Pendaftaran untuk IIT Competition telah ditutup!
          </Text>
        </div>
      </PopUp>
      <DashboardUserTemplate>
        {/* {valid == "false" && (
          <div className="w-full h-screen z-50 bg-black/40 fixed top-0 left-0 backdrop-blur-md flex justify-center items-center">
            <div className="w-11/12 mx-auto max-w-[500px] p-6 text-center bg-white rounded flex items-center justify-center space-x-2">
              <FiLock className="text-xl" />
              <Text size={"smalltitle"} color={"dark"}>
                Verifikasi Email Terlebih Dahulu
              </Text>
            </div>
          </div>
        )} */}
        {isGrupShowing && (
          <div className="px-6 md:px-10 lg:px-12 mx-auto w-full">
            <AlertGroup />
          </div>
        )}
        <DashboardCard>
          <ul className="flex items-center gap-2">
            <Link href={"/"}>
              <BiHomeAlt className="text-gray-400" />
            </Link>
            <p>
              <MdArrowForwardIos className="text-xs text-gray-400" />
            </p>
            <p className="text-blue-600 text-sm">Lomba</p>
          </ul>
          <div className="flex justify-between space-y-2 lg:space-y-0 items-center mt-4 lg:flex-row flex-col">
            <h1 className="text-2xl font-semibold ">Lomba Yang Diikuti</h1>
            {teams?.length > 0 && (
              <Link href={"/#lomba"}>
                <Button>Daftar lomba</Button>
              </Link>
            )}
          </div>
        </DashboardCard>
        <ul className="flex flex-col space-y-4">
          {teams?.length == 0 ? (
            <EmptyTeam isPopUp={handleIsPopUp} />
          ) : (
            teams?.map((item, idx) => (
              <TeamCard
                key={idx}
                avatar={item.avatar}
                competitionName={item.competitionName}
                teamName={item.teamName ? item.teamName : email}
                currentMembers={item.currentMembers}
                maxMembers={item.maxMembers}
                id={item.teamId}
                slug={item.cSlug}
                isSubmit={item.isSubmit}
              />
            ))
          )}
        </ul>
      </DashboardUserTemplate>
    </>
  );
};

export default DashboardUser;

export const TeamCard = (props) => {
  return (
    <li className="w-11/12 mx-auto bg-white shadow shadow-black/5 rounded-lg lg:px-8 p-4 lg:py-4 flex lg:flex-row flex-col justify-between items-start">
      <div className="max-lg:w-full relative">
        {props.avatar ? (
          <img
            src={props.avatar}
            alt="Competition Image"
            width={1080}
            height={1080}
            className="lg:w-28 w-full h-28 object-cover lg:h-28 rounded-lg"
          />
        ) : (
          <div className="lg:w-28 w-full h-28 rounded-md bg-slate-100 flex justify-center items-center">
            {getTwoChar(props.teamName)}
          </div>
        )}
        <div className="absolute right-0 -bottom-full  lg:hidden">
          {props.isSubmit ? (
            <div className="px-4 py-2 bg-green-400/20 rounded-full">
              <Text size={"small"} additionals={"text-green-600"}>
                Sudah Submit
              </Text>
            </div>
          ) : (
            <div className="px-4 py-2 bg-brown/10 rounded-full">
              <Text
                color={"text-black"}
                size={"small"}
                additionals={"text-brown"}
              >
                Belum Submit
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="lg:mx-4 lg:my-0 my-3 flex-1 w-full">
        {/* <Text additionals={"text-2xl font-bold capitalize"}>
        </Text> */}
        <p className="font-bold text-xl uppercase tracking-wider">
          {props.competitionName}
        </p>
        <div className="flex gap-3 items-center justify-start">
          <Text color={"text-black"} size={"sm"}>
            {props.teamName}
          </Text>

          <div className="flex space-x-2 items-center text-sm px-3 py-1">
            <BsFillPeopleFill className="text-dark" />
            <Text>
              {props.currentMembers + 1}/{props.maxMembers}
            </Text>
          </div>
        </div>
        <div className="mt-3 text-brown font-bold">
          <Link
            href={
              props.isAdmin
                ? `/admin/teams/detail?i=${props.id}&sl=${props.slug}`
                : `/team?i=${props.id}&sl=${props.slug}`
            }
            className="underline"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
      {props.isSubmit ? (
        <div className="px-4 py-2 bg-green-400/20 rounded-full max-lg:hidden">
          <Text size={"small"} additionals={"text-green-600"}>
            Sudah Submit
          </Text>
        </div>
      ) : (
        <div className="px-4 py-2 bg-brown/10 rounded-full max-lg:hidden">
          <Text color={"text-black"} size={"small"} additionals={"text-brown"}>
            Belum Submit
          </Text>
        </div>
      )}
    </li>
  );
};

export const EmptyTeam = ({isPopUp}) => {
  return (
    <DashboardCard>
      <div className="w-full flex justify-center items-center  flex-col py-20">
        <Text size={"title"} color={"text-black"} additionals={"text-center"}>
          Tidak ada lomba yang diikuti
        </Text>
        <p className="text-md mt-4 mb-6">
          Kamu belum mengikuti lomba, segera daftarkan tim kamu dan jadilah
          juara!
        </p>
        {/* <div onClick={()=>isPopUp(true)}>
          <Button>Daftar lomba</Button>
        </div> */}
        <Link href={"/#lomba"}>
          <Button>Daftar lomba</Button>
        </Link>
      </div>
    </DashboardCard>
  );
};
