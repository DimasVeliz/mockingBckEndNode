var nodemailer = require('nodemailer');
var baseUrl="http://localhost:3001/frontend";


const SENDER_EMAIL_ADDRESS=process.env.YOUR_ORGANIZATION_SENDER_EMAIL_ADDRESS
const SENDER_EMAIL_ADDRESS_PASSWORD=process.env.YOUR_ORGANIZATION_SENDER_EMAIL_ADDRESS_PASSWORD
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: SENDER_EMAIL_ADDRESS_PASSWORD
  }
});




const myInternalService= (email,token)=>{

    let mailParams = {
        from: SENDER_EMAIL_ADDRESS,
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
