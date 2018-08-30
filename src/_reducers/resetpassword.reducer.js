import { userConstants } from '../_constants';

export function resetpassword(state = {}, action) {
  switch (action.type) {
    case userConstants.RESETPASSWORD_REQUEST:
      return { /* resetting: true  */};
    case userConstants.RESETPASSWORD_SUCCESS:
      return {};
    case userConstants.RESETPASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}