
import { apiFetch } from '../_helpers';

export const sessionService = {
    getSessions
};

function getSessions() {

    return apiFetch.getSessions()
        .then(sessions => {
        	console.log('service ', sessions.sessions)
            return sessions;  
         })   
        .catch(err => {
            throw err;
         })   
}