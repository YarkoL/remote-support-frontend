import { sessionConstants } from '../_constants';
import { sessionService } from '../_services';
import { alertActions } from './';

export const sessionActions = {
   getSessions
}

function getSessions() {    
    return dispatch => {
        dispatch(request());   
        sessionService.getSessions()
        .then((sessions) => { 
                console.log('session actions ', sessions);
                dispatch(success(sessions));
                //put any routing here
            }
        )
        .catch(
            error => {
                dispatch(failure(error));
                console.log(error.message);
                dispatch(alertActions.error(error));
            }
        )    
    };

    function request() { return { type: sessionConstants.SESSIONS_REQUEST } }
    function success(sessions) { return { type: sessionConstants.SESSIONS_SUCCESS, sessions } }
    function failure(error) { return { type: sessionConstants.SESSIONS_FAILURE, error } }
} 