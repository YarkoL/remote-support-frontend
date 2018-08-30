import React from 'react';  
import Trigger from './Trigger';

const TicketList = (props) => { 
  return (
    <div>
      {props.tickets.map(ticket  => <Trigger 
      	status = {ticket.status} 
      	key={ticket._id} 
      	title={ticket.title} 
      	description={ticket.description} 
      	id={ticket._id}
		    severity={ticket.severity}
        status={ticket.status}
        gpslocation={ticket.gpslocation}
        devicetype={ticket.devicetype}
        callrequest={ticket.callrequest}
        createdOn={ticket.createdOn}
        machineID={ticket.machineID}
      	/>)}
    </div>
  );
}

export default TicketList;
