var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('../middleware/VerifyToken');
const User= require('../models/User')

router.get('/verify-account', VerifyToken, (req, res) =>{

    console.log(req.query);

    User.findById(req.userId, { password: 0 },  (err, user)=> {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      

      res.status(200).send(user);
    });
    
  });

  module.exports = router;
