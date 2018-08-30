
import React from 'react';
import store from 'store';
import { Modal, Button, Alert } from 'react-bootstrap';
import ApiUtils from './ApiUtils';
import Group from './Group';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

/* class AlertDismissable extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            show:this.props.show,
        };
    }
   
} */    
class AlertDismissable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: this.props.popUp,
        }
    }
    render(){
        if(this.props.popUp=== true){
            return(
                <Alert bsStyle={this.props.style} onDismiss={this.props.handleDismiss}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.message}</p>
                </Alert>);   
            }  
        return <div></div>;
    }
}
class GroupHeader extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            organization: '',
            description: '',
            name: '',
            error:'',
            popUp: false,
            success:false,
            title: '',
            message:'',
            style:'',

/*             showing: false, */
        };
    }
/*     handleClosing() {
        this.setState({ showing: false });
    } */
/*     handleView() {
        this.setState({ showing: true });
    } */ 
    handleDismiss = () => {
        this.setState({ popUp: false });
    }
    
    handlePopUp = () => {
        this.setState({ popUp: true });
    }

    handleShow =()=> {
        this.setState({ show: true });
    }
    handleClose =()=> {
        this.setState({ show: false });
    }
    handleSubmit = (ev) =>{
        ev.preventDefault();

        let description = this.state.description;
        let organization = this.state.organization;
        let name = this.state.name;

        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups',{
            method: 'post',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                'name': name, 
                'description': description,
                'organization': organization, 
                })
        }).then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
            this.setState({error: false});
            this.props.handleGroupUpdate();
            this.handleNotifications(this.state.error);   
            console.log(this.state.error);

            
        })
        .catch(err => {
        console.log(err);  
        this.setState({error: err});     
        this.handleNotifications(this.state.error);   
        console.log(this.state.error);
        })
        
        this.setState({ show: false });
        
        
    }  
    handleNotifications = (err) =>{
        /* console.log(err.response.statusText); */
        console.log(err);
        if(err === false){
            this.setState({
                popUp:true,
                success:true,
                message: 'You succesfully created a group called ' + this.state.name,
                title: 'Success!',
                style: 'success',
            });
         }
        else if(err.response.statusText.length > 0){
            this.setState({
                popUp:true,
                success: false,
                message: err.response.statusText,
                title: 'Something went wrong',
                style: 'danger',
            });
         }
         console.log(this.state.popUp);
         console.log(this.state.success);
         console.log(this.state.message);
         console.log(this.state.title);
         console.log(this.state.style);

    }
    handleNameChange = (ev) => {
	    this.setState({name: ev.target.value});
    }
    handleOrganizationChange = (ev) => {
	    this.setState({organization: ev.target.value});
    }
    handleDescriptionChange = (ev) => {
	    this.setState({description: ev.target.value});
    }   	
/*     handleDelete = (ev)=> {
        ev.preventDefault();
        console.log(this.props.groupId);
        let id = this.props.groupId;
        console.log(id);
        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups/'+ id,{
            method: 'delete',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
            }),
        }).then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch(err => {
        console.log(err);
        })
        this.handleClosing();
    }  */
    render(){
        return(            
        <div> 
            <AlertDismissable style={this.state.style} success={this.state.success} handleDismiss={this.handleDismiss} popUp={this.state.popUp} title={this.state.title} message={this.state.message}/>
            <div className="viesti-table-header">
            <div className="center-container">
                <div className="pull-left viesti-table-h">Groups</div>
                    <div className="pull-left">
                    <button className="viesti-table-btn glyphicon glyphicon-plus" onClick={this.handleShow}></button>
                </div>
{/*                 <div className="pull-left">
                    <button className="viesti-table-btn glyphicon glyphicon-trash" onClick={this.handleView}></button>
                </div> */}
                <div className="pull-left viesti-table-search-bar">
                    <i className="glyphicon glyphicon-search"></i>
                    <input type="search" className="form-control" placeholder="Search" />
                </div>
            </div>
        </div>
            <Modal show={this.state.show} onHide={this.handleClose} >
                <Modal.Header  className='viesti-form-container'>
                    <Modal.Title>Create group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='viesti-form-container'>
                    <form className='form-group' method="post" action="" onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <label>Name</label>
                                <input className='form-control viesti-form-container-input' type="text" placeholder="Name.."value={this.state.name} onChange={this.handleNameChange} />
                                <span className="text-danger"></span>
                            </div>
                            <div className='form-group '>
                        <label>Description</label>
                            <input className='form-control viesti-form-container-input' type="text" placeholder="Description..." value={this.state.description} onChange={this.handleDescriptionChange} />
                            <span className="text-danger"></span>
                            </div>
                            <div className='form-group'>
                        <label>Organization</label>
                            <input className='form-control viesti-form-container-input' type="text" placeholder="Organization..."value={this.state.organization} onChange={this.handleOrganizationChange} />
                            <span className="text-danger"></span>
                            </div>
                            <br/>
                            <div>
                                <button type='button' onClick={this.handleClose} className="pull-left btn viesti-forms-button-close" >Close</button>
                                <button type="submit" className='pull-right btn viesti-forms-button-save'>Save changes</button>
                            </div>
                            <br/>
                    </form>
                </Modal.Body>          
            </Modal>
            {/* <DeleteGroupModal groupId={this.props.groupId} showing={this.state.showing} handleDelete={this.handleDelete} handleClosing={this.handleClosing} /> */}
        </div>

        );
    }
}  

