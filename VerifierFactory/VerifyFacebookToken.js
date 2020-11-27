const axios = require('axios');
const { param } = require('../routes/ExternalAuthController');
 
const facebookCredentials = process.env.FACEBOOK_APP_CREDENTIALS;
const verifyFacebookToken=async(credentials)=> {
  let userId=null;
  const url=`https://graph.facebook.com/debug_token?input_token=${credentials.accessToken}&access_token=${facebookCredentials}`;
  await axios.get(url).then( (response)=> {
    let validationData= response.data.data;
    
    
    if (validationData) {
      userId=validationData.user_id;
      
    }
    else{
      throw new Error();
    }
  }).catch(error => {
    console.log(error.response)
});
return userId;
}

module.exports=verifyFacebookToken