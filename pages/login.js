import LoginApi from "@/api/auth/LoginApi";
import { Button } from "@/components";
import Alert from "@/components/atoms/Alert";
import Text from "@/components/atoms/Text";
import InputTitle from "@/components/molecules/InputTitle";
import AuthPage from "@/components/pagetemplate/AuthPage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillWarning,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Cookies from "js-cookie";
import { IoMdArrowBack } from "react-icons/io";
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    //console.log(token);
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHitApi, setIsHitApi] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [Message, setMessage] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    setIsHitApi(true);
    LoginApi({ email, password }).then((res) => {
      setIsHitApi(false);
      console.log(res);
      if (res.status == 1) {
        const { access_token, email_verified_at } = res.data;
        if (email_verified_at == null) {
          setIsWrong(true);
          setMessage("Harap verfikasi email terlebih dahulu");
        } else if (email_verified_at != null) {
          setIsSucces(true);
          setMessage(res.message);
          Cookies.set("token", access_token, { expires: 2 }); // Cookie berakhir dalam 7 hari
          Cookies.set("email", email, { expires: 2 }); // Cookie berakhir dalam 7 hari
          router.push("/dashboard");
        }
      } else if (res.status == 0) {
        setIsWrong(true);
        setMessage(res.message);
        console.log(res.message);
      }
    });
  };
  return (
    <div className="overflow-hidden">
      <Alert onClose={() => setIsSucces(false)} isOpen={isSucces}>
        <AiOutlineLoading3Quarters className="text-green-400 text-xl animate-spin" />
        <p>{Message}</p>
      </Alert>
      <Alert onClose={() => setIsWrong(false)} isOpen={isWrong}>
        <AiFillWarning className="text-red text-xl" />
        <p>{Message}</p>
      </Alert>
      <AuthPage
        description={"Daftar IIT Competition dan jadilah juara sejati!"}
        onSubmit={handleLogin}
        title={"Daftar IITC"}
      >
        <Button
          onClick={() => router.push("/")}
          additionals={"flex lg:absolute top-8 lg:mb-0 mb-4 items-center"}
          color={"silver"}
          size={"base"}
          type="button"
        >
          <IoMdArrowBack className="text-lg cursor-pointer mr-2" />
          Kembali
        </Button>

        <Text size={"mdtitle"} weight={"bold"}>
          Masuk
        </Text>
        <Text additionals={"mb-4 mt-2"}>
          Belum memiliki akun?
          <Link href={"/signup"} className="text-brown hover:underline ml-1">
            Daftar
          </Link>
        </Text>
        <div className="space-y-3 mb-4">
          <InputTitle
            type="email"
            title={"Email"}
            value={email}
            required={true}
            placeholder="Masukan email Kamu"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTitle
            required={true}
            title={"Password"}
            type="password"
            value={password}
            placeholder="Masukan password Kamu"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={isHitApi} color={"brown"}>
          {isHitApi ? (
            <AiOutlineLoading3Quarters className="text-white text-xl animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
        <Link href={'/forgot-password'}><Text className="pt-5 text-brown hover:underline">Lupa password?</Text></Link>
      </AuthPage>
    </div>
  );
};

export default Login;
