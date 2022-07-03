import { useState } from "react";

export const REGISTER_DATA = "REGISTER_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const registerScheduleAction = (useState) => {
  return {
    type: "REGISTER_DATA",
    payload: useState.event,
  };
};

export const deleteScheduleAction = (useState) => {
  return {
    type: "DELETE_DATA",
    payload: useState.id,
  };
};
