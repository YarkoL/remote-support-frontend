//https://medium.com/@yoniweisbrod/interacting-with-apis-using-react-native-fetch-9733f28566bb

var ApiUtils = {  
  checkStatus: function(response) {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};

export { ApiUtils as default };