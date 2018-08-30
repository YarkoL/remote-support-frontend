import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import Users from './Users';
import Groups from './Groups';
import Group from './Group';
import Dashboard from './Dashboard';

class EditProfileBody extends React.Component {
    render(){
        return(
    <div>
        <form>
            <div className="form-group viesti-editprofile">
                <label> First Name</label>
                <input className="form-control viesti-editprofile-inputs" />
            </div>
            <div className="form-group viesti-editprofile">
                <label>Last name</label>
                <input className="form-control viesti-editprofile-inputs" />
            </div>
            <div className="form-group viesti-editprofile">
                <label>E-mail</label>
                <input className="form-control viesti-editprofile-inputs" />
            </div>
            <div className="form-group viesti-editprofile">
                <label>Company</label>
                <input className="form-control viesti-editprofile-inputs" onChange={this.props.onChange}/>
            </div>
            <div className="form-group viesti-editprofile">
                <label>Phonenumber</label>
                <input className="form-control viesti-editprofile-inputs" />
            </div>
            <div className="form-group viesti-editprofile">
                <label>Position</label>
                <input className="form-control viesti-editprofile-inputs" />
            </div>
            <div className="form-group  viesti-editprofile">
                <button type="submit" onClick={this.props.handleSubmit} className="btn viesti-editprofile-submitbtn">Save</button>
            </div>
        </form>
    </div>
        );
    }
}

class EditUserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstname: '',
            lastname:'',
            organization:'',
        }
    }
    onChange=()=>{

    }
    handleSubmit = (ev) =>{
        ev.preventDefault();

        let lastName = this.state.firstName;
        let firstName = this.state.Lastname;
        let organization = this.state.organization;

        fetch('https://viesti-web-dev.azurewebsites.net/softability/users' + userId,{
            method: 'post',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "phone": phone,
                "organisation": organization,
                "position": position,
                "prioritylevel": priorityLevel,
                "icon": icon,
                })
        }).then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) =>{ 
            console.log(data);
        })
        .catch(err => {
        this.setState({error: err});     
        })
    }
        
    render(){
        return(
            <div>
                <EditProfileBody handleSubmit={this.handleSubmit} onChange={this.onChange}/>
            </div>
        );
    }
}
export default EditUserProfile;
