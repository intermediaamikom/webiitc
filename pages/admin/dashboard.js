import React, { useEffect, useState } from "react";
import DashboardAdminTemplate from "@/components/pagetemplate/DashboardAdmin";
import GetAllTeamApi from "@/api/admin/teams";
import DashboardCard from "@/components/atoms/DashboardCard";
import { BiHomeAlt } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { StatusPayment } from "../team";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const DashboardAdmin = () => {
  const paymentStatusFilters = [
    { label: "Semua", value: "ALL" },
    { label: "Belum Bayar", value: null },
    { label: "Di Proses", value: "PENDING" },
    { label: "Sudah Bayar", value: "VALID" },
    { label: "Gagal Bayar", value: "INVALID" },
  ];

  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [originalTeams, setOriginalTeams] = useState([]);
  const [selectedCompetitionNames, setSelectedCompetitionNames] = useState([]);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(
    paymentStatusFilters[0].value
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("adminKey");
    if(!token){
      router.push("/admin");
    }
  }, [])

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    GetAllTeamApi().then((res) => {
      const fetchedTeams = res?.data?.teams?.reverse() ?? [];
      setOriginalTeams(fetchedTeams);
      setTeams(fetchedTeams);
      setIsLoading(false);
    });
  };

  const filterTeams = () => {
    let filteredTeams = originalTeams;

    if (selectedCompetitionNames.length > 0) {
      filteredTeams = filteredTeams.filter((team) =>
        selectedCompetitionNames.includes(team.competitionName)
      );
    }

    if (currentPaymentStatus !== "ALL") {
      filteredTeams = filteredTeams.filter(
        (team) => team.isActive === currentPaymentStatus
      );
    }

    setTeams(filteredTeams);
  };

  useEffect(() => {
    filterTeams();
  }, [selectedCompetitionNames, currentPaymentStatus]);

  const toggleCompetitionFilter = (competitionName) => {
    if (selectedCompetitionNames.includes(competitionName)) {
      setSelectedCompetitionNames((prevNames) =>
        prevNames.filter((name) => name !== competitionName)
      );
    } else {
      setSelectedCompetitionNames((prevNames) => [
        ...prevNames,
        competitionName,
      ]);
    }
  };
  const uniqueCompetitionNames = [
    ...new Set(originalTeams.map((team) => team.competitionName)),
  ];

  return (
    <DashboardAdminTemplate title={"Dashboard"}>
      <DashboardCard>
        <ul className="flex items-center gap-2">
          <p>
            <BiHomeAlt className="text-gray-400" />
          </p>
          <p>
            <MdArrowForwardIos className="text-xs text-gray-400" />
          </p>
          <p className="text-blue-600 text-sm">Tim</p>
        </ul>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-semibold">Semua Tim Pembayaran</h1>
        </div>
        <div className="my-3 text-xs">pembayaran :</div>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          {paymentStatusFilters.map((filter, idx) => (
            <div key={`payment-status-${idx}`} className="mb-2 w-full">
              <button
                onClick={() => setCurrentPaymentStatus(filter.value)}
                className={`flex  cursor-pointer items-center justify-between rounded-lg border text-xs w-full ${
                  currentPaymentStatus === filter.value
                    ? "border-brown ring-1 ring-brown"
                    : "border-gray-100"
                } bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className={
                      currentPaymentStatus === filter.value
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
        <div className="my-3 text-xs">kategori :</div>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          {uniqueCompetitionNames.map((competitionName, idx) => (
            <div key={`team-filters-${idx}`} className="mb-2">
              <button
                onClick={() => toggleCompetitionFilter(competitionName)}
                className={`flex cursor-pointer items-center justify-between rounded-lg border w-full ${
                  selectedCompetitionNames?.includes(competitionName)
                    ? "border-brown ring-1 ring-brown"
                    : "border-gray-100"
                } bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className={
                      selectedCompetitionNames?.includes(competitionName)
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
                  <p className="text-gray-700">{competitionName}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard>
        <p className="w-full text-right pr-5">total tim: {teams.length}</p>
        <div
          className={`grid ${
            teams.length > 1 ? "lg:grid-cols-2" : ""
          }  items-center mt-2`}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="mx-auto text-lg text-black animate-spin" />
          ) : (
            teams.map((team) => (
              <li key={team.id} className=" p-4 my-1 list-none">
                <ul className="">
                  <Link href={`/admin/team?i=${team.id}`}>
                    <TeamCard
                      label={team.competitionName}
                      avatar={team.avatar}
                      name={team.name ?? team.leaderName}
                      title={team.title}
                      isActive={team.isActive}
                      code={team.code}
                      leaderName={team.leaderName}
                    />
                  </Link>
                </ul>
              </li>
            ))
          )}
        </div>
      </DashboardCard>
    </DashboardAdminTemplate>
  );
};

export default DashboardAdmin;

const TeamCard = ({
  avatar,
  name,
  title,
  isActive,
  code,
  label,
  leaderName,
}) => {
  return (
    <li className="group flex flex-col  bg-white border shadow-sm rounded-xl hover:shadow-md transition">
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="tim 1"
              width={1080}
              height={1080}
              className="md:w-20 w-40 h-40 rounded-t-md md:h-20 object-cover"
            />
          ) : (
            <div className="w-full h-40 md:w-20 md:h-20 rounded-t-md bg-slate-200 animate-pulse"></div>
          )}

          <div className="mt-3 md:mt-0 w-full md:ml-5">
            <div className="flex flex-row items-center gap-5 mb-5  justify-between">
              <h3 className="group-hover:text-blue-600 text-xs items-center font-semibold text-gray-800 dark:group-hover:text-gray-400">
                {name}{" "}
              </h3>
              <div className="text-xs">{StatusPayment(isActive)}</div>
            </div>
            <div className="text-sm flex mb-3 text-gray-500">{leaderName}</div>
            <div className="text-sm flex justify-between text-gray-500">
              {title ? title : "belum submit"}
              <span className="text-blue-600 font-medium dark:text-blue-500 text-right">
                {label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};


// import * as Sentry from "@sentry/nextjs";
// import ErrorPage from "@/components/pagetemplate/ErrorPage";

// function CustomErrorComponent({ statusCode, message }) {
//   if (statusCode >= 500) {
//     Sentry.captureMessage(
//       `Server error occurred with status code ${statusCode}`,
//       "error"
//     );
//   }

//   return <ErrorPage statusCode={statusCode} message={message} />;
// }

// CustomErrorComponent.getInitialProps = async (contextData) => {
//   const { res, err, asPath } = contextData;
//   const statusCode = res ? res.statusCode : err.statusCode;

//   if (err) {
//     Sentry.captureException(err, {
//       contexts: {
//         page: {
//           url: asPath, // Capture the URL where the error occurred
//         },
//       },
//     });

//     // Ensure Sentry sends the error before continuing
//     await Sentry.flush(2000);
//   }

//   // Custom error message
//   const message = err ? err.message : `An error ${statusCode} occurred`;

//   return { statusCode, message };
// };

// export default CustomErrorComponent;
