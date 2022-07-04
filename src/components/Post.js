import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiUrl } from "../const/const.url.js";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.results);

  useEffect(() => {
    const getPosts = async () => {
      // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = await fetch(`${apiUrl}/photosUrl?person=all`, {
        headers: {
          "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
        },
      });
      const data = await res.json();
      const items = data ? data.items : [];
      dispatch({
        type: "GET_POST_DATA",
        payload: items,
      });
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts ? (
        posts.map((post) => {
          if (post.extension === "mp4") {
            return (
              // <li key={post.id}>{post.title}</li>
              <video
                key={post.id}
                alt="video"
                controls
                style={{
                  width: window.innerWidth * 0.4, // TODO:innerWidthで指定すると一度開いてから幅を変えるとレスポンシブにならない
                  padding: 3,
                  objectFit: "cover",
                  height: window.innerWidth * 0.4,
                }}
              >
                <source
                  type="video/mp4"
                  src={`https://d1zvu3frlpm0le.cloudfront.net/${post.fileName}`}
                />
              </video>
            );
          } else {
            return (
              // <li key={post.id}>{post.title}</li>
              <img
                key={post.id}
                alt="img"
                style={{
                  width: window.innerWidth * 0.4,
                  padding: 3,
                  objectFit: "cover",
                  height: window.innerWidth * 0.4,
                }}
                src={`https://d1zvu3frlpm0le.cloudfront.net/${post.fileName}`}
              />
            );
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
