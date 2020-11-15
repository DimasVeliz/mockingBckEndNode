const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String

    },
    password: {
        type: String
    },
    isConfirmed: {
        type: Boolean,
        default:false

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)