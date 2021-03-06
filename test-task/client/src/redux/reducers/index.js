import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import oneProjectReducer from "./oneProjectReducer";
import oneUserReducer from "./oneUserReducer";
import projectUserReducer from "./projectUserReducer";
import commentsReducer from "./commentsReducer";

const combine = combineReducers({
  routing: routerReducer,
  projects: projectsReducer,
  users: usersReducer,
  currentUser: authReducer,
  project: oneProjectReducer,
  user: oneUserReducer,
  projectUser: projectUserReducer,
  comments: commentsReducer,
});

const reducers = (state, action) => combine(state, action);

export default reducers;
