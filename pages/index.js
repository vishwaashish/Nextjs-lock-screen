import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import background1 from "../assets/images/1.jpg";
import background10 from "../assets/images/10.jpg";
import background11 from "../assets/images/11.jpg";
import background12 from "../assets/images/12.jpg";
import background13 from "../assets/images/13.jpg";
import background14 from "../assets/images/14.jpg";
import background2 from "../assets/images/2.jpg";
import background3 from "../assets/images/3.jpg";
import background4 from "../assets/images/4.jpg";
import background5 from "../assets/images/5.jpg";
import background6 from "../assets/images/6.jpg";
import background7 from "../assets/images/7.jpg";
import background8 from "../assets/images/8.jpg";
import background9 from "../assets/images/9.jpg";
import expand from "../assets/images/expand.svg";
import Clock from "../components/Clock";
import styles from "../styles/Home.module.css";

export default function Home() {
  const allBackgroundImages = useMemo(
    () => [
      background1,
      background2,
      background3,
      background4,
      background5,
      background6,
      background7,
      background8,
      background9,
      background10,
      background11,
      background12,
      background13,
      background14,
    ],
    []
  );

  const [scroll, setScroll] = useState(() => {
    const max = allBackgroundImages?.length;
    const min = max - (max - 1);
    return Math.floor(Math.random() * (max - min + 1));
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setScroll((val) => {
        if (val === allBackgroundImages.length) {
          return 0;
        } else {
          return val + 1;
        }
      });
    }, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [allBackgroundImages.length]);

  const generate = () => {
    const max = allBackgroundImages?.length;
    const min = max - (max - 1);
    setScroll(Math.floor(Math.random() * (max - min + 1)));
  };

  const getFullscreenElement = useCallback(() => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullScreen
    );
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (getFullscreenElement()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(console.log);
    }
  }, [getFullscreenElement]);

  const handleFullScreen = () => {
    toggleFullScreen();
  };
  console.log(scroll);

  return (
    <div className={styles.container}>
      <Head>
        <title>Lock Screen</title>
        <meta name="description" content="Lock Screen" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className={styles.fullImage}>
          {useMemo(
            () => (
              <Image
                src={allBackgroundImages[scroll]?.src || background1.src}
                alt="as"
                layout="fill"
                objectFit="cover"
                objectPosition="bottom"
                loading="lazy"
                className={styles.imageEffect}
              />
            ),
            [allBackgroundImages, scroll]
          )}
        </div>
        <div className={styles.contentBoxShadow}>
          <Clock />
        </div>
      </div>
      <div className={styles.footer}>
        <a href="https://technotaught.com/" target="_blank" rel="noreferrer">
          Ashishkumar Vishwakarma
        </a>
        <Image
          src={expand}
          width={20}
          height={20}
          alt="expand"
          onClick={handleFullScreen}
        />
        <a component="button" onClick={generate}>
          Generate
        </a>
      </div>
    </div>
  );
}
