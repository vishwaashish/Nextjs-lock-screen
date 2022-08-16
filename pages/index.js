import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import theme from "../assets/mui";
import CurrentStatus from "../components/currentStatus";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@mui/material/styles";

export default function Home({ allImages }) {
  // console.log("🚀 ~ file: index.js ~ line 6 ~ Home ~ props", allImages);
  const defaultImage = {
    id: "1001",
    author: "Danielle MacInnes",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/1DkWWN1dr-s",
    download_url: "https://picsum.photos/id/1001/5616/3744",
  };
  const [image, setImage] = useState((val) => {
    if (!!val) {
      return val;
    } else {
      return defaultImage;
    }
  });

  useEffect(() => {
    setInterval(async () => {
      const randomImage = Math.floor(Math.random() * (allImages?.length - 1));
      const image = await allImages[randomImage];
      setImage(image);
    }, 5000);
    // setImage(allImages[28]);
  }, [allImages]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Lock Screen</title>
        <meta name="description" content="Lock Screen" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Donegal+One&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <div className="container">
          <div className={styles.fullImage}>
            <Image
              src={image?.download_url}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              objectPosition="bottom center"
              alt={image?.download_url}
            />
          </div>

          <div className={styles.contentBoxShadow} />
          <div className={styles.main}>
            <CurrentStatus />
            {/* <div className={styles.rightArea}>rightArea</div> */}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export async function getStaticProps(props) {
  const res = await fetch("https://picsum.photos/v2/list");
  const images = await res.json();

  return {
    props: {
      allImages: images,
    },
  };
}
