const express= require('express')
const passport = require('passport')

const router= express.Router()


//@desc Auth with Google
//@route get /auth/google
router.get('/google',passport.authenticate('google', {scope:['profile']}))


//@desc Google auth callback
//@route get /auth/google/callback
router.get(
    '/google/callback', 
    passport.authenticate('google',{failureRedirect:'/'}), (req,res)=>{
        console.log(req.user)
        res.redirect('/dashboard')
    })

//@desc Logout user
//@route get /auth/logout
router.get(
    '/logout', (req,res)=>{
        req.logOut()
        res.status(200).send("you're logged out now")
    })

module.exports= router