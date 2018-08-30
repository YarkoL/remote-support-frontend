"use strict"
import React from 'react';  
import ReactDOM from 'react-dom';
/* import store from 'store'; */
import {Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './Login'

/* let DEBUG = false; */

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    /* const basePath = '/' + location.pathname.split('/')[1]; */
    return(  
        <Provider store={store}>
          <Router history={history}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <PrivateRoute /* exact */ path='/' component={Dashboard}/>
              </Switch>
          </Router>
        </Provider>
    );
  }
}
   

//init store values
/* store.set('loggedIn', DEBUG ? true : false); */
/* store.set('room', null); */

const destination = document.getElementById('app');
ReactDOM.render(<App />, destination);

/* const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
 */
export default withRouter(App);

