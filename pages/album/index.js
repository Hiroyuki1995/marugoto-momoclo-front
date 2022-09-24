import * as React from "react";
import Seo from "../../src/components/Seo";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
// import { Link, useLocation } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { List, ListItem, Container } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridOnIcon from "@mui/icons-material/GridOn";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TwitterIcon from "@mui/icons-material/Twitter";
import { red, pink, yellow, purple } from "@mui/material/colors";
import StoriesIcon from "../../src/components/StoriesIcon.js";
import InstagramIcon from "../../src/components/InstagramIcon.js";
import { pageUrl, imageUrl } from "../../src/const/const.url.js";

import InfiniteScroll from "react-infinite-scroll-component";
import { Header } from "../../src/components/Header";
import YouTubeIcon from "../../src/components/YouTubeIcon.js";
import {
  fetchPosts,
  changeNumberOfColumns,
  changePerson,
  registerFirstData,
} from "../../src/redux/posts/operations.js";
import Grid from "@mui/material/Grid";

import { avators } from "../../src/const/const.album.js";
import { apiUrl } from "../../src/const/const.url.js";

export const Linkify = (inputText) => {
  //URLs starting with http://, https://, or ftp://
  var replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with www. (without // before it, or it'd re-link the ones done above)
  var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  var replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links
  var replacePattern3 =
    /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
  var replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
};

const theme = createTheme();

export const SquareImage = (props) => {
  const post = props.post;
  const numberOfColumns = props.numberOfColumns;
  // const location = useLocation();
  // const pathname = location.pathname;
  const router = useRouter();
  // console.log(router.pathname);
  const pathname = router.pathname;
  // console.log("persona", post.person);
  const dispatch = useDispatch();
  let color;
  switch (post.person) {
    case "momotakanako":
      color = red[400];
      break;
    case "tamaishiori":
      color = yellow[400];
      break;
    case "sasakiayaka":
      color = pink[100];
      break;
    case "takagireni":
      color = purple[300];
      break;
    default:
      color = "";
  }
  let Icon = () => {
    switch (post.category) {
      case "stories":
        console.log("stories");
        return (
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: "10%",
              height: "10%",
              zIndex: 1,
            }}
          >
            <StoriesIcon color={color} />
          </div>
        );
      case "posts":
        return (
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: "10%",
              height: "10%",
              zIndex: 1,
            }}
          >
            <InstagramIcon color={color} />
          </div>
        );
      case "tweets":
        return (
          <Chip
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: "10%",
              height: "10%",
              backgroundColor: "#00acee",
              borderRadius: "50%",
              zIndex: 1,
            }}
            icon={
              <TwitterIcon
                style={{
                  margin: 0,
                  color: "#ffffff",
                  width: "60%",
                  position: "absolute",
                }}
              />
            }
          />
        );
      case "youtube#video":
        return (
          <div
            style={{
              position: "absolute",
              top: "2%",
              left: "3%",
              width: "12%",
              height: "12%",
              zIndex: 1,
            }}
          >
            <YouTubeIcon />
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <Grid
      item
      xs={12 / numberOfColumns}
      sm={12 / numberOfColumns}
      key={post.id}
      className={"image-list aspect-ratio-1"}
      // className={"image-list"}
      style={{
        position: "relative",
      }}
    >
      <Link
        href={`/album/${post.id}?fetchAgain=f`}
        passHref
        as={`/album/${post.id}`}
      >
        <a>
          <div style={{ width: "100%", height: "100%" }}>
            <Image
              alt="画像"
              layout="fill"
              objectFit="cover"
              src={`${imageUrl}/${
                post.extension === "mp4" ? post.thumnail : post.fileName
              }`}
              priority={true}
            />
          </div>
          <Icon />
        </a>
      </Link>
      {/* )} */}
    </Grid>
  );
};

