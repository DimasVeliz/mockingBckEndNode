const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);
const verifyGoogleToken=async(credentials)=> {
  
  

  const ticket = await client.verifyIdToken({
      idToken: credentials.idToken,
      audience: process.env.CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  if (userid) {
    return userid;
  }
  else{
    throw new Error();
  }
}

module.exports=verifyGoogleToken
