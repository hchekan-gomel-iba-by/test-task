import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./types";

export const setCurrentUser = (data) => ({
  type: SET_CURRENT_USER,
  payload: data,
});

export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER,
  payload: {},
});
