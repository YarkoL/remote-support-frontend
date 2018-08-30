import 'babel-polyfill';

import { BASE_URL } from '../_constants/global.js';

export const apiFetch = {
    login,
    logout,
    getSessions
}

/*public functions that do api calls*/

function login (email, password) {
  const options = {  
    call : 'login',
    method: 'post',
    body: {
      'email': email,
      'password': password
    }
  };
  return makeRequest(options);
}

function logout () {
  const options = {  
    call : 'logout',
    method: 'post'
  };
  return makeRequest(options);
}

function getSessions () {    
  const options = {  
    call :'sessions',
    method: 'get'
  };
  return makeRequest(options);
}

/*internal */
  
const reqHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

function makeRequest (reqOptions){
  const url = `${BASE_URL}/${reqOptions.call}`;
  let options = {
      method:  reqOptions.method,
      headers: reqHeaders,
      credentials: 'include',
  }

  if (options.method !== 'get') {
    const reqBody = JSON.stringify(reqOptions.hasOwnProperty('body') ? 
      reqOptions.body : 
      {}
    );
    options.body = reqBody; 
  }
  
  console.log(options);
  const request = new Request(
    url,
    options
  );

  return fetchFromApi(request, reqOptions.call);
} 

const fetchFromApi = async function (request, apiCall = 'Unspecified api call') {   
    let response = await fetch(request);
    if (response.status == 200) {
      
      const json = await response.json(); 
      console.log(`Fetch : :${apiCall} returned ${json}`);
      return json;    
    } else {
      throw new HttpError(response, apiCall);
    }  
}

class HttpError extends Error {
  constructor(response, apiCall) {
    super(`${apiCall} gave error ${response.status}`);
    name = 'HttpError';
    response = response;
  }
}


/*
  const updateSessionStatus = (id, status) => {
    const call = 'sessions/update/status';
    const req = {  
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
      body: JSON.stringify({
        'sessionId': id,
        'status': status
      })
    };  
    return makeRequest(req,call);
  }
*/
