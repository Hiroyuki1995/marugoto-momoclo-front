// グローバルCSSを読み込みたい場合は、必ずここから呼び出す
// import '../styles/global.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress"; // 画面遷移時のプログレスバーの表示
import React, { useEffect, useRef } from "react";
import GoogleTagManager from "../src/components/GoogleTagManager.tsx";
import { googleTagManagerId } from "../src/utils/gtm";
import "../styles/global.css";
import "../styles/nprogress.css";
// import "../styles/index.css";
// import App from "./index";

import {
  ArticleOutlined,
  Link as LinkIcon,
  PhotoOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import { Provider } from "react-redux";
import createStore from "../src/redux/store/store";

export const store = createStore();

// console.log("store", store);

function App({ Component, pageProps }) {
  const scrollPositions = useRef({});
  const isBack = useRef(false);
  useEffect(() => {
    // const { pathname } = Router;
    // if (pathname === "/") {
    //   Router.Push("/album");
    // }
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

  const router = useRouter();
  const pathname = router.pathname;
  console.log("pathname", pathname);

  return (
    <Provider store={store}>
      <GoogleTagManager googleTagManagerId={googleTagManagerId} />
      <footer id="footer">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
          elevation={3}
        >
          <BottomNavigation showLabels value={pathname}>
            <BottomNavigationAction
              label="SNS写真"
              value="/album"
              icon={<PhotoOutlined />}
              onClick={() => router.push("/album")}
            />
            <BottomNavigationAction
              label="ニュース"
              value="/news"
              icon={<ArticleOutlined />}
              onClick={() => router.push("/news")}
            />
            <BottomNavigationAction
              label="スケジュール"
              value="/calendar"
              icon={<TodayOutlined />}
              onClick={() => router.push("/calendar")}
            />
            <BottomNavigationAction
              label="リンク"
              value="/link"
              icon={<LinkIcon />}
              onClick={() => router.push("/link")}
            />
          </BottomNavigation>
        </Paper>
      </footer>
      <Component {...pageProps} />
      {/* <ConnectedRouter history={history}></ConnectedRouter> */}
    </Provider>
  );
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// export default store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
