const GoogleStrategy= require('passport-google-oauth20').Strategy
const mongoose= require('mongoose')
const Usuario= require('../models/Usuario')

module.exports= function(passport){
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    },
    async (accessToken, refreshToken,profile,done)=>{
        const newUser={
            email:profile.emails[0],
            password:null
        }
        try {

            let user= await Usuario.findOne({email:newUser.email})

            if (user) {
                done(null,user)
            }
            else{
                user= await Usuario.create(newUser)
                done(null,user)
            }
            
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>  done(err,user))
    });
}