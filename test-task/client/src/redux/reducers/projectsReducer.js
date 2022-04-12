import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  CREATE_PROJECT_START,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECTS_FAIL,
  DELETE_PROJECTS_SUCCESS,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const projectsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PROJECTS_START:
    case CREATE_PROJECT_START:
    case UPDATE_PROJECT_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_PROJECTS_FAIL:
    case CREATE_PROJECT_FAIL:
    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    default:
      return state;
  }
};

export default projectsReducer;
