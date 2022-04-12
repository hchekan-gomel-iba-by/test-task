import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  CREATE_COMMENTS_START,
  CREATE_COMMENTS_SUCCESS,
  CREATE_COMMENTS_FAIL,
  DELETE_COMMENTS_SUCCESS,
  DELETE_COMMENTS_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
    case CREATE_COMMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_COMMENTS_FAIL:
    case CREATE_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };

    default:
      return state;
  }
};

export default commentsReducer;
