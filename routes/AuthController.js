var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var VerifyToken = require('../middleware/VerifyToken');
const User= require('../models/User')



router.post('/register', async(req, res) =>{
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    await User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
     (err, user) =>{
      if (err) {return res.status(500).send("There was a problem registering the user.")}
      // create a token
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  router.get('/me', VerifyToken, (req, res, next) =>{

    User.findById(req.userId, { password: 0 },  (err, user)=> {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      s      
      res.status(200).send(user);
    });
    
  });

  router.post('/login', (req, res)=> {

    User.findOne({ email: req.body.email },  (err, user) =>{
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  });
  

  //not really needed :) is possible to do that in the client.
  router.get('/logout', (req, res) =>{
    res.status(200).send({ auth: false, token: null });
  });

  module.exports = router;