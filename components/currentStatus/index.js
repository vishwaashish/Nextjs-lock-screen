import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../styles/LeftArea.module.css";
import moment from "moment";
import { whetherApi } from "../services";
import Avatar from "@mui/material/Avatar";
import { imageConstants } from "../constants";
import Image from "next/image";

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

const CurrentStatus = (props) => {
  const [weather, setWhether] = useState({});
  console.log(
    "🚀 ~ file: index.js ~ line 26 ~ CurrentStatus ~ weather",
    weather
  );
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState(null);
  const status = getCurrentStatus();

  useEffect(() => {
    const fetchWhetherApi = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const longitude = position.coords.latitude;
          const latitude = position.coords.longitude;
          try {
            const whetherData = await whetherApi( latitude, longitude );
            setWhether(whetherData);
          } catch (errors) {
            setErrors((err) => ({
              ...err,
              whetherApi: true,
              message: e.message,
            }));
            console.log("🚀 ~ file: index.js ~ line 47 ~ errors", errors);
          }
        },
        (err) => {
          return data;
        }
      );
    };
    fetchWhetherApi();
  }, []);

  const updateTime = useCallback(() => {
    setDate((val) => ({
      date: moment(),
      type: moment().format("a"),
      time: moment().format("hh:mm:ss"),
      day: moment().format("LL"),
    }));
  }, []);

  setInterval(updateTime, 1000);

  return (
    <div className={styles.leftArea}>
      {date && (
        <>
          <p className={styles.status}>{status}!</p>
          <p className={styles.currentTime}>
            {date?.time || ""}
            <span> {date?.type}</span>
          </p>
          <p className={styles.currentDay}>Today&apos;s {date.day}</p>
          <p className={styles.currentWether}>
            <Image src={imageConstants.SUN} alt="" width={30} height={30} />
            27&#176;C, <span>Day</span>
          </p>
        </>
      )}
    </div>
  );
};

export default CurrentStatus;

// export const getStaticProps = async () => {
//   try {
//     const whetherData = await whetherApi();
//     console.log("🚀  getStaticProps ~ whetherData", whetherData);
//     return {
//       props: {
//         whetherData,
//       },
//     };
//   } catch (e) {
//     return {
//       props: {
//         whetherData: e,
//       },
//     };
//   }
// };
