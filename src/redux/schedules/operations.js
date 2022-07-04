import { registerScheduleAction, deleteScheduleAction } from "./actions.js";
import dayjs from "dayjs";
// import { push } from "connected-react-router";

export const registerSchedule = (event) => {
  return async (dispatch, getState) => {
    const state = getState();
    let id;
    if (!event.start) {
      // 日付のみ指定されている場合は、時刻を00:00:XXとし、XXを00~60のランダム値とする。
      id =
        dayjs(event.date).format("YYYYMMDD") +
        "0000" +
        ("00" + Math.floor(Math.random() * 61)).slice(-2);
    } else {
      // 時刻が指定されている場合は、秒のみ00~60のランダム値とする。
      id =
        dayjs(event.start).format("YYYYMMDDHHmm") +
        ("00" + Math.floor(Math.random() * 61)).slice(-2);
    }

    console.log("id", id);
    event.id = id;
    // const res = await fetch(
    //   `https://tulmp5bh2j.execute-api.ap-northeast-1.amazonaws.com/prod/photosUrl?}`,
    //   {
    //     headers: {
    //       "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
    //     },
    //   }
    // );
    // const data = await res.json();
    // const items = data ? data.items : [];
    // const LastEvaluatedKey = JSON.stringify(data.LastEvaluatedKey);
    // const showAllImages = data.LastEvaluatedKey ? false : true;
    // }
    dispatch(
      registerScheduleAction({
        event: event,
      })
    );
  };
};

export const deleteSchedule = (scheduleId) => {
  return async (dispatch, getState) => {
    const state = getState();
    // const res = await fetch(
    //   `https://tulmp5bh2j.execute-api.ap-northeast-1.amazonaws.com/prod/photosUrl?}`,
    //   {
    //     headers: {
    //       "x-api-key": "dxZgNirsUH288XujmlO1G14PT39FUtec8FrNGDhL",
    //     },
    //   }
    // );
    // const data = await res.json();
    // const items = data ? data.items : [];
    // const LastEvaluatedKey = JSON.stringify(data.LastEvaluatedKey);
    // const showAllImages = data.LastEvaluatedKey ? false : true;
    // }
    dispatch(
      deleteScheduleAction({
        id: scheduleId,
      })
    );
  };
};
