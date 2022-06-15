const mongoose=require('mongoose')

const otpmodel=mongoose.Schema({
    phoneNo:{
        type:String,
        required:true
    },
    OTP:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:{
            expires:3000
        }
    }
})

const otp=mongoose.model('otp',otpmodel)
module.exports=otp