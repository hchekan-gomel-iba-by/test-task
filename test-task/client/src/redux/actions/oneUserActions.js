import { FETCH_USER_START, FETCH_USER_FAIL, FETCH_USER_SUCCESS } from "./types";
import api from "../../api/users";
export const fetchUser = (userId) => (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  });

  return api.getUserById(userId).then(
    (response) =>
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_USER_FAIL,
        payload: { error },
      })
  );
};
