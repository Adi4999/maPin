const mongoose = require('mongoose')

const PinSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        min:3,
    },
    desc:{
        type:String,
        required:true,
        min:3,
    },
    rating:{
        type:Number,
        required: true,
        min:0,
        max:5,
    },
    lat:{
        type:Number,
        required:true,
    },
    long:{
        type:Number,
        required:true,
    },
    time:{
        type: Date, 
        default: Date.now
    }
}, {timeStamps: true})

module.exports = mongoose.model('Pin', PinSchema)
