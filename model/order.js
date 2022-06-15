const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    orderId:{
        type:String
    },
    Item:[
        
    ],
    orderOn:{
        type:Date,
        default:Date.now
    },
    Total:{
        type:Number
    },
    Status:{
        type:String
    }
})

const order=mongoose.model("order",orderSchema)
module.exports=order