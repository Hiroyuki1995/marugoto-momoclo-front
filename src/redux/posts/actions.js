export const GET_POST_DATA = "GET_POST_DATA";
export const CHANGE_DISPLAY_CONDITION = "CHANGE_DISPLAY_CONDITION";
export const CHANGE_SCROLL_POSOTION_CONDITION =
  "CHANGE_SCROLL_POSOTION_CONDITION";
export const CHANGE_PERSON = "CHANGE_PERSON";
export const registerPostsAction = (useState) => {
  console.log("useState in registerPostsAction", useState);
  return {
    type: "GET_POST_DATA",
    payload: useState.items,
    lastEvaluatedKey: useState.lastEvaluatedKey,
    refresh: useState.refresh,
    showAllImages: useState.showAllImages,
  };
};

export const registerNumberAction = (useState) => {
  console.log("useState", useState);
  return {
    type: "CHANGE_DISPLAY_CONDITION",
    payload: useState.numberOfColumns,
  };
};
export const registerScrollPositionAction = (useState) => {
  console.log("useState.scrollPosition", useState.scrollPosition);
  return {
    type: "CHANGE_SCROLL_POSOTION_CONDITION",
    payload: useState.scrollPosition,
  };
};

export const registerPersonAction = (useState) => {
  return {
    type: "CHANGE_PERSON",
    payload: useState.person,
  };
};

export const registerFirstDataAction = (useState) => {
  return {
    type: "REGISTER_FIRST_DATA",
    payload: useState.data,
  };
};
