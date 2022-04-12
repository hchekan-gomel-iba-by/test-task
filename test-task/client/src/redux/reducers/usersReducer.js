import {
  FETCH_USERS_START,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  CREATE_USER_START,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  DELETE_USERS_FAIL,
  DELETE_USERS_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_START:
    case CREATE_USER_START:
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USERS_FAIL:
    case CREATE_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USERS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    default:
      return state;
  }
};

export default usersReducer;
