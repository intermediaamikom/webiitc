import GetDetailTeamAdminApi from "@/api/admin/teams/Detail";
import Text from "@/components/atoms/Text";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiHome, FiXCircle } from "react-icons/fi";
import { StatusPayment } from "../team";
import { BiCheckCircle } from "react-icons/bi";
import PaymentValidationApi from "@/api/payment/PaymentValidation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";


const TeamDetailAdmin = () => {
  const router = useRouter();
  const [team, setTeam] = useState({});
  const [isApprove, setIsApprove] = useState(false);
  const [counter, setCounter] = useState(false);
  const [isHitApi, setisHitApi] = useState(false);
  const [done, setDone] = useState(false);
  const [reason, setReason] = useState("");
  const [image, setImage] = useState("");
  const id = router.query.i;

  useEffect(() => {
    const token = Cookies.get("adminKey");
    if(!token){
      router.push("/admin");
    }
  }, []);

  useEffect(() => {
    GetDetailTeamAdminApi({ id }).then((res) => {
      // console.log(res);
      setTeam(res?.data?.team);
      if (res.data?.team?.isActive == "PENDING") {
        setImage(res?.data?.team?.transferReceipt);
        setDone(true);
      }
    });
  }, [router.isReady]);
  useEffect(() => {
    //console.log(team);
  }, [team]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setisHitApi(true);
    PaymentValidationApi({ isApprove, reason, id }).then((res) => {
      //console.log(res);
      if (res.status == 1) {
        router.push("/admin/dashboard");
      }
    });
  };
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-[500px] mx-auto bg-white min-h-screen py-12 px-6"
      >
        <ul className="flex space-x-3 items-center mb-8">
          <li>
            <Link href={"/admin/dashboard"}>
              <FiHome className="text-blue-400" />
            </Link>
          </li>
          <li>&gt;</li>
          <li>Approval</li>
          <li>&gt;</li>
          <li>{team?.name}</li>
        </ul>

        {StatusPayment(team?.isActive)}
        <div className="flex items-center space-x-3 relative mt-3">
          {team?.avatar ? (
            <img
              src={team?.avatar}
              alt="pembayaran tim"
              width={1080}
              height={1080}
              className="w-24 h-24 object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-200 animate-pulse"></div>
          )}
          <div>
            <h1 className="text-xl text-black font-bold">
              {team?.name ?? team.competition?.name}
            </h1>
            <p>{team?.leader?.name ?? team.leaderName}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="py-3 border-y text-center">Bukti Pembayaran</p>
          {team?.transferReceipt ? (
            <img
              src={team?.transferReceipt}
              alt="bukti pembayaran"
              width={1080}
              height={1080}
              className="w-full rounded-md mt-3"
            />
          ) : (
            <div className="w-full rounded-md bg-slate-200 mt-3 flex justify-center items-center h-96">
              <p>Belum bayar</p>
            </div>
          )}
        </div>

        {done && (
          <>
            <button
              type="button"
              onClick={() => {
                setIsApprove(true);
                setCounter(true);
              }}
              className={` ${
                isApprove && counter && "ring-2 ring-green-600"
              } bg-green-500/20  text-green-500 flex px-6 py-3 rounded-md w-full mt-6 justify-center items-center transition-all duration-300`}
            >
              <BiCheckCircle className="text-xl mr-2" />
              <p>Terima Pembayaran</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsApprove(false);
                setCounter(true);
              }}
              className={` ${
                !isApprove && counter && "ring-2 ring-red"
              } bg-red/20 text-red flex px-6 py-3 rounded-md w-full mt-3 justify-center items-center transition-all duration-300`}
            >
              <FiXCircle className="text-xl mr-2" />
              <p>Tolak Pembayaran</p>
            </button>
          </>
        )}

        {counter && (
          <>
            <textarea
              required
              name=""
              id=""
              cols="30"
              rows="10"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-3 bg-slate-100 p-6 focus:outline-none rounded-md"
              placeholder="Alasan"
            ></textarea>
            <button
              type="submit"
              className="bg-slate-100 text-black/80 flex px-6 py-3 rounded-md w-full mt-3 justify-center items-center transition-all duration-300"
            >
              {isHitApi ? (
                <AiOutlineLoading3Quarters className="text-lg animate-spin" />
              ) : (
                "Konfirmasi"
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TeamDetailAdmin;
