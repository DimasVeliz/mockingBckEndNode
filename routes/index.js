const express= require('express')
const {ensureAuth,ensureGuest} =require('../middleware/auth')
const router= express.Router()

//@desc Login/Landing page
//@route get /
router.get(
    '/',ensureGuest, (req,resp)=>{
        resp.render('login',
        {
            layout:'login'
        })
})

//@desc Dashboard
//@route get /
router.get(
    '/dashboard', ensureAuth,(req,resp)=>{
        
        resp.render('dashboard',{
            name:req.user.firstName,
            foto:req.user.image
        })
})


//@desc UnrelatedAPIEndpoint that sends json
//@route get /
router.get(
    '/datosinternos',ensureAuth, (req,resp)=>{
        resp.send(
            {
                "nombre":'scoutea',
                "teams":
                [
                    "media",
                    {
                        "devs":["backEnd","DataScience","FrontEnd"]
                    },
                    "managment"
                ]
    })
})

//@desc OpenEndpoint that sends json
//@route get /
router.get(
    '/quienessomos',ensureGuest, (req,resp)=>{
        resp.send(
            {
                "somos":'scoutea',
                "hacemos":"iA con datos"
    })
})

module.exports= router