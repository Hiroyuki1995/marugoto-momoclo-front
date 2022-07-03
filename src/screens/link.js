import * as React from "react";
import { Helmet } from "react-helmet";
import { pageUrl } from "../const/const.url.js";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Header } from "../components/Header.js";
import { TwitterFollowButton } from "react-twitter-embed";

const theme = createTheme();

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const LinkList = (props) => {
  useEffect(() => {
    console.log("useEffect fired");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Helmet
        title={`リンク｜まるごとももクロ`}
        meta={[
          { name: "twitter:card", content: "summary" },
          { name: "twitter:site", content: "@marugotomomoclo" },
          { name: "twitter:creator", content: "@marugotomomoclo" },
          { property: "og:title", content: "リンク｜まるごとももクロ" },
          {
            property: "og:description",
            content:
              "ももクロの公式サイトやライブ申し込みや・グッズ通販サイト、まるごとももクロのSNSアカウントへのリンク",
          },
          { property: "og:type", content: "website" },
          { property: "og:url", content: pageUrl + useLocation().pathname },
          { property: "og:image", content: pageUrl + "/logo512.png" },
        ]}
      />
      <CssBaseline />
      {/* <AppBar position="relative"> */}
      <Header />
      <main
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
        }}
      >
        <Grid container maxWidth="sm" style={{ margin: "auto" }}>
          <Grid item maxWidth="sm" style={{ padding: 10, width: "100%" }}>
            <a
              href="https://www.momoclo.net/shukuten_tour/ticket.html"
              target={"_blank"}
              rel={"noreferrer noopener"}
              style={{ textTransform: "none" }}
            >
              <img
                src="/live-image.jpg"
                alt="image"
                style={{ width: "100%" }}
              />
            </a>
          </Grid>
          <Grid item maxWidth="sm" style={{ padding: 10, width: "100%" }}>
            <a
              href="https://mailivis.jp/shops/momoclo"
              target={"_blank"}
              rel={"noreferrer noopener"}
              style={{ textTransform: "none" }}
            >
              <img
                src="/goods-image.jpg"
                alt="image"
                style={{ width: "100%", border: "1px solid" }}
              />
            </a>
          </Grid>
          <Grid item maxWidth="sm" style={{ padding: 10, width: "100%" }}>
            <a
              href="https://www.momoclo.net/"
              target={"_blank"}
              rel={"noreferrer noopener"}
              style={{ textTransform: "none" }}
            >
              <img
                src="/official-site-image.jpg"
                alt="image"
                style={{ width: "100%", border: "1px solid" }}
              />
            </a>
          </Grid>
          <Grid item style={{ padding: 10, width: "100%" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  まるごとももクロとは・・・
                </Typography>
                <Typography variant="body2">
                  ももクロの最新情報や有用な情報をまとめ、モノノフさんの情報の入口となることをコンセプトとしています。
                  <br />
                  まだまだ開発前途ですので、このアプリでできたら面白そうなアイデアを募集しています。
                  <br />
                  お問い合わせは以下のInstagramかTwitterへDMをお送りください。
                  <br />
                  誰でもいろんな情報を投稿できるようになって気軽に情報できる場にしてほしい、自分のお気に入りアルバムをこのサイト上で作りたい、他のモノノフさんと交流できる場が欲しい、などなど、なんでも構いません。
                  <br />
                </Typography>
                <Typography
                  variant="body2"
                  style={{ marginTop: 20, textAlign: "center" }}
                >
                  SNSアカウント
                </Typography>
                <div style={{ padding: 0, textAlign: "center" }}>
                  <a
                    href="https://lin.ee/VnQUQYu"
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                    style={styles.snsLink}
                  >
                    <img
                      src="/LINE_icon.png"
                      alt="image"
                      style={styles.snsIcon}
                    />
                  </a>
                  <a
                    href="https://twitter.com/marugotomomoclo"
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                    style={styles.snsLink}
                  >
                    <img
                      src="/Twitter_icon.png"
                      alt="image"
                      style={styles.snsIcon}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/marugoto_momoclo/"
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                    style={styles.snsLink}
                  >
                    <img
                      src="/Instagram_icon.png"
                      alt="image"
                      style={styles.snsIcon}
                    />
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
};

const styles = {
  snsLink: {
    margin: "5%",
  },
  snsIcon: {
    width: 40,
  },
};
