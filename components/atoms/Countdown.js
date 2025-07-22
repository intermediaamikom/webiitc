import { useState, useEffect } from "react";
import { BsHourglassSplit } from "react-icons/bs";

const Countdown = () => {
  const targetDate = new Date("September 27, 2025 23:59:59").getTime();
  const [countdown, setCountdown] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => {
      setIsMounted(false);
      clearInterval(timer);
    };
  }, []);

  function calculateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="flex space-x-5 items-center">
      {isMounted && (
        <>
          <div className="bg-silver/30 md:text-2xl font-bold px-3 py-4 rounded-xl text-dark">
            {countdown.days}
          </div>
          <div className="bg-silver/30 md:text-2xl font-bold px-3 py-4 rounded-xl text-dark">
            {countdown.hours}
          </div>
          <div className="bg-silver/30 md:text-2xl font-bold px-3 py-4 rounded-xl text-dark">
            {countdown.minutes}
          </div>
          <div className="bg-silver/30 md:text-2xl font-bold px-3 py-4 rounded-xl text-dark">
            {countdown.seconds}
          </div>
        </>
      )}
      <BsHourglassSplit className="text-red text-2xl animate-pulse" />
    </div>
  );
};

export default Countdown;
