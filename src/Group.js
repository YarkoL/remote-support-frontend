import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import ApiUtils from './ApiUtils';
import Groups from './Groups';
import { URLSearchParams } from 'url';

class Group extends React.Component{ 
    constructor(props){
        super(props);
        
        this.state = {
            groupInfo: [],
            users: [],
            allUsers: [],
            groupId: props.match.params.id,
            groupName: props.match.params.name,
            groups: [],
            addUsers: {
                groupId:props.match.params.id,
                users: [] },
            removeUsers: {
                groupId:props.match.params.id,
                    users: []  
            },
        };
    }    
    
     handleAddUser = (ev) => {
        ev.preventDefault();

        let addUsers = this.state.addUsers;
        let groupId = this.state.groupId;


        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups/add/users',{
            method: 'post',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "groupid": addUsers.groupId,
                "users": addUsers.users
            })
        }).then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.handleCurrentUsers(this.state.groupName)
        })
        .catch(err => {
        console.log(err);
        })
     
    } 
     handleRemoveUser = (ev) => {
        ev.preventDefault();

        let removeUsers = this.state.removeUsers;
        let groupId = this.state.groupId;


        fetch('https://viesti-web-dev.azurewebsites.net/softability/groups/delete/users',{
            method: 'post',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "groupid": removeUsers.groupId,
                "users": removeUsers.users
            })
        }).then(ApiUtils.checkStatus)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.handleCurrentUsers(this.state.groupName)})
        
        .catch(err => {
        console.log(err);
        })
    } 

    componentDidMount() {
        let name = this.state.groupName;
        console.log(name);
        fetch('https://viesti-web-dev.azurewebsites.net/softability/users/?group=' + name, {
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
            this.setState({allUsers:data.pool});
            this.setState({groupInfo: data.current});
            console.log(data.current);
            console.log(data.pool);
            this.handleAllUsers(data.current)})
        .catch(err => {
            console.log(err);
        })
    }
    handleCurrentUsers(name){
        console.log(name);
        fetch('https://viesti-web-dev.azurewebsites.net/softability/users/?group=' + name, {
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
            this.setState({allUsers:data.pool});
            this.setState({groupInfo: data.current});
            console.log(this.state.groupInfo);
            this.handleAllUsers(data.current)})
        .catch(err => {
            console.log(err);
        })
    }
    handleAllUsers(currentUsers){
/*             fetch('http://viesti-web-dev.azurewebsites.net/softability/users', {
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
                console.log(data); */
                this.setState({users: this.filterUsers(this.state.allUsers, currentUsers)});
                console.log(this.state.users);
/*             .catch(err => {
                console.log(err);
            }) */
    }
    
    filterUsers(usersToBeFiltered,usersToFilterWith){
        console.log(usersToBeFiltered);
        console.log(usersToFilterWith);
            let filteredOutput = [];
            let filterUsers = usersToFilterWith;
            let isInList= false;
            usersToBeFiltered.forEach(function(item){
                filterUsers.forEach(function(user){
                  if (item._id === user._id) {
                    isInList = true;
                    return;
                  } 
                });
                /* console.log(isInList); */
                if(isInList === false){
                    filteredOutput = filteredOutput.concat(item);
                     console.log(item);
                }
                 else{
                    isInList = false;
                } 
            });
            console.log(filteredOutput);
            return filteredOutput;
        }
    toggleCheckbox2 = (ev) =>{
        /* ev.preventDefault(); */
        let addUsers = this.state.addUsers;
        
        if(ev.target.checked){
           addUsers.users.push({'userid':ev.target.name});
           this.setState({addUsers: addUsers});
           console.log(this.state.addUsers);
           return;

        }
        else if(!ev.target.checked){
           addUsers.users.splice(addUsers.users.indexOf({'userid':ev.target.name}), 1);
           this.setState({addUsers: users});
           console.log(this.state.addUsers);
           return;
        }
        console.log(ev.target.checked);
        console.log(this.state.addUsers);
       
   } 
     toggleCheckbox = (ev) =>{
         /* ev.preventDefault();  */
         let removeUsers = this.state.removeUsers;
         if(ev.target.checked){
            removeUsers.users.push({'userid':ev.target.name});
            this.setState({removeUsers: removeUsers});
            console.log(this.state.removeUsers);
            return;

         }
         else if(!ev.target.checked){
            removeUsers.users.splice(removeUsers.users.indexOf({'userid':ev.target.name}), 1);
            this.setState({removeUsers: removeUsers});
            console.log(this.state.removeUsers);
            return;
         }
         console.log(ev.target.defaultChecked);
        
    } 

    render(){
        return(
            <div>
                <div className="well viesti-table-container">
                    <h4>Current Users</h4><button onClick={this.handleRemoveUser} type="submit" className="viesti-table-btn"><span className="glyphicon glyphicon-trash"></span></button>
                    <table className="table-style">
                        <thead>
                            <tr>
                                <th className="viesti-groups-th"></th>
                                <th className="viesti-groups-th">Name</th>
                                <th className="viesti-groups-th">Company</th>
                                <th className="viesti-groups-th">Position</th>
                                <th className="viesti-groups-th">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                          {this.state.groupInfo.map(user => 
                            
                                <tr key={user.firstname}>
                                    <th><input name={user._id} type="checkbox" defaultChecked={false} onChange={this.toggleCheckbox} /></th>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.organization}</td>
                                    <td>{user.position}</td>
                                    <td>{user.email}</td>
                                </tr>
                          )}
                        </tbody>
                    </table>
                </div>

                <div className="well viesti-table-container">
                    <h4>Add Users</h4>
                    <form method="post">
                        <button onClick={this.handleAddUser} type="submit" className="viesti-table-btn"><span className="glyphicon glyphicon-plus"></span></button>
                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th className="viesti-groups-th"></th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>E-mail</th>
                                </tr>
                            </thead>
                            <tbody>
 
                            {this.state.users.map(user =>  
                                
                                    <tr key={user._id}>
                                        <th className="viesti-groups-th" ><input name={user._id} defaultChecked={false} onChange={this.toggleCheckbox2} type="checkbox" /></th>
                                        <td className="viesti-groups-td-desc">{user.firstname} {user.lastname}</td>
                                        <td className="viesti-groups-td-desc">{user.organization}</td>
                                        <td className="viesti-groups-td-desc">{user.position}</td>
                                        <td className="viesti-groups-td-desc">{user.email}</td>
                                        <th className="viesti-groups-th"></th>
                                    </tr>
                            )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

/* class Groupusers extends React.Component{
    consturctor(props){
        super(props);
        this.state= {
            users:[],
        }
    }
} */
export default Group;