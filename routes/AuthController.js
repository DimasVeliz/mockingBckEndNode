const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const VerifyToken = require('../middleware/VerifyToken');
const Usuario= require('../models/Usuario')
const EmailSender= require('./EmailSender')

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', async(req, res) =>{
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    await Usuario.create({
      displayName:req.body.displayName,
      name : req.body.name,
      email : req.body.email,
      roleId:req.body.roleId,
      password : hashedPassword,
      registeredFromSocialMedia:false
    },
     (err, user) =>{
      if (err) {return res.status(500).send("There was a problem registering the user.")}
      // create a token
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      const tokenToEmail = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 600 // expires in 10 minutes
      });
      EmailSender(req.body.email,tokenToEmail);
      
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  

  router.post('/login', (req, res)=> {

    Usuario.findOne({ email: req.body.email },  (err, user) =>{
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
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