const DefaultImageWithText = (props) => {
  const post = props.post;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  let color;
  console.log("post in DefaultImageWithText：", post);
  switch (post.person) {
    case "momotakanako":
      color = red[400];
      break;
    case "tamaishiori":
      color = yellow[400];
      break;
    case "sasakiayaka":
      color = pink[100];
      break;
    case "takagireni":
      color = purple[300];
      break;
    default:
      color = "";
  }
  let Icon = () => {
    switch (post.category) {
      case "stories":
        console.log("stories");
        return (
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: 30,
              height: 30,
              zIndex: 1,
            }}
          >
            <StoriesIcon color={color} />
          </div>
        );
      case "posts":
        return (
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: 30,
              height: 30,
              zIndex: 1,
            }}
          >
            <InstagramIcon color={color} />
          </div>
        );
      case "tweets":
        return (
          <Chip
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: 30,
              height: 30,
              backgroundColor: "#00acee",
              borderRadius: "50%",
              zIndex: 1,
            }}
            icon={
              <TwitterIcon
                style={{
                  margin: 0,
                  color: "#ffffff",
                  width: "60%",
                  position: "absolute",
                }}
              />
            }
          />
        );
      case "youtube#video":
        return (
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              width: 30,
              height: 30,
              zIndex: 1,
            }}
          >
            <YouTubeIcon />
          </div>
        );
      default:
        return <></>;
    }
  };
  // const { height, width } = useWindowDimensions();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      // spacing={0.5}
      // columns={4}
      // direction="column"
      // sx={{ height: "100%" }}
      // wrap="wrap"
      key={post.id}
      // className={"image-list"}
      style={{
        position: "relative",
      }}
    >
      <Link
        href={`/album/${post.id}?fetchAgain=f`}
        passHref
        as={`/album/${post.id}`}
      >
        <a>
          <Image
            alt="画像"
            objectFit="intrinsic"
            layout="responsive"
            width="100%"
            height={`${(100 * post.height) / post.width}%`}
            src={`${imageUrl}/${
              post.extension === "mp4" ? post.thumnail : post.fileName
            }`}
          />
          <Icon />
        </a>
      </Link>
      {/* )} */}
      <div
        style={{ whiteSpace: "pre-wrap" }}
        // dangerouslySetInnerHTML={{ __html: Linkify(post.caption) }}
      />
    </Grid>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  // export const getServerSideProps = wrapper.getServerSideProps(
  // (store) => async (context) => {
  console.log("getServerSideProps fired");
  console.log("context.query", context.query);
  if (context.query && context.query.fetchAgain === "f") {
    console.log("なにもかえさない");
    // return {};
    const data = [];
    return { props: { data } };
  }
  // Fetch data from external API
  console.log("データを取得");
  const res = await fetch(`${apiUrl}/photosUrl?person=all`, {
    headers: {
      "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
    },
  });
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default function Album({ data }) {
  console.log("Album component initialized");
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // console.log("posts", posts);
  console.log("posts.searchCondition", posts.searchCondition);
  const results = useSelector((state) => state.posts.results);
  // const searchCondition = useSelector((state) => state.posts.searchCondition);
  // const results = posts.results;
  // const results = data.items;
  console.log("results.length", results.length);
  const refresh = results.length === 0 ? true : false;
  const lastEvaluatedKey = posts.searchCondition.lastEvaluatedKey;
  const showAllImages = posts.searchCondition.showAllImages;
  const person = posts.searchCondition.person;
  const numberOfColumns = posts.displayCondition.numberOfColumns;
  const scrollPosition = posts.displayCondition.scrollPosition;
  // console.log("results", results);
  // const [numberOfColumns, setNumberOfColumns] = useState(1);

  // const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [loading, setLoading] = useState(false);

  // const registerSet.addEventListener("scroll", function () {
  //   const scrollPosition = window.pageYOffset;
  //   console.log("scroll_position", scrollPosition);
  // });

  const getPosts = ({
    lastEvaluatedKey = null,
    searchPerson = person,
    refresh = false,
  }) => {
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    setLoading(true);
    console.log(
      "getPosts",
      lastEvaluatedKey,
      searchPerson,
      refresh,
      showAllImages
    );
    if ((refresh === true) | (showAllImages === false)) {
      // if (showAllImages === false) {
      dispatch(fetchPosts(searchPerson, lastEvaluatedKey, refresh));
      // dispatch(fetchPosts(searchPerson, lastEvaluatedKey, false));
    } else {
      console.log("showAllImagesがtrueのため画像取得しません。");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect fired");
    console.log("refresh", refresh, "showAllImages", showAllImages);
    // if (refresh !== false && showAllImages === false) {
    if (showAllImages === false) {
      // getPosts({});
      console.log("ここでデータ取得するつもりだった");
    }
    console.log("window.scrollY", window.scrollY);
  }, [dispatch]);

  // 初回レンダリング時のみスクロール位置を指定する
  useEffect(() => {
    console.log("scrollPosition", scrollPosition);
    // window.scrollTo(0, scrollPosition);
    console.log("dataa:", data);
    // データが入っていなかったら初期データを登録。入ってなかったら登録しない。
    if (
      data !== null &&
      typeof data === "object" &&
      data.constructor === Object
    ) {
      dispatch(registerFirstData(data));
    }
  }, []);

  // const StyledBadge = styled(Badge)(({ theme }) => ({
  //   "& .MuiBadge-badge": {
  //     right: 10,
  //     top: 10,
  //   },
  // }));

  return (
    <ThemeProvider theme={theme}>
      <Seo
        pageTitle={`SNS写真`}
        pageDescription={"ももクロの公式SNSの写真たち"}
        pageImg={pageUrl + "/logo512.png"}
        // pageImg={imageUrl + "/" + results[0].fileName}
        // pageImgWidth={1280}
        // pageImgHeight={960}
      />
      <CssBaseline />
      <Header>
        {(() => {
          let Icons = [];
          for (let i = 1; i <= 3; i++) {
            let Icon = <></>;
            switch (i) {
              case 1:
                Icon = <FormatListBulletedIcon />;
                break;
              case 2:
                Icon = <GridViewIcon />;
                break;
              case 3:
                Icon = <GridOnIcon />;
                break;
              default:
                return <></>;
            }

            Icons.push(
              <IconButton
                size="large"
                style={
                  numberOfColumns !== i ? { color: "rgba(0,0,0,0.5)" } : {}
                }
                color={numberOfColumns === i ? "primary" : "inherit"}
                onClick={() => {
                  dispatch(changeNumberOfColumns(i));
                  window.scrollTo(0, 0);
                }}
              >
                {Icon}
              </IconButton>
            );
          }
          return Icons;
        })()}
      </Header>
      <main
        style={{
          marginTop: "64px",
          marginBottom: "64px",
        }}
      >
        {/* <Container
          maxWidth="md"
          disableGutters={true}
          style={{ textAlign: "right" }}
        >
          <div class="p7button" data-button-text="通知ON"></div>
        </Container> */}
        {/* <AvatarGroup total={24}> */}
        <Container maxWidth="md" disableGutters={true}>
          <List
            // maxWidth={"md"}
            disablePadding={true}
            style={styles.list}
            // style={{ flexDirection: "row", display: "flex", overflowX: "auto" }}
            className={"hide-scroll-bar"}
          >
            {avators.map((avator) => (
              <ListItem
                onTouchStart={() => console.log("onTouchStart")}
                style={styles.listItem}
                style={
                  (avator.key === person) | (person === "all")
                    ? styles.activeListItem
                    : styles.inactiveListItem
                }
                style={
                  person === "all"
                    ? styles.standardListItem
                    : avator.key === person
                    ? styles.activeListItem
                    : styles.inactiveListItem
                }
              >
                <Avatar style={styles.avator}>
                  <Image
                    alt={avator.name}
                    // layout="fill"
                    objectFit="cover"
                    width={60}
                    height={60}
                    // style={styles.avator}
                    src={avator.src}
                    onClick={() => {
                      console.log("personn", avator.key);
                      let searchPerson =
                        person === avator.key ? "all" : avator.key;
                      dispatch(changePerson(searchPerson));
                      getPosts({
                        lastEvaluatedKey: null,
                        searchPerson: searchPerson,
                        refresh: true,
                      });
                    }}
                  />
                </Avatar>
                {/* <Avatar
                  alt={avator.name}
                  style={styles.avator}
                  src={avator.src}
                  onClick={() => {
                    console.log("personn", avator.key);
                    let searchPerson =
                      person === avator.key ? "all" : avator.key;
                    dispatch(changePerson(searchPerson));
                    getPosts({
                      lastEvaluatedKey: null,
                      searchPerson: searchPerson,
                      refresh: true,
                    });
                  }}
                /> */}
                <div style={styles.avatorText}>{avator.shortName}</div>
              </ListItem>
              // </Badge>
              // </StyledBadge>
            ))}
          </List>
        </Container>
        {/* </AvatarGroup> */}
        <InfiniteScroll
          style={{ textAlign: "center" }}
          dataLength={posts.results.length} //This is important field to render the next data
          next={() => {
            console.log("fire next function");
            getPosts({ lastEvaluatedKey: lastEvaluatedKey });
          }}
          scrollThreshold={"200px"}
          hasMore={!showAllImages}
          loader={<CircularProgress />}
          endMessage={""}
          // below props only if you need pull down functionality
          refreshFunction={() => console.log("fire refreshFunction")}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
        >
          <Grid container maxWidth="md" style={{ margin: "auto" }}>
            {results ? (
              results.map((post, index) =>
                numberOfColumns > 1 ? (
                  <SquareImage post={post} numberOfColumns={numberOfColumns} />
                ) : (
                  <DefaultImageWithText post={post} />
                )
              )
            ) : (
              <></>
            )}
          </Grid>
        </InfiniteScroll>
      </main>
    </ThemeProvider>
  );
}

const styles = {
  // inactiveAvator: {
  //   width: 60,
  //   height: 60,
  //   opacity: 0.4,
  // },
  avator: {
    width: 60,
    height: 60,
  },
  avatorText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 10,
    textAlign: "center",
  },
  standardListItem: {
    flexDirection: "column",
    width: 70,
    padding: "5px 5px 0px",
    display: "block",
    fontColor: "#000000",
  },
  activeListItem: {
    flexDirection: "column",
    width: 70,
    padding: "5px 5px 0px",
    display: "block",
    fontColor: "#000000",
    backgroundColor: "#fddde6",
  },
  inactiveListItem: {
    flexDirection: "column",
    width: 70,
    padding: "5px 5px 0px",
    display: "block",
    fontColor: "#444444",
    opacity: 0.4,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    overflowX: "auto",
    marginBottom: 15,
  },
};
