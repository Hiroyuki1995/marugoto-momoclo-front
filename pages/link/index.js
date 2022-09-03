import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { pageUrl } from "../../src/const/const.url.js";
import Seo from "../../src/components/Seo.js";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "../../src/components/Header.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const theme = createTheme();

  const links = [
    {
      category: "発売中チケット",
      icon: "stadium",
      details: [
        {
          name: "9/6(金)開催　黒フェス",
          url: "http://kurofes.net/pages/ticket",
        },
        {
          name: "9/17(土)開催　イナズマロック フェス 2022　※9/3(土)10:00〜チケット一般発売開始",
          url: "https://inazumarock.com/2022/",
        },
        {
          name: "9/18(日)開催　氣志團万博2022",
          url: "https://www.kishidanbanpaku.com/ticket/",
        },
        {
          name: "9/24(土)開催　北九州ロックフェスティバル",
          url: "https://kitakyushu-rock.com/tickets/",
        },
        // {
        //   name: "10/7(金)開催　THE GREAT SATSUMANIAN HESTIVAL 2022 SPECIAL",
        //   url: "https://www.great-satsumanian.jp/ticket.html",
        // },
        {
          name: "10/8(土)開催　「スナック愛輪」　※8/28(日)番組最速独占先行開始",
          url: "https://event.1242.com/events/snack_a-rin/",
        },
      ],
    },
    {
      category: "グッズ",
      icon: "cart",
      details: [
        {
          name: "はるえ商店",
          url: "https://mailivis.jp/shops/momoclo",
        },
        {
          name: "玉井詩織生誕記念アイテム",
          url: "https://www.beams.co.jp/search/?label=0751&q=220826%E3%82%82%E3%82%82%E3%82%AF%E3%83%AD&search=true",
        },
        {
          name: "百田夏菜子イメージルックのジェラートピケアイテム",
          url: "https://gelatopique.com/Page/feature/220825_PREORDER/?plan=GP220825PREORDER",
        },
      ],
    },
    {
      category: "オフィシャルサイト",
      icon: "home",
      url: "https://www.momoclo.net/",
    },
  ];

  const Links = () => {
    return (
      <Box id="link-list">
        {links.map((link) => {
          return (
            <div>
              <ListItemButton
                component={link.url ? "a" : ""}
                href={link.url ? `${link.url}` : ""}
                target={"_blank"}
                rel={"noreferrer noopener"}
                divider={true}
                disabled={link.url ? false : true}
                style={{
                  backgroundColor: "#ff7fc7",
                  color: "#ffffff",
                  width: "100%",
                }}
              >
                <ListItemIcon>
                  {link.icon === "cart" ? (
                    <ShoppingCartOutlinedIcon style={{ color: "#ffffff" }} />
                  ) : link.icon === "stadium" ? (
                    <StadiumOutlinedIcon style={{ color: "#ffffff" }} />
                  ) : link.icon === "home" ? (
                    <HomeOutlinedIcon style={{ color: "#ffffff" }} />
                  ) : (
                    <></>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={link.category}
                  // style={{ color: "#000000" }}
                />
                {link.url ? (
                  <ListItemIcon>
                    <OpenInNewIcon style={{ color: "#ffffff" }} />
                  </ListItemIcon>
                ) : (
                  <></>
                )}
                <Divider />
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
              </ListItemButton>
              {link.details ? (
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  style={{ padding: "0 10px" }}
                >
                  {link.details.map((detail) => (
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        component="a"
                        href={detail.url}
                        target={"_blank"}
                        rel={"noreferrer noopener"}
                        divider={true}
                      >
                        {/* <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon> */}
                        <ListItemText primary={detail.name} />
                        {detail.url ? (
                          <ListItemIcon>
                            <OpenInNewIcon />
                          </ListItemIcon>
                        ) : (
                          <></>
                        )}
                      </ListItemButton>
                    </List>
                  ))}
                  <Divider />
                </Collapse>
              ) : (
                <></>
              )}
            </div>
          );
          // const [open, setOpen] = React.useState(true);
          // return <div>{link.category}</div>;
        })}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Seo
        pageTitle={`リンク`}
        pageDescription={
          "ももクロの公式サイトやライブ申し込みや・グッズ通販サイト、まるごとももクロのSNSアカウントへのリンク"
        }
        pageImg={pageUrl + "/logo512.png"}
        // pageImg={imageUrl + "/" + results[0].fileName}
        // pageImgWidth={1280}
        // pageImgHeight={960}
      />
      <CssBaseline />
      <Header />
      <main
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
        }}
      >
        <Grid container maxWidth="sm" style={{ margin: "auto" }}>
          <Grid
            item
            maxWidth="sm"
            style={{ padding: 10, width: "100%" }}
          ></Grid>
          {/* <Grid item maxWidth="sm" style={{ padding: 10, width: "100%" }}> */}
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                リンク
              </ListSubheader>
            }
          >
            <Links />
          </List>
          {/* </Grid> */}
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
                      alt="画像"
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
                      alt="画像"
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
                      alt="画像"
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
}

const styles = {
  snsLink: {
    margin: "5%",
  },
  snsIcon: {
    width: 40,
  },
};
