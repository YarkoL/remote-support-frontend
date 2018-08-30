import React from 'react';  

import openSocket from 'socket.io-client';
import TicketList from './TicketList';
import { connect } from 'react-redux';
import { sessionActions } from './_actions';

const mapStateToProps = state => ({
	loading: state.sessions.loading,
	sessions: state.sessions.sessions,
	error: state.sessions.error
});

class Tickets extends React.Component {

	constructor() {
	    super();
	    this.state = { ticketsLoaded : false };
  	}

	componentWillMount() {
		this.props.dispatch(sessionActions.getSessions());
	}

	componentDidUpdate() {
		console.log("here!")
	}

	createTicket = (newTicket) => {
	    const newTickets = this.state.tickets.slice();
	    newTickets.push(newTicket);
	    console.log(newTicket);
	    this.setState({ tickets: newTickets });
	}
	

	initSocket = () => {
	    const socket = openSocket(base_url);
	    socket.on('connect', () => {
		    console.log('Socket connected');
		  });
		  socket.on('disconnect', () => {
		    console.log('Socket disconnected');
		  });
		  socket.on('error', (err) => {
		    if(err === 'handshake error') {
		      console.log('Socket handshake error', err);
		    } else {
		      console.log('Socket error', err);
		    }
		});
	    socket.on('roomname', (data) => {
	        console.log('socket message '+ JSON.stringify(data));       
	        this.createTicket(
	        	{
	        		status : data.status,
			      	title : data.title, 
			      	description : data.description, 
			      	_id : data._id,
					severity : data.severity,
			        status : data.status,
			        gpslocation : data.gpslocation,
			        devicetype : data.devicetype,
			        callrequest : data.callrequest,
			        createdOn : data.createdOn,
			        machineID : data.machineID
	        	}
	        ); 
	    });
  	} 

	render() {

		const { error, loading, sessions } = this.props;

		console.log('render ', sessions);

		if (error) {
	      return <div>Error! {error.message}</div>;
	    }

	    /*
	    if (loading) {
	      return <div>Loading...</div>;
	    }
	    */

	    if (sessions.length > 0) {
		  	//return <TicketList tickets={sessions.sessions} />
		  	console.log('render/sessions ', sessions);
		  	return <div>OK!</div>
	  	}

	  	return <div>Loading...</div>;
  	}
}

export default connect(mapStateToProps)(Tickets);
