// import { Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Album } from "./album";
// import { Calendar } from "../src/screens/Calendar";
// import { ImageDetail } from "../src/screens/ImageDetail";
// import { LinkList } from "../src/screens/LinkList";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import {
//   PhotoOutlined,
//   ArticleOutlined,
//   TodayOutlined,
//   Link as LinkIcon,
// } from "@mui/icons-material";
// import { setScrollPosition } from "../src/redux/posts/operations.js";

// function App({ dispatch }) {
function App() {
  // const posts = useSelector((state) => state.posts);
  // const dispatch = useDispatch();
  // let refresh = posts.results.length === 0 ? true : false;
  // const location = useLocation();
  // const pathname = location.pathname;
  // const [value, setValue] = useState(pathname);
  console.log("App function fired");
  // useEffect(() => {
  //   console.log("pathname changed to", pathname);
  //   setValue(pathname);
  // }, [pathname]);

  return (
    // <BrowserRouter>
    <>
      <main>メインver3</main>
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
              to="/album/"
              label="SNS写真"
              value="/album/"
              // icon={<PhotoOutlined />}
              onClick={() => {
                console.log("push album");
              }}
            />
            <BottomNavigationAction
              // component={Link}
              to="/news/"
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
              to="/calendar/"
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
              to="/link/"
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
      {/* <Routes>
        <Route exact path="/" element={<Navigate to="/album/" replace />} />
        <Route path="/album/" exact element={<Album refresh={refresh} />} />
        <Route path="/album/:id" element={<ImageDetail />} />
        <Route path="/news/" element={<News />} />
        <Route path="/calendar/" element={<Calendar />} />
        <Route path="/link/" element={<LinkList />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Posts />} />
      </Routes> */}
      {/* </BrowserRouter> */}
    </>
  );
}

function News() {
  return <h2>Coming Soon...</h2>;
}

export default App;
