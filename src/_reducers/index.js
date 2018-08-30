import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { sessions } from './sessions.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  sessions
});

export default rootReducer;