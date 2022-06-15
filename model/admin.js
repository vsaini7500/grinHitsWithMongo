const mongoose=require('mongoose')
const adminSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    phoneNo:String,
    password:String
})

const admin=mongoose.model("admin",adminSchema)
module.exports=admin