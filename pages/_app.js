// グローバルCSSを読み込みたい場合は、必ずここから呼び出す
// import '../styles/global.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import React from "react";
import ReactDOM from "react-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import "../styles/global.css";
import "../styles/nprogress.css";
import Router from "next/router";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";
// import "../styles/index.css";
// import App from "./index";

import createStore from "../src/redux/store/store";
import { Provider } from "react-redux";
import * as History from "history";

export const store = createStore();

// console.log("store", store);

function App({ Component, pageProps }) {
  const scrollPositions = useRef({});
  const isBack = useRef(false);
  useEffect(() => {
    Router.onRouteChangeStart = () => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => {
      NProgress.done();
    };
    Router.onRouteChangeError = () => {
      NProgress.done();
    };
  }, []);

  useEffect(() => {
    Router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    const onRouteChangeStart = () => {
      const url = Router.pathname;
      scrollPositions.current[url] = window.scrollY;
    };

    const onRouteChangeComplete = (url) => {
      if (
        // isBack.current &&
        scrollPositions.current[url]
      ) {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        });
      }

      isBack.current = false;
    };

    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [Router]);

  return (
    <Provider store={store}>
      {/* <> */}
      <footer id="footer">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
            // style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1 }}
          >
            <BottomNavigationAction
              // component={Link}
              href="/album/"
              label="SNS写真"
              value="/album/"
              // icon={<PhotoOutlined />}
              onClick={() => {
                console.log("push album");
              }}
            />
            <BottomNavigationAction
              // component={Link}
              href="/news/"
              label="ニュース"
              value="/news/"
              // icon={<ArticleOutlined />}
              onClick={() => {
                console.log("push news");
                // if (pathname === "/album/") {
                //   dispatch(setScrollPosition(window.pageYOffset));
                // }
              }}
            />
            <BottomNavigationAction
              // component={Link}
              href="/calendar/"
              label="スケジュール"
              value="/calendar/"
              // icon={<TodayOutlined />}
              onClick={() => {
                console.log("push calendar");
                // if (pathname === "/album/") {
                //   dispatch(setScrollPosition(window.pageYOffset));
                // }
              }}
            />
            <BottomNavigationAction
              // component={Link}
              href="/link/"
              label="リンク"
              value="/link/"
              // icon={<LinkIcon />}
              onClick={() => {
                console.log("push link");
                // if (pathname === "/album/") {
                //   dispatch(setScrollPosition(window.pageYOffset));
                // }
              }}
            />
          </BottomNavigation>
        </Paper>
      </footer>
      <Component {...pageProps} />
      {/* <ConnectedRouter history={history}></ConnectedRouter> */}
    </Provider>
    // </>
  );
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// export default store;
