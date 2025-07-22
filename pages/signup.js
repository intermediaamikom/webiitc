import SendEmailApi from "@/api/auth/Email";
import RegisterApi from "@/api/auth/RegisterApi";
import { Button, Container } from "@/components";
import Alert from "@/components/atoms/Alert";
import Input from "@/components/atoms/Input";
import InputPhone from "@/components/atoms/InputPhone";
import Text from "@/components/atoms/Text";
import InputTitle from "@/components/molecules/InputTitle";
import Modals from "@/components/organisms/admin/Modals";
import AuthPage from "@/components/pagetemplate/AuthPage";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillWarning, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { PopUp } from "./team";
const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isNaN, setIsNaN] = useState(false);
  const [isHitApi, setIsHitApi] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [Message, setMessage] = useState("");
  const [isUsed, setIsUsed] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    //console.log(token);
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  const validateNumber = (state) => {
    const regex = /^[0-9]+$/;
    return regex.test(state) ? true : false;
  };
  const validateMatchPassword = () => {
    return password == confirmPassword;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateNumber(phone)) {
      setIsNaN(true);
      setMessage("Nomor telepon harus berupa angka!");
      return;
    }
    if (!validateMatchPassword()) {
      setIsNotMatch(true);
      setMessage("Password dan konfirmasi password tidak cocok!");
      return;
    }
    setIsHitApi(true);
    RegisterApi({
      fullName: fullname,
      email,
      password,
      phone: parseInt(phone),
    }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        const { verifyEmail } = res.data;
        const { id, hash, signature, expires } = verifyEmail;
        setMessage(res.message);
        SendEmailApi({ email, id, hash, signature, expires }).then((res) => {
          if (res != false) {
            setIsSucces(true);
            setIsHitApi(false);
            return router.push("/login");
          } else {
            setIsUsed(true);
            setMessage("Email telah digunakan");
            setIsHitApi(false);
            setEmail("");
          }
        });
      } else if (res.status == 0) {
        setIsUsed(true);
        setMessage("Email telah digunakan");
        setIsHitApi(false);
        setEmail("");
      }
    });
  };
  Alert;
  return (
    <div className="overflow-hidden">
      <PopUp isModal={isPopUp} onClose={() => setIsPopUp(false)}>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/images/LOGO/LOGOFIX2024.png"}
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
      <Alert onClose={() => setIsSucces(false)} isOpen={isSucces}>
        <AiOutlineLoading3Quarters className="text-green-400 text-xl animate-spin" />
        <p>{Message}</p>
      </Alert>
      <Alert onClose={() => setIsUsed(false)} isOpen={isUsed}>
        <AiFillWarning className="text-red text-xl" />
        <p>{Message}</p>
      </Alert>
      <Alert onClose={() => setIsNaN(false)} isOpen={isNaN}>
        <AiFillWarning className="text-red text-xl" />
        <p className="text-sm">{Message}</p>
      </Alert>
      <Alert onClose={() => setIsNotMatch(false)} isOpen={isNotMatch}>
        <AiFillWarning className="text-red text-xl" />
        <p className="text-sm">{Message}</p>
      </Alert>
      <AuthPage
        description={"Daftar IIT Competition dan jadilah juara sejati!"}
        onSubmit={handleSubmit}
        title={"Daftar IITC"}
      >
        <Link href={"/"}>
          <Button
            additionals={"flex  mb-4 items-center"}
            color={"silver"}
            size={"base"}
            type="button"
          >
            <IoMdArrowBack className="text-lg cursor-pointer mr-2" />
            Kembali
          </Button>
        </Link>
        <Text size={"mdtitle"} weight={"bold"}>
          Daftar
        </Text>
        <Text additionals={"mb-4 mt-2"}>
          Sudah memiliki akun?
          <Link href={"/login"} className="text-brown hover:underline ml-1">
            Masuk
          </Link>
        </Text>
        <div className="space-y-3 mb-4">
          <InputTitle
            type="text"
            title={"Full Name"}
            value={fullname}
            required={true}
            placeholder="Ucup"
            onChange={(e) => setFullname(e.target.value)}
          />

          <InputTitle
            type="email"
            title={"Email"}
            value={email}
            required={true}
            placeholder="ucup@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text>Phone</Text>
          <InputPhone
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="88226989100"
            required={true}
            maxLength={12}
          />
          <InputTitle
            required={true}
            title={"Password"}
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputTitle
            required={true}
            type="password"
            title={"Confirm Password"}
            value={confirmPassword}
            placeholder="Konfirmasi password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          disabled={false}
          color={"brown"}
          // additionals={"cursor-no-drop"}
        >
          {isHitApi ? (
            <AiOutlineLoading3Quarters className="text-white text-xl animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </AuthPage>
    </div>
  );
};

export default Signup;
