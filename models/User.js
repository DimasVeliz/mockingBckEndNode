const mongoose= require('mongoose')

const UserSchema= new mongoose.Schema({
    googleId:{
        type:String
        
    },
    displayName:{
        type:String
        
    },
    firstName:{
        type:String,
       
    },
    lastName:{
        type:String
        
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String
        
    },
    email:{
        type:String
        
    },
    password:{type:String
        

    }
})

module.exports = mongoose.model('User',UserSchema)