import dynamic from "next/dynamic";
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
import Clock from "../components/Clock";
import styles from "../styles/Home.module.css";
import blurImage from "../assets/images/liquid-cheese.svg";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});
function getRandomNumber(maxLength = 1) {
  const max = maxLength;
  const min = max - (max - 1);
  return Math.floor(Math.random() * (max - min + 1));
}
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

  const imagesLength = allBackgroundImages?.length;

  const [loaded, setLoaded] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [scroll, setScroll] = useState(() => {
    return getRandomNumber(imagesLength);
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

  const generate = useCallback(() => {
    setLoaded(true);
    setScroll(getRandomNumber(imagesLength));
  }, [imagesLength]);

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
      setZoomIn(false);
    } else {
      document.documentElement.requestFullscreen().then(() => {
        setZoomIn(true);
      });
    }
  }, [getFullscreenElement]);

  const handleFullScreen = useCallback(() => {
    toggleFullScreen();
  }, [toggleFullScreen]);

  const handleDoubleClick = (e) => {
    console.log(e.detail, "click");
    // if (e.detail === 2) {
    return handleFullScreen();
    // }
  };

  const onLoadingComplete = useCallback((e) => {
    setLoaded((val) => {
      if (val) return false;
      return val;
    });
  }, []);

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#fff",
        }}
        outerStyle={{
          border: "2px solid #fff",
        }}
        clickables={["a", "button"]}
      />
      <div className={styles.container}>
        <Head>
          <title>Lock Screen</title>
          <meta name="description" content="Lock Screen" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <div className="container" onDoubleClick={handleDoubleClick}>
            <div className={styles.fullImage} style={{ position: "relative" }}>
              {/* <ImageComponent
                source={allBackgroundImages[scroll] || background1}
                onLoadingComplete={onLoadingComplete}
              /> */}
              <Image
                onLoadingComplete={onLoadingComplete}
                src={allBackgroundImages[scroll].src || background1.src}
                alt={"Background Image"}
                layout="fill"
                objectFit="cover"
                objectPosition="bottom"
                priority
                // quality={100}
                className={styles.imageEffect}
                placeholder="blur"
                blurDataURL={blurImage.src}
              />
            </div>
            <div className={styles.contentBoxShadow}>
              <Clock />
            </div>
          </div>
          <div className={styles.footer}>
            <a
              href="https://github.com/vishwaashish"
              target="_blank"
              rel="noreferrer"
            >
              Ashishkumar Vishwakarma
            </a>
            <a
              component="button"
              className={styles.onZoom}
              onClick={handleFullScreen}
            >
              {`Zoom ${zoomIn ? "Out" : "In"}`}
            </a>
            <a
              component="button"
              className={loaded ? "hideDecoration" : ""}
              onClick={() => {
                !loaded && generate();
              }}
            >
              {loaded ? "Loading" : "Generate"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const ImageComponent = ({ source, onLoadingComplete }) => {
  return (
    <Image
      onLoadingComplete={onLoadingComplete}
      src={source.src}
      alt={"Background Image"}
      layout="fill"
      objectFit="cover"
      objectPosition="bottom"
      priority
      quality={100}
      className={styles.imageEffect}
      placeholder="blur"
      blurDataURL={blurImage.src}
    />
  );
};
