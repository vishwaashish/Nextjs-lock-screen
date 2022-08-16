import { useState } from "react";

const WHETHER_ACCESS_KEY = "e35f5b945a16f3ee88da6f852d792b62";
// const WHETHER_ACCESS_KEY = "0dc52cdfc7e54cc35aa55ce76e5124fb";
const MY_IP_ADDRESS = "27.106.99.7";

export const whetherApi = async (latitude, longitude) => {
  console.log(
    "🚀 ~ file: index.js ~ line 8 ~ whetherApi ~ latitude, longitude",
    latitude,
    longitude
  );
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WHETHER_ACCESS_KEY}`
  );
  const data = await res.json();
  console.log("🚀 ~ file: index.js ~ line 16 ~ data", data);
  return data;
};
