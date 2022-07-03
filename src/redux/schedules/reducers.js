import * as Actions from "./actions";
import initialState from "../store/initialState";

export const SchedulesReducer = (state = initialState.schedules, action) => {
  switch (action.type) {
    case Actions.REGISTER_DATA:
      console.log("action.payload", action.payload);
      return {
        ...state,
        results: [...state.results, action.payload],
      };
    case Actions.DELETE_DATA:
      console.log("action.payload", action.payload);
      console.log(
        "state.results.filter((result) => result.id !== action.payload)",
        state.results.filter((result) => result.id !== action.payload)
      );
      return {
        ...state,
        results: state.results.filter((result) => result.id !== action.payload),
      };
    default:
      return state;
  }
};
