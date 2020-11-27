const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const VerifyToken = require('../middleware/VerifyToken');
const User = require('../models/User')
const EmailSender = require('./EmailSender')
const checkExistence = require('../middleware/CheckExistence')

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register',checkExistence, async (req, res) => {

  
  const userData = req.body.userData

  const hashedPassword = bcrypt.hashSync(userData.password, 8);

  await User.create({
    displayName: userData.displayName,
    email: userData.email,
    roleId: userData.roleId,
    password: hashedPassword,
    oauthInfo: null
  },
    (err, user) => {
      if (err) { return res.status(500).send({ dbError: "There was a problem registering the user." }) }
      // create a token

      let token = jwt.sign({ id: user.email }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      const tokenToEmail = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 600 // expires in 10 minutes
      });
      EmailSender(userData.email, tokenToEmail);

      res.status(200).send({ auth: true, token: token });
    });
});



router.post('/login', (req, res) => {
  const userData = req.body.userData;

  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(userData.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});


//not really needed :) is possible to do that in the client.
router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;