/* class DeleteGroupModal extends React.Component{
    render(){
        return(
            <Modal name='delete' show={this.props.showing} onHide={this.props.handleClosing} >
            <Modal.Header className='viesti-form-container'>
                <Modal.Title>Delete group</Modal.Title>
            </Modal.Header>
            <Modal.Body className='viesti-form-container'>
                <p>Are you sure you want to delete group {this.props.groupId}?</p>
                <div>
                <Button onClick={this.props.handleClosing} className="pull-left btn viesti-forms-button-close" >Cancel</Button>
                <Button className='pull-right btn viesti-forms-button-save' onClick={this.props.handleDelete}>Delete</Button></div><br/><br/>
            </Modal.Body>          
    </Modal>
        )
    }
} */
class GroupsList extends React.Component{

    render(){
        return(
            <div>
                 <div className="viesti-table-groups">
                    <div className="viesti-table-container">
                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th className="viesti-groups-th"></th>
                                    <th className="viesti-groups-th">Groups</th>
                                    <th className="viesti-groups-th">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.groups.map(group => 
                            
                                <tr key={group._id}>
                                    <th className="viesti-groups-th"></th>
                                    <td className="viesti-groups-td-name">
                                        {/* <input name='groupId' value={group._id} className='pull-left' defaultChecked={false} onChange={this.props.handleCheckboxChange} type="checkbox" /> */}
                                        <div className="viesti-groups-a pull-left" value={group}>
                                            <Link to={'/group/' + group._id+ '/'+ group.name}>{group.name}</Link>
                                        </div><br/>
                                    </td>
                                    <td>{group.description}</td>
                                    <th className="viesti-groups-th"></th>
                                </tr>
                                )}
                        </tbody>
                    </table>
                    <br/>
                    </div>
                </div>      
            </div>
        )
    }
} 

class Groups extends React.Component{
    constructor(props){
        super(props);
/*         this.handleCheckboxChange = this.handleCheckboxChange.bind(this); */
        this.state = {
            groups:[],
/*             checkbox: '', */
        };
    }  
    
/*     handleCheckboxChange = (ev) => {
        ev.preventDefault();
        this.setState({checkbox: ev.target.value,})
    } */
    
    componentDidMount() {
        /* let groups = this.state.groups; */
        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups', {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            })

        .then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({groups: data.groups})})
        .catch(err => {
            console.log(err);
        })
        
    }
    handleGroupUpdate = () => {
        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups', {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            })

        .then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({groups: data.groups})})
        .catch(err => {
            console.log(err);
        })
    }
    render (){
        return(
            <div>
                <GroupHeader handleGroupUpdate={this.handleGroupUpdate}/* groupId={this.state.checkbox} *//>
                <GroupsList /* handleCheckboxChange={this.handleCheckboxChange} */ groups={this.state.groups}/>
            </div>
        );
    }
}

export default Groups;