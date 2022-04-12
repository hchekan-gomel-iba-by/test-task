import {
  FETCH_USER_START,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
