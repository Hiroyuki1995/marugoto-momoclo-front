import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
// import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { routerReducer, createRouterMiddleware } from "connected-next-router";

// Import reducers
import { PostsReducer } from "../posts/reducers";
import { SchedulesReducer } from "../schedules/reducers";
// import { createWrapper } from "next-redux-wrapper";

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore() {
  // // Define individual settings of redux-logger
  // let middleWares = [routerMiddleware(history), thunk];
  // if (process.env.NODE_ENV === "development") {
  //   const logger = createLogger({
  //     collapsed: true,
  //     diff: true,
  //   });
  //   middleWares.push(logger);
  // }
  // console.log("history", history);
  const routerMiddleware = createRouterMiddleware();
  return reduxCreateStore(
    // オリジナル createStore の別名
    combineReducers({
      posts: PostsReducer,
      schedules: SchedulesReducer,
      router: routerReducer,
    }),
    applyMiddleware(thunk, routerMiddleware)
  );
}

// export const wrapper = createWrapper(createStore);
