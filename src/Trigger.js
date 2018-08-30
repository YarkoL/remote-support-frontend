import React from 'react'; 
import { Modal, Button } from 'react-bootstrap';
import store from 'store';
import { withRouter } from 'react-router-dom';

class StatusIndicator extends React.Component{

  renderStatus = (status) => {
    switch(status) {
      case 0:
        return 'viesti-status-green';
      case 1:  
        return 'viesti-status-yellow';
      case 2:  
        return 'viesti-status-red';  
    }
  }

  render(){
    return(
          <div className={this.renderStatus(this.props.status)}>
          </div>
    );
  }    
}


class Trigger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: '',
      description: '',
      severity:'',
      status:'',
      id: '',
      buttonTxt: '',
      gpslocation: '',
      devicetype:'',
      callrequest:'',
      createdOn:'',
      machineID:''
    };
  }

  componentDidMount() {
      this.setState({
        description : this.props.description,
        title : this.props.title,
        id : this.props.id,
        buttonTxt : this.props.id, //could change later
        severity : this.props.severity,
        status : this.props.status,
        gpslocation : this.props.gpslocation,
        devicetype : this.props.devicetype,
        callrequest : this.props.callrequest,
        createdOn : this.props.createdOn,
        machineID : this.props.machineID
      });
    }

  handleHide = () => {
    this.setState({ show: false });
  }

  handleClick = (ev) => {
    ev.preventDefault();
    
    console.log("Clicked ticket with id " + this.state.id);
    store.set('room', this.state.id);
    this.props.history.push("/rtc");
  }

  render() {
    //console.log(this.state);
    return (

      <div className="col-md-12">
      <table className="table-style-sessions-list">
          <tbody>
            <tr style={{backgroundColor: 'aliceblue'}}>
            
          <td className="viesti-table-separated">
      <StatusIndicator status={this.state.status}/>
    </td>     
          <td className="viesti-table-separated">


      <div className='viesti-table-container'>
        <button onClick={() => this.setState({ show: true })}>
          {this.state.buttonTxt}
        </button>

        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          bsSize='large'
          /* aria-labelledby='contained-modal-title-lg' */
        >

          <Modal.Header closeButton>
            <div className = 'viesti-table-header'>
            <Modal.Title>
              {this.state.title}
            </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
          <div>
              <table className="">
              <tbody>
                <tr>
                  <td className='viesti-table-left-td'>Created: {this.state.createdOn} </td>
                  <td className='viesti-table-right-td'>Device: {this.state.devicetype} </td>
                  <td className='viesti-table-right-td'>Machine: {this.state.machineID} </td>
                </tr>
                </tbody>
              </table>
              <div className='viesti-sessions-table'>
                <div className='pull-left form-group'>
                    <table>
                        <tbody>
                          <tr>
                            <td title='Tags'>Tags:</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                  <div className="viesti-description">
                      <label title="Description"></label>
                      <p> {this.state.description}</p>
                  </div>
                  <div className="form-group">
                      <label title="Severity">Severity</label>
                      <p> {this.state.severity}</p>
                  </div>
                  <div className="form-group">
                      <label title="Status">Status</label>
                      <p> {this.state.status}</p>
                  </div>
                  <div className="form-group">
                      <label title="GPSLocation">GpsLocation</label>
                      <p>{this.state.gpslocation}</p>
                  </div>
                  <div className="form-group">
                      <label title="Device Type">DeviceType</label>
                      <p>{this.state.devicetype}</p>
                  </div>
                  <div className="form-group">
                      <label title="Call Request">CallRequest</label>
                      <p>{this.state.callrequest}</p>
                  </div>  
              </div>
            </div>  
        
          </Modal.Body>
          <Modal.Footer>
            <div className='viesti-modal-footer'>
              <div className='row'>
                <div className=""><button onClick={this.handleHide} className='pull-left btn viesti-forms-button-close' >Close</button></div>
                <div className=""><button onClick={this.handleClick} className='pull-right btn viesti-forms-button-save'>Connect</button></div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      </td>
          </tr></tbody>
          <tbody><tr>
              <td className="viesti-table-separated"></td>
              <td className="viesti-table-separated viesti-sessions-desc-text">{this.state.description}</td>
          </tr></tbody>
    </table>
  </div>
    );
  }
}


export default withRouter(Trigger);