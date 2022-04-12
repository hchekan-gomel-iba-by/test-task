import {
  FETCH_PROJECT_USER_START,
  FETCH_PROJECT_USER_SUCCESS,
  FETCH_PROJECT_USER_FAIL,
  CREATE_PROJECT_USER_START,
  CREATE_PROJECT_USER_SUCCESS,
  CREATE_PROJECT_USER_FAIL,
  DELETE_PROJECT_USER_START,
  DELETE_PROJECT_USER_SUCCESS,
  DELETE_PROJECT_USER_FAIL,
} from "./types";
import api from "../../api/projectUser";

export const fetchProjectUser = () => (dispatch) => {
  dispatch({
    type: FETCH_PROJECT_USER_START,
  });

  return api.getProjectUser().then(
    (response) =>
      dispatch({
        type: FETCH_PROJECT_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_PROJECT_USER_FAIL,
        payload: { error },
      })
  );
};

export const fetchProjectUserByIdProject = (idProject) => (dispatch) => {
  dispatch({
    type: FETCH_PROJECT_USER_START,
  });

  return api.getUserByIdProject(idProject).then(
    (response) =>
      dispatch({
        type: FETCH_PROJECT_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_PROJECT_USER_FAIL,
        payload: { error },
      })
  );
};

export const fetchProjectUserByIdUser = (idUser) => (dispatch) => {
  dispatch({
    type: FETCH_PROJECT_USER_START,
  });

  return api.getProjectByIdUser(idUser).then(
    (response) =>
      dispatch({
        type: FETCH_PROJECT_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_PROJECT_USER_FAIL,
        payload: { error },
      })
  );
};

export const createProjectUser = (projectId, userId) => (dispatch) => {
  dispatch({
    type: CREATE_PROJECT_USER_START,
  });

  return api
    .createProjectUser({
      id_project: projectId,
      id_user: userId,
    })
    .then(
      (response) => {
        dispatch({
          type: CREATE_PROJECT_USER_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchProjectUserByIdProject(projectId));
      },
      (error) => {
        dispatch({
          type: CREATE_PROJECT_USER_FAIL,
          payload: { error },
        });
      }
    );
};

export const deleteProjectUser = (projectId) => (dispatch) => {
  dispatch({
    type: DELETE_PROJECT_USER_START,
  });

  return api.deleteProjectUserAll(projectId).then(
    (response) => {
      dispatch({
        type: DELETE_PROJECT_USER_SUCCESS,
        payload: { success: response, id: projectId },
      });
      dispatch(fetchProjectUser());
    },
    (error) => {
      dispatch({
        type: DELETE_PROJECT_USER_FAIL,
        payload: { error },
      });
      dispatch(fetchProjectUser());
    }
  );
};
export const deleteUserProject = (userId) => (dispatch) => {
  dispatch({
    type: DELETE_PROJECT_USER_START,
  });

  return api.deleteUserProjectAll(userId).then(
    (response) => {
      dispatch({
        type: DELETE_PROJECT_USER_SUCCESS,
        payload: { success: response, id: userId },
      });
      dispatch(fetchProjectUser());
    },
    (error) => {
      dispatch({
        type: DELETE_PROJECT_USER_FAIL,
        payload: { error },
      });
      dispatch(fetchProjectUser());
    }
  );
};
export default fetchProjectUser;
