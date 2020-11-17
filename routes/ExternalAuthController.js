const express= require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const EmailSender= require('./EmailSender')

const router= express.Router()


//@desc Auth with Google
//@route get /auth/google
router.get('/google',passport.authenticate('google', {scope:['profile']}))


//@desc Google auth callback
//@route get /auth/google/callback
router.get(
    '/google/callback', 
    passport.authenticate('google',{failureRedirect:'/'}), (req,res)=>{
     
     let user=req.user
      // create a token
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      
      res.status(200).send({ auth: true, token: token });
    })

//@desc Logout user
//@route get /auth/logout
router.get(
    '/logout', (req,res)=>{
        req.logOut()
        res.status(200).send("you're logged out now")
    })

module.exports= router