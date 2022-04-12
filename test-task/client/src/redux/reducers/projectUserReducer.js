import {
  FETCH_PROJECT_USER_START,
  FETCH_PROJECT_USER_SUCCESS,
  FETCH_PROJECT_USER_FAIL,
  CREATE_PROJECT_USER_START,
  CREATE_PROJECT_USER_SUCCESS,
  CREATE_PROJECT_USER_FAIL,
  DELETE_PROJECT_USER_SUCCESS,
  DELETE_PROJECT_USER_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const projectUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PROJECT_USER_START:
    case CREATE_PROJECT_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_PROJECT_USER_FAIL:
    case CREATE_PROJECT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_PROJECT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PROJECT_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_PROJECT_USER_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };

    default:
      return state;
  }
};

export default projectUserReducer;
