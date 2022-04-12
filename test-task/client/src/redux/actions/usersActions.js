import {
  FETCH_USERS_START,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  CREATE_USER_START,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  DELETE_USERS_START,
  DELETE_USERS_FAIL,
  DELETE_USERS_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "./types";
import api from "../../api/users";

export const fetchUsers = () => (dispatch) => {
  dispatch({
    type: FETCH_USERS_START,
  });

  return api.getUsers().then(
    (response) =>
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_USERS_FAIL,
        payload: { error },
      })
  );
};

export const deleteUser = (userId) => (dispatch) => {
  dispatch({
    type: DELETE_USERS_START,
  });

  return api.deleteUser(userId).then(
    (response) => {
      dispatch({
        type: DELETE_USERS_SUCCESS,
        payload: response.data,
      });
      dispatch(fetchUsers());
    },
    (error) => {
      dispatch({
        type: DELETE_USERS_FAIL,
        payload: { error },
      });
      dispatch(fetchUsers());
    }
  );
};

export const createUser = (userData) => (dispatch) => {
  dispatch({
    type: CREATE_USER_START,
  });

  return api
    .createUser({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    })
    .then(
      (response) => {
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchUsers());
      },
      (error) => {
        dispatch({
          type: CREATE_USER_FAIL,
          payload: { error },
        });
      }
    );
};

export const updateUser = (userData) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_START,
  });

  return api
    .updateUser({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    })
    .then(
      () => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
        });
        dispatch(fetchUsers());
      },
      (error) => {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: { error },
        });
      }
    );
};

export default fetchUsers;
