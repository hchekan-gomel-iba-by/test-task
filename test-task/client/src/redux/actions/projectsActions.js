import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  CREATE_PROJECT_START,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECTS_START,
  DELETE_PROJECTS_FAIL,
  DELETE_PROJECTS_SUCCESS,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
} from "./types";
import api from "../../api/projects";

export const fetchProjects = () => (dispatch) => {
  dispatch({
    type: FETCH_PROJECTS_START,
  });

  return api.getProjects().then(
    (response) =>
      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_PROJECTS_FAIL,
        payload: { error },
      })
  );
};

export const deleteProject = (projectId) => (dispatch) => {
  dispatch({
    type: DELETE_PROJECTS_START,
  });
  return api.deleteProject(projectId).then(
    (response) => {
      dispatch({
        type: DELETE_PROJECTS_SUCCESS,
        payload: { success: response, id: projectId },
      });
      dispatch(fetchProjects());
    },
    (error) => {
      dispatch({
        type: DELETE_PROJECTS_FAIL,
        payload: { error },
      });
      dispatch(fetchProjects());
    }
  );
};

export const createProject = (projectData) => (dispatch) => {
  dispatch({
    type: CREATE_PROJECT_START,
  });

  return api
    .createProject({
      name: projectData.name,
      date_start: projectData.date_start,
      date_finish: projectData.date_finish,
      list_users: projectData.list_users,
    })
    .then(
      (response) => {
        dispatch({
          type: CREATE_PROJECT_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchProjects());
      },
      (error) => {
        dispatch({
          type: CREATE_PROJECT_FAIL,
          payload: { error },
        });
      }
    );
};

export const updateProject = (idProject, projectData) => (dispatch) => {
  dispatch({
    type: UPDATE_PROJECT_START,
  });

  return api
    .updateProject(idProject, {
      name: projectData.name,
      date_start: projectData.date_start,
      date_finish: projectData.date_finish,
    })
    .then(
      () => {
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
        });
        dispatch(fetchProjects());
      },
      (error) => {
        dispatch({
          type: UPDATE_PROJECT_FAIL,
          payload: { error },
        });
      }
    );
};

export default fetchProjects;
