const mongoose=require('mongoose')

const paymentSchema=mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"useraddress"
    },
    promoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"discount"

    },
    totalAmount:{
        type:Number
    },
    lessAmountAfterPromo:{
        type:Number,
        default:0
    },
    payAmount:{
        type:Number
    }
})

const payment=mongoose.model('payment',paymentSchema)
module.exports=payment