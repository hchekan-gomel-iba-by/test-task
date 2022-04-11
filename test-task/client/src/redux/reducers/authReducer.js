import {
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER
  } from '../actions/types';
  
  const initialState = {
    data: {
        id: localStorage.getItem('id'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        role: localStorage.getItem('role'),
    }
  };
  
  const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('password', action.payload.password);
            localStorage.setItem('role', action.payload.role);
            return {
                ...state,
                data: action.payload
            };
        case CLEAR_CURRENT_USER:
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('role');
            return {
                ...state,
                data: action.payload 
            };
        default:
            return state;
    }
  };
  
  export default authReducer;
  