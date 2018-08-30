import { userConstants } from '../_constants';

let userInStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user : userInStorage,
  loggingIn : false,
  loggingOut : false,
  loggedIn : false,
  error : null
}
  

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:  
      return {
        ...state,
        loggingIn:false,
        user: null,
        error: action.error
      };
    case userConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loggingOut: true
      };  
    case userConstants.LOGOUT_SUCCESS:
     console.log("LOGOUT_SUCCESS");
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case userConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loggingOut: false,
        error: action.error
      };  
    default:
      return state
  }
}