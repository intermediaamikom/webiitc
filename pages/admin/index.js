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
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHitApi, setIsHitApi] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [Message, setMessage] = useState("");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    setIsHitApi(true);
    LoginApi({ email, password }).then((res) => {
      setIsHitApi(false);
      console.log(res);
      if (res.status == 1) {
        setIsSucces(true);
        setMessage(res.message);
        Cookies.set("adminKey", res.data.access_token, { expires: 2 }); // Cookie berakhir dalam 7 hari
        router.push("/admin/dashboard");
      } else if (res.status == 0) {
        setIsWrong(true);
        setMessage(res.message);
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
        title={"Login Admin IIT Competition"}
      >
        <Text size={"mdtitle"} weight={"bold"} additionals={"mb-6"}>
          Admin
        </Text>
        <div className="space-y-3 mb-4">
          <InputTitle
            type="email"
            title={"Email"}
            value={email}
            required={true}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTitle
            required={true}
            title={"Password"}
            type="password"
            value={password}
            placeholder="Enter your password"
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
      </AuthPage>
    </div>
  );
};

export default LoginAdmin;
