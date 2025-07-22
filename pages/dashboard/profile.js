import React, { useEffect, useState } from "react";
import DashboardUserTemplate from "@/components/pagetemplate/DashboardUser";
import DashboardCard from "@/components/atoms/DashboardCard";
import { BiHomeAlt } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

import InputTitle from "@/components/molecules/InputTitle";
import InputPhone from "@/components/atoms/InputPhone";
import Text from "@/components/atoms/Text";
import InputOptions from "@/components/atoms/InputOptions";

import InputRadio from "@/components/atoms/InputRadio";
import GetDetailUser from "@/api/user/GetDetailUser";
import EditUser from "@/api/user/Edit";
import InputPhotoIdentity from "@/components/atoms/InputPhotoIdentity";
import {
  AiFillWarning,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Alert from "@/components/atoms/Alert";
import { useRouter } from "next/router";
import Head from "next/head";
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

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simpan, setSimpan] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentId, setStudentId] = useState("");
  const [photoIdentity, setPhotoIdentity] = useState(null);
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [twibbon, setTwibbon] = useState(null);
  const [institution, setInstitution] = useState("");
  const [message, setMessage] = useState("");
  const [isSucces, setIsSucces] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  console.log(avatar, twibbon);
  useEffect(() => {
    GetDetailUser()
      .then(async (res) => {
        console.log("data user : ", res.data);
        const user = res.data.user;
        setUserData(user || "");
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setLoading(false);
        setStudentId(user.participant.student_id_number || "");
        setInstitution(user.participant.institution || "");
        setGrade(user.participant.grade || "");
        setGender(user.participant.gender || "");

        if (user.participant.avatar) {
          setAvatar(user.participant.avatar);
        }

        if (user.participant.photo_identity) {
          setPhotoIdentity(user.participant.photo_identity);
        }

        if (user.participant.twibbon) {
          setTwibbon(user.participant.twibbon);
        }
      })

      .catch((err) => {
        if (err.message) {
          console.log(err.message);
        }
        console.log(err);
      });
  }, []);

  const handleSave = async () => {
    setSimpan(true);
    // Reset previous error states
    setIsWrong(false);
    setMessage("");

    // Validate input fields
    if (!grade.trim()) {
      setMessage("Status harus dipilih.");
      setIsWrong(true);
      setSimpan(false);
      return;
    }

    if (!gender.trim()) {
      setMessage("Jenis kelamin harus dipilih.");
      setIsWrong(true);
      setSimpan(false);
      return;
    }

    if (!institution.trim()) {
      setMessage("Instansi atau nama jenjang pendidikan harus diisi.");
      setIsWrong(true);
      setSimpan(false);
      return;
    }

    // Validate file sizes
    if (avatar && avatar.size > 3 * 1024 * 1024) {
      setMessage("Ukuran file avatar tidak boleh lebih dari 3MB.");
      setIsWrong(true);
      setSimpan(false);
      return;
    }

    if (twibbon && twibbon.size > 3 * 1024 * 1024) {
      setMessage("Ukuran file twibbon tidak boleh lebih dari 3MB.");
      setIsWrong(true);
      setSimpan(false);
      return;
    }

    // Prepare data for submission
    const data = {
      fullName: name,
      email: email,
      phone: phone,
      grade: grade,
      gender: gender,
      avatar: avatar || null, // Allow null if not provided
      studentId: studentId || "-",
      institution: institution,
      photoIdentity: photoIdentity || null, // Allow null if not provided
      twibbon: twibbon || null, // Allow null if not provided
    };

    // Submit data to the backend
    try {
      const response = await EditUser(data);
      if (response.status == 1) {
        setIsSucces(true);
        setMessage("Profil berhasil diperbarui.");
      } else if (response.status == 0) {
        setIsWrong(true);
        setMessage("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      setIsWrong(true);
      setMessage("Terjadi kesalahan pada server.");
    }

    setSimpan(false);
  };

  useEffect(() => {
    if (isSucces || isWrong) {
      setTimeout(() => {
        setIsSucces(false);
        setIsWrong(false);
      }, 3000);
    }
  }, [isSucces, isWrong]);
  const handleCancel = () => {
    router.push("/dashboard"); // Redirect ke halaman dashboard
  };

  const handleFileError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setIsWrong(true);
  };

  return (
    <div>
      <Head>
        <title>IITC Profile</title>
        <meta name="title" content="IITC Profile" />
      </Head>
      <Alert onClose={() => setIsSucces(false)} isOpen={isSucces}>
        {isSucces ? (
          <AiOutlineCheckCircle className="text-green-400 text-xl" />
        ) : (
          <AiOutlineLoading3Quarters className="text-green-400 text-xl animate-spin" />
        )}
        <p>{message}</p>
      </Alert>
      <Alert onClose={() => setIsWrong(false)} isOpen={isWrong}>
        {isWrong ? (
          errorMessage ? (
            <p className="text-red text-xl">{errorMessage}</p>
          ) : (
            <AiOutlineCloseCircle className="text-red text-xl" />
          )
        ) : (
          <AiOutlineLoading3Quarters className="text-red text-xl animate-spin" />
        )}
        <p>{message}</p>
      </Alert>
      <DashboardUserTemplate>
        <DashboardCard>
          <ul className="flex items-center gap-2">
            <Link href={"/"}>
              <BiHomeAlt className="text-gray-400" />
            </Link>
            <p>
              <MdArrowForwardIos className="text-xs text-gray-400" />
            </p>
            <p className="text-blue-600 text-sm">Profile</p>
          </ul>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
        </DashboardCard>
        <div className="px-10 rounded-lg bg-white p-2 pb-5 w-11/12 flex flex-col gap-2 mx-auto">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <InputTitle
                required={false}
                title={"Nama Lengkap"}
                type="text"
                value={name}
                placeholder={"Masukan nama lengkap"}
                onChange={(e) => setName(e.target.value)}
              />
              <InputTitle
                required={false}
                title={"Email"}
                type="email"
                disabled
                value={email}
                placeholder={"Masukan email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text>No Telepon</Text>
              <InputPhone
                placeholder="88226989100"
                value={phone}
                required={false}
                maxLength={12}
                onChange={(e) => setPhone(e.target.value)}
              />
              <InputOptions
                label="Pilih Status"
                options={["Pilih Status", "pelajar", "mahasiswa", "umum"]}
                grade={grade}
                setGrade={setGrade}
              />
              <InputTitle
                required={true}
                title={"Nama Jenjang Pendidikan / Instansi "}
                type="text"
                placeholder={"Instansi, organisasi, umum"}
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />

              <InputTitle
                required={false}
                title={"NIM/NISN - Optional"}
                type="text"
                placeholder={"Masukan NIM/NISN"}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />

              <InputRadio gender={gender} setGender={setGender} />
              <div>
                <Text>
                  Avatar <span className="text-rose-600">*</span>{" "}
                  <span className="text-xs italic font-thin">
                    (JPG,PNG,JPEG)
                  </span>
                  <span className="text-xs">- Bebas sopan</span>
                </Text>
                <InputPhotoIdentity
                  photo={avatar}
                  setPhoto={setAvatar}
                  initialPhotoUrl={avatar}
                  onError={handleFileError}
                />

                <Text>
                  Twibbon <span className="text-rose-600">*</span>
                  <span className="text-xs italic font-thin">
                    (JPG,PNG,JPEG)
                  </span>{" "}
                  <span className="text-xs">
                    - hasil screenshot setelah upload di social media
                  </span>
                </Text>
                <InputPhotoIdentity
                  photo={twibbon}
                  setPhoto={setTwibbon}
                  initialPhotoUrl={twibbon}
                  onError={handleFileError}
                />
              </div>
              <div className="p-3 border rounded-lg my-3 flex justify-start items-center border-brown bg-orange-50 text-brown font-medium ">
                kolom dengan tanda
                <span className="text-rose-600 mx-1 font-bold  bg-orange-100 rounded w-1 p-1 flex items-center justify-center h-1">
                  *
                </span>
                wajib di isi
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-slate-700 rounded-md hover:bg-slate-900 text-white font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name || simpan}
                  className={`py-2 px-4 rounded-md text-white flex justify-center items-center font-semibold ${
                    name && !simpan
                      ? "bg-brown hover:bg-orange-600"
                      : "bg-orange-700 cursor-not-allowed py-2 px-4 w-24"
                  }`}
                >
                  {simpan ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </DashboardUserTemplate>
    </div>
  );
}

export default Profile;
