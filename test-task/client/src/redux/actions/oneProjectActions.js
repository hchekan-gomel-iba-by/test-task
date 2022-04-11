import {
    FETCH_PROJECT_START,
    FETCH_PROJECT_FAIL,
    FETCH_PROJECT_SUCCESS,
} from './types';
import api from '../../api/projects';
export const fetchProject = (projectId) => dispatch => {
    dispatch({
        type: FETCH_PROJECT_START
    });

    return api.getProjectById(projectId).then(
        response =>
            dispatch({
                type: FETCH_PROJECT_SUCCESS,
                payload: response.data
            }),
        error =>
            dispatch({
                type: FETCH_PROJECT_FAIL,
                payload: { error }
            })
    );
};