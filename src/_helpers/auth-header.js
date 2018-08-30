export const authHeader = () => {
    // return user if it exists on local storage
   return localStorage.getItem('user') 
   	? { user } 
   	: {};
}