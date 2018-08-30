
import React from 'react';  
import { connect } from 'react-redux';
import { userActions } from './_actions';


const mapStateToProps = state => ({
	loggingOut: state.authentication.loggingOut,
	loggedIn: state.authentication.loggedIn,
	error: state.authentication.error,
	user: state.authentication.user
});

class Logout extends React.Component {

	componentDidMount() {
    	this.props.dispatch(userActions.logout());
  	}

	render() {

		const { loggingOut, error } = this.props;

		let message = 'Unknown state'; 
 
		if (error) {
	      	message = `Error! ${error.message}`;
	    }

	    if (loggingOut) {
			message = 'Logging out  ... ';
	    }

	    return (
	    	 <div>{message}</div>
	    );
	}
}

export default connect(mapStateToProps)(Logout);


