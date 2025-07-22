import GetAllTeamAdminApi from "@/api/admin/teams/AllTeam";
import GetMineTeam from "@/api/team/Mine";
import { exportToExcel } from "@/api/utils/ExportExcel";
import { Button } from "@/components";
import DashboardCard from "@/components/atoms/DashboardCard";
import DashboardAdminTemplate from "@/components/pagetemplate/DashboardAdmin";
import DashboardUserTemplate from "@/components/pagetemplate/DashboardUser";
import { EmptyTeam, TeamCard } from "@/pages/dashboard";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { CgGlobeAlt } from "react-icons/cg";
import { MdArrowForwardIos } from "react-icons/md";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [email, setEmail] = useState("");
  const [exportData, setExportData] = useState([]);

  const submissionStatusFilters = [
    { label: "Semua", value: "all" },
    { label: "Belum Submit", value: false },
    { label: "Sudah Submit", value: true },
  ];

  const [selectedSubmission, setselectedSubmission] = useState(
    submissionStatusFilters[0].value
  );
  const valid = Cookies.get("valid");
  useEffect(() => {
    // GetMineTeam().then((res) => {
    //   setTeams(res.data?.teams);
    //   //console.log(res.data.teams);
    // });
    // .catch((err) => //console.log(err));
    setEmail(Cookies.get("email"));
    GetAllTeamAdminApi().then((res) => {
      console.log(res.data?.teams);
      setTeams(res.data?.teams);
      setFilteredTeams(res.data?.teams);
    });
  }, []);
  const filterTeams = () => {
    const dataSubmission = (team) => {
      const data = team.map((item) => {
        const d = {
          tim: item?.teamName,
          namaKetua: item.leader?.name,
          teleponKetua: `0${item.leader?.phone}`,
          emailKetua: item.leader?.email,
          linkSubmission: item.submission ? item.submission : null,
          lomba: item?.competitionName,
        };
        return d;
      })
      setExportData(data)
    }

    if (selectedSubmission !== "all") {
      let filter = teams.filter((team) => team.isSubmit === selectedSubmission);
      setFilteredTeams(filter);
      dataSubmission(filter)
    } else if (selectedSubmission === "all") {
      let allTeams = teams.map((team) => team)
      setFilteredTeams(allTeams);
      dataSubmission(allTeams)
    } else {
      setFilteredTeams(teams);
    }
  };

  useEffect(() => {
    filterTeams();
  }, [selectedSubmission, teams]);
  return (
    <>
      <Head>
        <title>IITC Dashboard</title>
        <meta name="title" content="IITC Dashboard" />
      </Head>
      <DashboardAdminTemplate>
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
            <h1 className="text-2xl font-semibold ">Daftar Tim</h1>
            <div className="flex gap-3">
              <p>
                total tim:
                <span className="font-bold">{filteredTeams? filteredTeams.length: 0}</span>
              </p>
              <button
                onClick={() => exportToExcel("dataTim", exportData)}
                className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full ring-2 ring-green-600"
              >
                Export
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5">
            {submissionStatusFilters.map((filter, idx) => (
              <div key={`payment-status-${idx}`} className="mb-2 w-full">
                <button
                  onClick={() => setselectedSubmission(filter.value)}
                  className={`flex  cursor-pointer items-center justify-between rounded-lg border text-xs w-full ${
                    selectedSubmission === filter.value
                      ? "border-brown ring-1 ring-brown"
                      : "border-gray-100"
                  } bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200`}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className={
                        submissionStatusFilters === filter.value
                          ? "h-5 w-5 text-brown"
                          : "hidden"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-gray-700">{filter.label}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </DashboardCard>
        <ul className="flex flex-col space-y-4">
          {filteredTeams?.length == 0 ? (
            <EmptyTeam />
          ) : (
            filteredTeams?.map((item, idx) => (
              <TeamCard
                isAdmin={true}
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
      </DashboardAdminTemplate>
    </>
  );
}
