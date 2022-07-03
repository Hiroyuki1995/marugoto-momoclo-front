import {
  registerPostsAction,
  registerNumberAction,
  registerScrollPositionAction,
  registerPersonAction,
} from "./actions.js";
import { apiUrl } from "../../const/const.url.js";

export const fetchPosts = (person, lastEvaluatedKey, refresh) => {
  return async (dispatch, getState) => {
    const state = getState();
    // const isLoading = state.posts.isLoading;

    // if (!isLoading) {
    const res = await fetch(
      `${apiUrl}/photosUrl?person=${person}${
        lastEvaluatedKey !== null
          ? `&exclusiveStartKey=${encodeURIComponent(lastEvaluatedKey)}`
          : ``
      }`,
      {
        headers: {
          "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
        },
      }
    );
    const data = await res.json();
    const items = data ? data.items : [];
    const LastEvaluatedKey = JSON.stringify(data.LastEvaluatedKey);
    const showAllImages = data.LastEvaluatedKey ? false : true;
    console.log(
      "API直後 LastEvaluatedKey",
      LastEvaluatedKey,
      "showAllImages",
      showAllImages
    );
    // }
    dispatch(
      registerPostsAction({
        items: items,
        lastEvaluatedKey: LastEvaluatedKey,
        refresh: refresh,
        showAllImages: showAllImages,
      })
    );
  };
};

export const changeNumberOfColumns = (number) => {
  console.log("number", number);
  return (dispatch, getState) => {
    console.log("number", number);
    dispatch(
      registerNumberAction({
        numberOfColumns: number,
      })
    );
  };
};

export const changePerson = (person) => {
  console.log("person", person);
  return (dispatch, getState) => {
    dispatch(
      registerPersonAction({
        person: person,
      })
    );
  };
};

export const setScrollPosition = (scrollPosition) => {
  console.log("scrollPosition", scrollPosition);
  return (dispatch, getState) => {
    console.log("scrollPosition", scrollPosition);
    dispatch(
      registerScrollPositionAction({
        scrollPosition: scrollPosition,
      })
    );
  };
};
