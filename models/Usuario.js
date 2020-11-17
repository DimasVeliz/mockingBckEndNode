const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    
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
    registeredFromSocialMedia: {
        type: Boolean

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roleId:{
        type:Number
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)