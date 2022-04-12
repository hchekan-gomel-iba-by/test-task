import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  CREATE_COMMENTS_START,
  CREATE_COMMENTS_SUCCESS,
  CREATE_COMMENTS_FAIL,
  DELETE_COMMENTS_START,
  DELETE_COMMENTS_SUCCESS,
  DELETE_COMMENTS_FAIL,
} from "./types";
import api from "../../api/comments";

export const fetchComments = () => (dispatch) => {
  dispatch({
    type: FETCH_COMMENTS_START,
  });

  return api.getComments().then(
    (response) =>
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_COMMENTS_FAIL,
        payload: { error },
      })
  );
};

export const fetchCommentsByIdProject = (idProject) => (dispatch) => {
  dispatch({
    type: FETCH_COMMENTS_START,
  });

  return api.getCommentsByIdProject(idProject).then(
    (response) =>
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_COMMENTS_FAIL,
        payload: { error },
      })
  );
};

export const createComments = (comment) => (dispatch) => {
  dispatch({
    type: CREATE_COMMENTS_START,
  });

  return api
    .createComments({
      id_project: comment.id_project,
      id_user: comment.id_user,
      comment: comment.comment,
    })
    .then(
      (response) => {
        dispatch({
          type: CREATE_COMMENTS_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchCommentsByIdProject(comment.projectId));
      },
      (error) => {
        dispatch({
          type: CREATE_COMMENTS_FAIL,
          payload: { error },
        });
      }
    );
};

export const deleteCommentsByIdProject = (projectId) => (dispatch) => {
  dispatch({
    type: DELETE_COMMENTS_START,
  });

  return api.deleteCommentsByIdProject(projectId).then(
    (response) => {
      dispatch({
        type: DELETE_COMMENTS_SUCCESS,
        payload: { success: response, id: projectId },
      });
      dispatch(fetchComments());
    },
    (error) => {
      dispatch({
        type: DELETE_COMMENTS_FAIL,
        payload: { error },
      });
      dispatch(fetchComments());
    }
  );
};
export const deleteCommentsByIdUser = (userId) => (dispatch) => {
  dispatch({
    type: DELETE_COMMENTS_START,
  });

  return api.deleteCommentsByIdUser(userId).then(
    (response) => {
      dispatch({
        type: DELETE_COMMENTS_SUCCESS,
        payload: { success: response, id: userId },
      });
      dispatch(fetchComments());
    },
    (error) => {
      dispatch({
        type: DELETE_COMMENTS_FAIL,
        payload: { error },
      });
      dispatch(fetchComments());
    }
  );
};
export default fetchComments;
