const mongoose= require('mongoose')

const DatoASchema= new mongoose.Schema({
    cantidad:{
        type:Number,
        required:true
    },
    monotonia:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('DatoA',DatoASchema)