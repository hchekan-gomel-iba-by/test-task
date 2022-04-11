import {
    FETCH_PROJECT_START,
    FETCH_PROJECT_FAIL,
    FETCH_PROJECT_SUCCESS,
} from '../actions/types';

const initialState = {
    loading: true,
    data: []
};

const projectReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_PROJECT_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case FETCH_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default projectReducer;
