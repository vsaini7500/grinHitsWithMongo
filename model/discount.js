const mongoose=require('mongoose')

const discountSchema=mongoose.Schema({
    Title:{
        type:String,
        trim:true
    },
    discountPercentage:{
        type:Number,
        min:0
    },
    promocode:{
        type:String,
        trim:true
    },
    maxUse:{
        type:Number
    },
    useTime:{
        type:Number,
        default:0
    }
})

const discout=mongoose.model('discount',discountSchema)
module.exports=discout