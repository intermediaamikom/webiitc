import GetDetailCompetitionsApi from "@/api/homepage/GetDetailCompetitionApi";
import PayApi from "@/api/payment/Pay";
import GetDetailTeam from "@/api/team/GetDetail";
import { Button } from "@/components";
import Alert from "@/components/atoms/Alert";
import FileInput from "@/components/atoms/FilePond";
import Logo from "@/components/atoms/Logo";
import Text from "@/components/atoms/Text";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillWarning,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { getTwoChar } from "./team";
import { FiCheckCircle, FiCopy } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { BiCheckCircle } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";

const Payment = () => {
  const [isSucces, setIsSucces] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [Message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isHitTeam, setIsHitTeam] = useState(false);
  const [isHitPay, setIsHitPay] = useState(false);
  const [competition, setCompetition] = useState({});
  const [isHitCompetition, setIsHitCompetition] = useState(true);
  const [team, setTeam] = useState({});
  const [isCsr, setIsCsr] = useState(false);
  const router = useRouter();
  const id = router.query?.i;
  const cSlug = router.query?.sl;
  const getDetailTeam = () => {
    setIsHitTeam(true);
    GetDetailTeam({ id })
      .then((res) => {
        //console.log(res);
        setTeam(res.data?.team);
        setIsHitTeam(false);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      getDetailTeam();
    }
    //console.log(cSlug);
    if (cSlug) {
      setIsHitCompetition(true);
      GetDetailCompetitionsApi({ slug: cSlug }).then((res) => {
        //console.log(res);
        setIsCsr(true);
        setCompetition(res.data?.competition);
        setIsHitCompetition(false);
      });
      // .catch((err) => //console.log(err));
    }
  }, [router.isReady]);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  function formatDate(date) {
    const dayIndex = date.getDay();
    const day = days[dayIndex];
    const dateNumber = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();

    return `${day}, ${dateNumber} ${month} ${year}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const handlePay = (e) => {
    e.preventDefault();
    setIsHitPay(true);
    PayApi({ id, proveOfPayment: image }).then((res) => {
      //console.log(res);
      setMessage(res.message);
      if (res.status == 1) {
        setIsSucces(true);
        router.replace(`/team?i=${id}&sl=${cSlug}`);
      } else {
        setIsWrong(true);
        setIsHitPay(false);
      }
    });
    // .catch((err) => //console.log(err));
  };
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div
        style={{ backgroundImage: `url('${competition.cover}')` }}
        className="h-48 bg-cover p-3 relative bg-center bg-no-repeat"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="w-11/12 max-w-[500px] left-1/2 -translate-x-1/2 absolute bottom-3">
          <Text size={"smalltitle"} weight={"bold"} color={"white"}>
            {competition.name}
          </Text>
          <div className="flex space-x-2 my-1">
            <Text color={"white"}>Tanggal: </Text>
            <Text color={"white"} weight={"bold"}>
              {formattedDate}
            </Text>
          </div>
          <Text size={"smalltitle"} weight={"bold"} color={"white"}>
            Rp {competition?.competitionPrice?.toLocaleString("id-ID")}
          </Text>
        </div>
      </div>
      <form
        onSubmit={handlePay}
        className="w-11/12 max-w-[500px] mx-auto pb-12 overflow-hidden"
      >
        <Alert onClose={() => setIsSucces(false)} isOpen={isSucces}>
          <AiFillCheckCircle className="text-green-400 text-xl" />
          <p>{Message}</p>
        </Alert>
        <Alert onClose={() => setIsWrong(false)} isOpen={isWrong}>
          <AiFillWarning className="text-red text-xl" />
          <p>{Message}</p>
        </Alert>

        <div className="flex justify-between items-center my-8 w-full">
          <div className="flex lg:items-center items-start justify-start space-x-3 lg:flex-row flex-col w-full">
            {team.avatar ? (
              <img
                src={team.avatar}
                alt="Buaya"
                width={1080}
                height={1080}
                className="lg:w-24 w-full h-24 rounded-md lg:rounded-full object-cover"
              />
            ) : (
              <div className="lg:w-24 w-full h-24 rounded-md lg:rounded-full bg-slate-100 animate-pulse flex justify-center items-center">
                {isCsr && getTwoChar(team.name)}
              </div>
            )}
            <div className="max-lg:mt-3">
              <Text size={"smalltitle"} color={"black"}>
                Tim {team.name}
              </Text>
              <Text>Kapten {team?.leader?.name}</Text>
            </div>
          </div>
          <div className=" text-green-500 max-lg:hidden">Pembayaran</div>
        </div>

        {/* <div className="mb-6">
        <Text color={"black"} weight={"bold"}>
          Item Detail
        </Text>
        <Text>Pembayaran Lomba</Text>
      </div> */}

        <div className="py-6 border-y flex justify-center items-center space-x-3">
          {/* <Logo /> */}
          <Text color={"black"} size={"cardtitle"}>
            Metode Pembayaran
          </Text>
        </div>

        <ul className="space-y-6 my-6 border-b pb-6">
          {paymentMethods.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-center space-x-3 items-center"
            >
              <img
                src={item.img}
                alt={item.value}
                width={1080}
                height={1080}
                className="w-20"
              />
              <div className="flex items-center w-full justify-between space-x-1">
                <div className="mr-3 text-end w-full">
                  <Text additionals={"text-green-500"}>
                    {copied ? "Disalin" : `${item.value}`}
                  </Text>
                  <Text size={"small"}>{!copied && `${item.an}`}</Text>
                </div>
                <CopyToClipboard
                  text={item.value}
                  onCopy={() => setCopied(true)}
                >
                  <div className="hover:cursor-pointer">
                    {copied ? (
                      <BiCheckCircle className="text-xl text-green-500" />
                    ) : (
                      <IoCopyOutline className="text-xl" />
                    )}
                  </div>
                </CopyToClipboard>
              </div>
            </li>
          ))}
        </ul>
        <FileInput
          placeholder="Upload bukti pembayaran"
          className="bg-white rounded-xl border border-brown text-center "
          image={image}
          setImage={setImage}
        />

        <Button isSquare additionals={"w-full"} size={"md"} color={"brown"}>
          {isHitPay ? (
            <AiOutlineLoading3Quarters className="text-xl mx-auto text-white animate-spin" />
          ) : (
            "Kirim Bukti Pembayaran"
          )}
        </Button>
        <Button
          isSquare
          additionals={"w-full mt-4"}
          size={"md"}
          color={"outlinedark"}
          onClick={() => router.replace(`/team?i=${id}&sl=${cSlug}`)}
        >
          Batal
        </Button>
      </form>
    </>
  );
};

export default Payment;

const paymentMethods = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
    value: "085641446522",
    an: "an Julia Ningsih",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
    value: "085641446522",
    an: "an Julia Ningsih",
  },
  {
    img: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/01/2024/02/04/2-shopeepay-rectangle-orange2-1208029004.png",
    value: "085647706584",
    an: "an Julia Ningsih",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/213px-Bank_Mandiri_logo_2016.svg.png",
    value: "1380021420455",
    an: "an Ani Musarofah",
  },
];
