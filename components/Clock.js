import moment from "moment";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import styles from "../styles/Clock.module.css";
import expand from "../assets/images/expand.svg";

const getCurrentStatus = () => {
  var currentHour = moment().format("HH");
  if (currentHour >= 3 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "Good Afternoon";
  } else if (currentHour >= 15 && currentHour < 20) {
    return "Good Evening";
  } else if (currentHour >= 20 && currentHour < 3) {
    return "Good Night";
  } else {
    return "Hello";
  }
};

const Clock = ({}) => {
  const [date, setDate] = useState({});
  const status = getCurrentStatus();
  const updateTime = useCallback(() => {
    setDate((val) => ({
      date: moment().format("Do"),
      time: moment().format("hh:mm:ss"),
      day: moment().format("dddd"),
      year: moment().format("YYYY"),
      hours: moment().format("hh"),
      minutes: moment().format("mm"),
      second: moment().format("ss"),
    }));
  }, []);

  setInterval(updateTime, 1000);

  return useMemo(
    () => (
      <div id="clockTimer" className={styles.container}>
        <p className={styles.status}>{status}!</p>
        <div className={styles.time}>
          <p className={styles.currentTime}>
            <span>{date.hours || "00"}</span>:
            <span>{date.minutes || "00"}</span>:
            <span>{date.second || "00"}</span>
          </p>
          <p className={styles.currentDay}>
            {Object.keys(date).length
              ? `${date.day}, ${date.date} ${date.year}`
              : ""}
          </p>
        </div>
      </div>
    ),
    [date, status]
  );
};

export default Clock;
