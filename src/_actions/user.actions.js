import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history, actionErrorHandler } from '../_helpers';

export const userActions = {
    login,
    logout,
    resetpassword,
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));   
        userService.login(email, password)
        .then(
            user => { 
                console.log("user action ", user);
                dispatch(success(user));
                history.push('/');
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

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    
    return dispatch => {
        dispatch(request());   
        userService.logout()
        .then(() => { 
                dispatch(success());
                history.push("/")
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

    function request(user) { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}

function resetpassword(email) {
    return dispatch => {
        dispatch(request(email));

        userService.resetpassword(email)
            .then(
                data => { 
                    dispatch(success(data));
                    history.push('/login');
                    dispatch(alertActions.success('A new password has been requested successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(username) { return { type: userConstants.RESETPASSWORD_REQUEST } }
    function success(username) { return { type: userConstants.RESETPASSWORD_SUCCESS } }
    function failure(error) { return { type: userConstants.RESETPASSWORD_FAILURE, error } }
}
