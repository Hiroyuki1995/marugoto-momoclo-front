import * as Actions from "./actions";
import initialState from "../store/initialState";

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.GET_POST_DATA:
      console.log("action.payload", action.payload);
      console.log("action.showAllImages", action.showAllImages);
      console.log(
        "state.searchCondition.showAllImages",
        state.searchCondition.showAllImages
      );
      if (action.refresh === true) {
        return {
          ...state,
          results: [...action.payload],
          searchCondition: {
            ...state.searchCondition,
            // ...action.searchCondition,
            lastEvaluatedKey: action.lastEvaluatedKey,
            showAllImages: action.showAllImages,
          },
          // lastEvaluatedKey: action.lastEvaluatedKey,
        };
      }
      return {
        ...state,
        results: [...state.results, ...action.payload],
        searchCondition: {
          ...state.searchCondition,
          lastEvaluatedKey: action.lastEvaluatedKey,
          showAllImages: action.showAllImages,
        },
        // lastEvaluatedKey: action.lastEvaluatedKey,
      };
    // return { results: [...action.payload] };
    case Actions.CHANGE_DISPLAY_CONDITION:
      console.log("action.payload", action.payload);
      // console.log("action.searchCondition", action.searchCondition);
      return {
        ...state,
        displayCondition: {
          ...state.displayCondition,
          numberOfColumns: action.payload,
        },
      };
    case Actions.CHANGE_SCROLL_POSOTION_CONDITION:
      console.log("action.payload", action.payload);
      // console.log("action.searchCondition", action.searchCondition);
      return {
        ...state,
        displayCondition: {
          ...state.displayCondition,
          scrollPosition: action.payload,
        },
      };
    case Actions.CHANGE_PERSON:
      return {
        ...state,
        searchCondition: {
          ...state.searchCondition,
          person: action.payload,
        },
      };
    default:
      return state;
  }
};
