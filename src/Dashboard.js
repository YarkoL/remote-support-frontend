import React from 'react';  
/* import store from 'store'; */
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import { store } from './_helpers';
import { Collapse, Well, DropdownButton, Dropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userActions } from './_actions';

import Tickets from './Tickets';
import Users from './Users';
import Groups from './Groups';
import Rtc from './Rtc';
import Group from './Group';
import EditUserProfile from './Editprofile';
import Chat from './Chat';
import Logout from './Logout';

/*
Here are all the representational components. 
They are stateless and just contain some routing.

They define the main view that the user sees when she has 
successfully logged in.

A visual guide to the components

              D A S H B O A R D

          -------------------------------------------
          |                                         |                                        
  HEAD    | Logo       Searchbar   UserProfile      | 
          |------------------------------------------                                         | 
          |          .                              |                                        
          | Sidebar  .      Hub                     | 
          |          .                              | 
          |          .                              |                                        
  BODY    |          .                              | 
          |          .                              | 
          |          .                              |                                        
          |          .                              | 
          |          .                              | 
          -------------------------------------------

The component hierarchy tree

          Logo,                  
          Searchbar,            Sidebar,
          UserProfile             Hub 
            |                       |   
           Head                  Body
            |                     |
            ----------------------
                      | 
                 Dashboard

*/


//2nd level: children of Head

/*
Logo: Softability logo, links to root4
*/
const Logo = () => (
  <div className="col-md-4 viesti-full-height">
    <Link to='/'><img className="img-responsive viesti-logo-header viesti-header-center" src="/images/logo_VIESTI.png" /></Link>
  </div>
)

/*
Searchbar : (not implemented)
*/
const Searchbar = () => (
  <div className="col-md-4 viesti-full-height">
    <div className="viesti-header-center">
      <div className="viesti-search-bar">
        <i className="glyphicon glyphicon-search"></i>
        <input className="form-control" placeholder="Search..." />
      </div>
    </div>
  </div> 
)

/*
Userprofile: shows the user avatar image 
dropdown links to profile preferences and allows to log out
Direct link to Users 
*/
const UserProfile = () => (
  <div className="col-md-4 viesti-full-height">
      <div className="pull-right viesti-header-profile">
        <DropdownButton
          id={'dropdown-basic-'}
          title={<img className="img-circle viesti-header-profile-pic" src="/images/blank-profile-picture-973460_640.png" />}
          className={'viesti-dropdown-toggle'}
          bsStyle='link'
          noCaret
        >
          <ul>
            <li><Link to='/editprofile'>Edit profile</Link></li>
            <li>Settings</li>
            <li><Link to='/logout'>Log out</Link></li>
          </ul>
          <Route path='/users' component={Users}/>
        </DropdownButton>
      </div>
  </div>
)

//2nd level: children of Body

/*
Sidebar: button menu links to Users, Groups
also houses a chat window (not implemented)
*/
const Sidebar = (props) => ( 
  <div className="col-md-2 viesti-full-height">
    <div className="viesti-navbar">
        <div className="menu">
          <Link className="btn viesti-nav-button" to='/users'>User</Link><br/>
          <Link className="btn viesti-nav-button" to='/groups'>Groups</Link><br/>
        </div>
        <hr/>
        <Chat/>
      </div>
    </div>
)

/*
Hub: the "central point" that defines all the routes
By default displays Tickets component, which is a list
of "tickets", visual representations of session data
*/
const Hub = () => ( 
  <div className="col-md-10 viesti-full-height">
      <Switch>
          <Route exact path='/' component={Tickets}/>
          <Route path='/users' component={Users}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/groups' component={Groups}/>
          <Route path='/editprofile' component={EditUserProfile}/>
          <Route path='/rtc' component={Rtc}/>
          <Route path='/group/:id?/:name?' component={Group}/>
      </Switch>
  </div>
)

//first level : children of Dashboard, purely organizational

const Head = () => ( 
  <nav className="navbar navbar-fixed-top">
    <div className="row viesti-header">
      <Logo/>
      <Searchbar/>
      <UserProfile/>
    </div>
  </nav>
)

const Body = () => ( 
  <div className=" viesti-body-full-height">
    <Sidebar/>
    <Hub/>  
  </div>
)

//root level

class Dashboard extends React.Component {
  render (){ 
  	return (
     <div>
        <Head/>
        <Body/>
     </div>
  	);
  }
}

export default withRouter(Dashboard);
