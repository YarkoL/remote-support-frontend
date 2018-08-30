import { authHeader, apiFetch } from '../_helpers';

export const userService = {
    login,
    logout,
    resetpassword,
};

function login(email, password) {

    return apiFetch.login(email,password)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.user));
            return user;  
         })   
        .catch(err => {
            throw err;
         })   
    
}

function logout() {

    return apiFetch.logout()
        .then(() => {
            localStorage.removeItem('user'); 
         })   
        .catch(err => {
            throw err;
         })  
}

function resetpassword(email){
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        credentials: 'include',
        body: JSON.stringify({ 
            'email': email})
    };

    return fetch('https://viesti-web-dev.azurewebsites.net/softability/pswdreset', requestOptions)
    .then(response => {
        if (!response.ok) { 
            return Promise.reject(response.statusText);
        }
        return response.json();
        let data = response.json();
    })
    .then( data =>{
        if(data){
            data = JSON.stringify(data);
        }
        return data;
    });
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}