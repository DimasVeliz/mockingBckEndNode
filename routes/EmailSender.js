var nodemailer = require('nodemailer');
var baseUrl="http://localhost:3001/frontend";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dveliz900@gmail.com',
    pass: 'cvobcycljfunawav'
  }
});




var myInternalService= (email,token)=>{

    var mailParams = {
        from: 'dveliz900@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: `${baseUrl}/verify-account?email=${email}&code=${token}`
  
      };

    transporter.sendMail(mailParams, (error, info)=>{
        if (error) {
          res.status(500).send({message:error});
        } else {
          
          res.status(200).send({ message: 'Email sent: ' + info.response});
        }
      });
}

module.exports = myInternalService;
