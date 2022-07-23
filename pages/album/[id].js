import * as React from "react";
import { Helmet } from "react-helmet";
import Seo from "../../src/components/Seo.js";
// import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
import Link from "next/link";

import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import bigInt from "big-integer";
import { avators } from "../../src/const/const.album.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SquareImage, Linkify } from "./index.js";
import { imageUrl, apiUrl, pageUrl } from "../../src/const/const.url.js";
import { getData } from "../api/photosUrl.js";

const theme = createTheme();

const getInstagramUrlFromMediaId = (mediaId) => {
  var alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  var shortenedId = "";
  // mediaId = mediaId.substring(0, mediaId.indexOf("_"));

  while (mediaId > 0) {
    var remainder = bigInt(mediaId).mod(64);
    mediaId = bigInt(mediaId).minus(remainder).divide(64).toString();
    shortenedId = alphabet.charAt(remainder) + shortenedId;
  }
  return "https://www.instagram.com/p/" + shortenedId + "/";
};

const OtherImages = (props) => {
  const posts = props.posts;
  const currentImage = props.currentImage;
  let PreviousImage = <></>;
  let NextImage = <></>;
  const GridXs4 = () => (
    <Grid
      item
      xs={4}
      sm={4}
      style={{
        position: "relative",
      }}
    ></Grid>
  );
  if (posts && posts.length !== 0 && currentImage) {
    const currentIndex = posts.findIndex((post) => post.id === currentImage.id);
    const maxIndex = posts.length - 1;
    if (currentIndex > 0) {
      PreviousImage = () => (
        <>
          <Grid
            item
            xs={1}
            sm={1}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href={`/album/${posts[currentIndex - 1].id}`}>
              <ArrowBackIcon
                style={{
                  color: "#000000",
                }}
              />
            </Link>
          </Grid>

          <SquareImage post={posts[currentIndex - 1]} numberOfColumns={4} />
        </>
      );
    } else {
      PreviousImage = () => <GridXs4 />;
    }
    if (currentIndex < maxIndex) {
      NextImage = () => (
        <>
          <SquareImage post={posts[currentIndex + 1]} numberOfColumns={4} />
          <Grid
            item
            xs={1}
            sm={1}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href={`/album/${posts[currentIndex + 1].id}`}>
              <ArrowForwardIcon
                style={{
                  color: "#000000",
                }}
              />
            </Link>
          </Grid>
        </>
      );
    } else {
      NextImage = () => <GridXs4 />;
    }
    return (
      <div style={{ display: "contents" }}>
        <PreviousImage />
        <GridXs4 />
        <NextImage />
      </div>
    );
  }
  return <div></div>;

  // return <div>currentPost</div>;
};

