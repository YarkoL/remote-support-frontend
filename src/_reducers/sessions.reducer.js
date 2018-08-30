import { sessionConstants } from '../_constants';

const initialState = {
  loading: false,
  sessions: [],
  error: null
}
  
export function sessions(state = initialState, action) {
   console.log('reducer ', action.type);
  
  switch (action.type) { 
    case sessionConstants.SESSIONS_REQUEST:
      console.log("SESSION_REQUEST!");
      return {
        ...state,
        loading: true
      };
    case sessionConstants.SESSIONS_SUCCESS:
      console.log("SESSION_SUCCESS!");
      return {
        ...state,
        loading: false,
        sessions: action.sessions.sessions
      };
    case sessionConstants.SESSIONS_FAILURE:  
      return {
        ...state,
        loading: false,
        error: action.error
      };
    
    default:
      return state
  }
}