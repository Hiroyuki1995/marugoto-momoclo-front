import * as React from "react";
import { pageUrl } from "../../src/const/const.url.js";
import Seo from "../../src/components/Seo.js";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { Header } from "../../src/components/Header.js";

const theme = createTheme();

export default function News(props) {
  useEffect(() => {
    console.log("useEffect fired");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Seo
        pageTitle={`ニュース`}
        // pageDescription={"ももクロのライブ情報・番組出演情報などのスケジュール"}
        pageImg={pageUrl + "/logo512.png"}
        // pageImg={imageUrl + "/" + results[0].fileName}
        // pageImgWidth={1280}
        // pageImgHeight={960}
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
          Comming Soon...
        </Grid>
      </main>
    </ThemeProvider>
  );
}
