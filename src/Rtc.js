import React from 'react'; 
import store from 'store';
import ApiUtils from './ApiUtils';

import { withRouter } from 'react-router-dom';

import {rtcPeer, RtcPeer} from './RtcPeer.js';

const styles = {
	content : {
		backgroundColor : 'LightSkyBlue',
		padding : '5px'
	},
	chat : {
		padding : '5px',
	 	backgroundColor : '#ded', 
		overflowY: 'scroll', 
		marginTop : '10px',
		height : '150px',
		width: '600px',
		float: 'left'
	}
}

const base_url = 'http://viesti-web-dev.azurewebsites.net';

class Message extends React.Component {
  render (){
    return (
      <span>[{this.props.index}] {this.props.origin} : {this.props.txt} <br/></span>
    );    
  }
} 

const Chat = (props) => {
 return (
 	<div id="chat" style={styles.chat}>
		   	{props.messages.map(message  => 
		   		<Message 
			   		index={message.index} 
			   		txt={message.txt} 
			   		origin={message.origin} 
			   		key={message.index} 
		   		/>)}
  	</div>
 	);	
};

class Rtc extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	      messages : [],
	      index : 1,
	      currentMessage: ''
	    };

	    var room = null;
	    var callstatus = 0;
  	}
	
	componentWillMount() {
		this.room = store.get('room');
	    if ( this.room  !==  null ) {	
	      //we're OK let's start webrtc engine
	      //
	      rtcPeer.Run(this.room, this.receiveMessage, this.updateSessionStatus);
	      console.log('*run rtcpeer with room ' + this.room);
	    } else {
	  	  alert("Invalid room!");
	  	  this.redirectToRoot();
	    }
  	}

  	componentWillUnmount() {
    	if ( this.room  !==  null ) {	
	     store.set('room', null);
	    }
	    this.room = null;
  	}

  	redirectToRoot = () => {
     	this.props.history.push("/");
  	}

  	receiveMessage = (txt, origin) => {
  		this.setMessage(txt, origin);
  	}

  	//prepare new message send toed on data string
	setMessage = (txt, origin) => {
		this.addMessage(
			{
				index : this.state.index,
				txt : txt,
				origin : origin
			}
		);
		this.setState((prev) => ({ index : prev.index + 1 }));
	}	

	//add to message list
	addMessage = (msg) => {
	    const newMessages = this.state.messages.slice();
	    newMessages.push(msg);
	    this.setState({ messages: newMessages });
	}

	handleSend = (ev) => {
		ev.preventDefault();
		let msg = this.state.currentMessage;
		rtcPeer.Send(msg);
		console.log('*send to rtcpeer');
		this.setMessage(msg, "Expert");
		this.chatInput.value = "";	
	}

	handleChange = (ev) => {
	    this.setState({currentMessage: ev.target.value});
	}

	handleStop = (ev) => {
		ev.preventDefault();
		rtcPeer.Stop(this.receiveMessage);
		console.log('*stop rtcpeer');
    	store.set('room', null);
    	if (this.callstatus == 1) this.updateSessionStatus(2); //expert closes connection
    	this.redirectToRoot();
	}

	updateSessionStatus = (status) => {
		/*fetch sessions TODO could work with instatiation?*/
	    fetch(base_url + '/softability/sessions/update/status', { 
	      method: 'post',
	      headers: new Headers({
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      }),
	      credentials: 'include',
	      body: JSON.stringify({
		    'sessionId': this.room,
		    'status': status
		  })
	    })
	    .then(ApiUtils.checkStatus)
	    .then (results => {
	      console.log("UpdateSessionState " + results);	
	      return results.json();
	    }).then (data => {
	       console.log("updated session " + data.user._id); 
	    }).catch(err => {
	      console.log(err);
	      this.setState({error: err.response.statusText});
	    });		
	}

	render() {
		return (
		    <div id="content" /*style={styles.content}*/>    
			    <button id="stopButton" onClick={this.handleStop} >Stop</button>
				<div id="videoFrames">*videoframes</div>
				<input type="text" id="chatInput" ref={el => this.chatInput = el} placeholder="Say something" onChange={this.handleChange} />
				<button id="sendButton" 
					onClick={this.handleSend} 
					value={this.state.currentMessage}>Send</button>
				<Chat messages={this.state.messages}  />
		    </div> 
		);	
	}
}

export default withRouter(Rtc);