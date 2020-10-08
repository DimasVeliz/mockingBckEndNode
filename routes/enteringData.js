const express= require('express')
const bodyParser = require('body-parser');
const {ensureAuth,ensureGuest} =require('../middleware/auth')
const router= express.Router()
const DatoA= require('../models/DatoA')





//@desc UnrelatedAPIEndpoint that receives json
//@route post /
router.post(
    '/savedatoA', ensureGuest,async (req,resp)=>{
        const reqBody=req.body
        
        const newDatoA={
            cantidad:reqBody.cantidad,
            monotonia:reqBody.monotonia
        }

        try {
            
            let dataAToCheck=  await DatoA.findOne({cantidad:reqBody.cantidad})
            
            
            if (dataAToCheck) {
                return resp.send({status:304})
            }
            else{
                dataAToCheck=  await DatoA.create(newDatoA)
                return resp.send({status:204})
            }
            
        } catch (error) {
            console.log(error)
        }
})

//@desc UnrelatedAPIEndpoint that receives json
//@route post /
router.post(
    '/savedatoAProtected', ensureAuth, async (req,resp)=>{
        const reqBody=req.body
        
        const newDatoA={
            cantidad:reqBody.cantidad,
            monotonia:reqBody.monotonia
        }

        try {
            
            let dataAToCheck=  await DatoA.findOne({cantidad:reqBody.cantidad})           
            
            if (dataAToCheck) {
                return resp.send({status:304})
            }
            else{
                dataAToCheck=  await DatoA.create(newDatoA)
                return resp.send({status:204})
            }
            
        } catch (error) {
            console.log(error)
        }
})


module.exports= router