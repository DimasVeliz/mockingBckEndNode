const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    
    displayName:{
        type: String
    },
    email: {
        type: String

    },
    password: {
        type: String
    },
    isConfirmed: {
        type: Boolean

    },
    oauthInfo: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roleId:{
        type:Number
    }
})

module.exports = mongoose.model('User', UserSchema)