const DefaultImageWithText = (props) => {
  const post = props.post;
  console.log("post", post);
  if (post === null) {
    console.log("postは設定されていません");
    return <></>;
  }
  if (Object.keys(post).length === 0) {
    console.log("postは設定されていません");
    return <></>;
  }

  dayjs.locale("ja");
  dayjs.extend(relativeTime);
  const time = dayjs(post.date, "YYYYMMDDhhmmss").add(9, "hour");
  // JSTに直す
  const diff = dayjs().diff(time, "days"); // 現在との差分日を計算
  let displayText;
  // 5日前以内であれば差分情報を表示、それよりも前であれば日付を表示
  if (diff < 5) {
    const fromNow = dayjs(time).fromNow();
    displayText = fromNow;
  } else {
    const formattime = dayjs(time).format("YYYY/MM/DD");
    displayText = formattime;
  }
  let DateComponent = <div style={{ color: "#777777" }}>{displayText}</div>;
  const avator = avators.find((avator) => avator.key === post.person);
  console.log("avator:", avator);
  let avatorHref;
  switch (post.category) {
    case "posts":
    case "stories":
      avatorHref = `https://www.instagram.com/${avator.link}/`;
      break;
    case "tweets":
      avatorHref = `https://twitter.com/${avator.link}`;
      break;
    default:
      break;
  }
  // const { height, width } = useWindowDimensions();
  return (
    <>
      {/* <Seo
        pageTitle={`${avator.name} SNS投稿`}
        pageDescription={post.caption}
        pageImg={`${imageUrl}/${post.fileName}`}
        pageImgWidth={1280}
        pageImgHeight={960}
      /> */}
      {/* <Helmet
        title={`${avator.name} SNS投稿｜まるごとももクロ`}
        meta={[
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: "@marugotomomoclo" },
          { name: "twitter:creator", content: "@marugotomomoclo" },
          {
            property: "og:title",
            content: `${avator.name} SNS投稿｜まるごとももクロ`,
          },
          {
            property: "og:description",
            content: post.caption,
          },
          { property: "og:type", content: "website" },
          { property: "og:image", content: `${imageUrl}/${post.fileName}` },
        ]}
      /> */}
      <Grid
        item
        // direction="column"
        xs={12}
        sm={12}
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "2%",
          alignItems: "center",
        }}
      >
        <Grid xs={2} style={{ display: "flex" }}>
          <Link
            href={"/album"}
            style={{ display: "flex" }}
            className={"a-nondecoration"}
          >
            <ArrowBackIcon style={{ color: "inherit" }} />
          </Link>
        </Grid>
        <Grid
          xs={8}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href={avatorHref}
            style={{ display: "contents" }}
            target={"_blank"}
            rel={"noreferrer noopener"}
            className={"a-nondecoration"}
          >
            {/* TODO: next/imageを使う */}
            <Avatar
              alt={avator.name}
              style={{ width: 32, height: 32 }}
              src={avator.src}
            />
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 12,
                textAlign: "center",
                paddingLeft: 10,
              }}
            >
              {avator.name}
            </div>
          </a>
        </Grid>
        <Grid xs={2} style={{ textAlign: " right", display: "inline-grid" }}>
          {post.category === "posts" ? (
            <a
              href={getInstagramUrlFromMediaId(post.mediaId)}
              target="_blank"
              rel={"noreferrer noopener"}
              style={{ fontSize: 12 }}
              className={"a-nondecoration"}
            >
              投稿へ
            </a>
          ) : post.category === "tweets" ? (
            <a
              href={`https://twitter.com/momowgp/status/${post.tweetId}`}
              target="_blank"
              rel={"noreferrer noopener"}
              style={{ fontSize: 12 }}
              className={"a-nondecoration"}
            >
              ツイートへ
            </a>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        key={post.id}
        className={"image-list"}
        style={{
          position: "relative",
          textAlign: "center",
          marginLeft: "2%",
          marginRight: "2%",
          marginBottom: "4%",
        }}
      >
        {post.extension === "mp4" ? (
          <video
            controls
            autoPlay
            loop
            muted
            style={{
              objectFit: "contain",
              position: "relative",
              maxWidth: "100%",
              padding: "0px",
            }}
          >
            <source src={`${imageUrl}/${post.fileName}`} type="video/mp4" />
          </video>
        ) : (
          // <></>
          <img
            alt="画像"
            src={`${imageUrl}/${post.fileName}`}
            style={{
              objectFit: "contain",
              position: "relative",
              maxWidth: "100%",
              padding: "0px",
            }}
          />
        )}
        <div
          style={{
            whiteSpace: "pre-wrap",
            marginLeft: 15,
            marginRight: 15,
            fontSize: 12,
            textAlign: "left",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: Linkify(post.caption) }} />
          {DateComponent}
        </div>
      </Grid>
    </>
  );
};

export async function getServerSideProps(context) {
  console.log("getServerSideProps fired");
  console.log(
    "process.env.NEXT_PUBLIC_API_URL",
    process.env.NEXT_PUBLIC_API_URL
  );
  console.log("context.req.headers.referer", context.req.headers.referer);
  const referer = context.req.headers.referer;
  if (referer === `${process.env.NEXT_PUBLIC_API_URL}/album`) {
    console.log("refererが画像一覧となっています");
    const data = {};
    return { props: { data } };
  }

  const res = await fetch(`${apiUrl}/photosUrl/${context.query.id}`, {
    headers: {
      "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
    },
  });
  const data = await res.json();

  console.log("return", { props: { data } });
  // Pass data to the page via props
  return { props: { data } };
}

export default function ImageDetail({ data }) {
  console.log("ImageDetail component initialized");
  const router = useRouter();
  const imageId = router.query.id;
  console.log("imageId", imageId);
  const posts = useSelector((state) => state.posts);
  const results = posts.results;
  const resultIds = results.map((result) => result.id);
  var image = null;
  console.log("data !== null", data !== null);
  console.log("typeof data", typeof data);
  console.log("data.constructor === Object", data.constructor === Object);
  if (resultIds.indexOf(imageId) !== -1) {
    console.log("既に画像データが存在しています");
    image = results[resultIds.indexOf(imageId)];
  } else if (
    data !== null &&
    typeof data === "object" &&
    data.constructor === Object
  ) {
    image = data;
  } else {
    console.log("想定外の事態？");
  }
  console.log("resultIds", resultIds);
  console.log("data", data);
  console.log("image", image);
  console.log("avators", avators);
  // const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <div>
        {image ? (
          <Seo
            pageTitle={`${
              avators.find((avator) => avator.key === image.person).name
            } SNS投稿`}
            pageDescription={image.caption}
            pageImg={`${imageUrl}/${image.fileName}`}
            pageImgWidth={1280}
            pageImgHeight={960}
          />
        ) : (
          <></>
        )}
      </div>

      <CssBaseline />
      <main style={{ paddingBottom: "64px" }}>
        <Grid container maxWidth="sm" style={{ margin: "auto" }}>
          <DefaultImageWithText post={image} posts={results} />
          <OtherImages posts={results} currentImage={image} />
        </Grid>
      </main>
    </ThemeProvider>
  );
}
