import SkemaCard from "@/components/atoms/SkemaCard";
import Container from "@/components/molecules/Container";
import ParagraphSection from "@/components/molecules/ParagraphSection";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const SkemaSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div className="min-h-screen w-full ">
      <Container>
        <section id="skema" className="py-12 flex justify-center bg-silver/40">
          <div className="w-11/12 mx-auto">
            <div className="text-xs md:text-md w-full ">
              <ParagraphSection
                flashValue={"Show your skill to the world"}
                title={"Gimana si alur dari event ini?"}
                description={
                  "Baca baik baik detailnya ya, agar tidak salah langkah"
                }
              />
            </div>
            <motion.ol className="p-2 rounded-xl w-full mt-12 grid gap-3 md:grid-cols-4">
              <motion.li
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.4,
                  stiffness: "100",
                }}
              >
                <SkemaCard
                  buttonHref={
                    "https://scribehow.com/shared/Step-by-step_guide_Signing_up_and_joining_a_competition_on_IITC__rrJ9DfysTWe-A0Se9oppIA"
                    // "https://drive.google.com/drive/folders/1nAXTJhm7FcRA0m4nnwJEV-03FfUdWw_O?usp=sharing"
                  }
                  buttonValue={"Cek info"}
                  imgUrl={"/images/chaticon.png"}
                  title={"Pendaftaran"}
                  description={
                    "Pendaftaran telah ditentukan dan dijadwalkan sesuai perencanaan."
                  }
                  modalDescription={
                    "Khusus untuk pendaftaran, info lengkap bisa kalian cek lewat tombol dibawah."
                  }
                />
              </motion.li>
              <motion.li
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.4,
                  stiffness: "100",
                }}
              >
                <SkemaCard
                  imgUrl={"/images/guardicon.png"}
                  title={"Verifikasi Data"}
                  description={`Pastikan data diri yang kamu masukkan adalah valid dan benar, yaa!`}
                  modalDescription={
                    <div>
                      <ol className="flex flex-col gap-3">
                        <li className="p-2 flex items-center min-h-20 w-full rounded-lg border-2 border-orange-300 bg-orange-50 text-slate-900">
                          Setelah Anda melakukan pendaftaran dan verifikasi
                          email, silahkan login dengan memasukkan email dan
                          password yang valid.
                        </li>
                        <li className="p-2 flex items-center min-h-20 w-full rounded-lg border-2 border-orange-300 bg-orange-50 text-slate-900">
                          Klik profil
                        </li>
                        <li className="p-2 flex items-center min-h-20 w-full rounded-lg border-2 border-orange-300 bg-orange-50 text-slate-900">
                          Lengkapi data sesuai dengan data yang Anda miliki.
                        </li>
                      </ol>
                    </div>
                  }
                />
              </motion.li>
              <motion.li
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  type: "spring",
                  bounce: 0.4,
                  stiffness: "100",
                }}
              >
                <SkemaCard
                  imgUrl={"/images/calendaricon.png"}
                  title={"Pengerjaan & Upload"}
                  description={
                    "Waktunya pengerjaan lomba sesuai bidang yang kalian ikuti."
                  }
                  modalDescription={
                    <div>
                      <p className="p-2 mb-10 text-sm  min-h-20 w-full rounded-lg border-2 border-orange-300 bg-orange-50 text-slate-900">
                        Pengerjaan sudah boleh dilakukan setelah tanggal
                        pendaftaran dibuka yaitu{" "}
                        <span className="font-semibold text-brown">
                          1 Agustus 2025
                        </span>{" "}
                        sampai dengan sebelum akhir pengumpulan projek yaitu pada
                        tanggal <br />
                        <span className="font-semibold text-brown">
                          7 September 2025
                        </span>
                      </p>
                    </div>
                  }
                />
              </motion.li>
              <motion.li
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  type: "spring",
                  bounce: 0.4,
                  stiffness: "100",
                }}
              >
                <SkemaCard
                  imgUrl={"/images/checklisticon.png"}
                  title={"Pengumuman"}
                  description={"Yang paling ditunggu nih, pengumuman pemenang."}
                  modalDescription={
                    <p className="mb-10 p-2  min-h-20 w-full rounded-lg border-2 border-orange-300 bg-orange-50 text-slate-900">
                      Terimakasih kami ucapkan kepada seluruh peserta yang telah
                      mengikuti kegiatan lomba IIT Competition. Dalam berbagai
                      bidang lomba yang telah diikuti sudah memberikan
                      karya-karya terbaik yang luar biasa. Pengumuman pemenang
                      akan diumumkan secara offline ketika awarding pada tanggal{" "}
                      <span className="text-brown font-semibold">
                        27 September 2025.
                      </span>
                    </p>
                  }
                />
              </motion.li>
            </motion.ol>
          </div>
        </section>
      </Container>
    </motion.div>
  );
};

export default SkemaSection;
