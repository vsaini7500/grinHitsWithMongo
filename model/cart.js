const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    Item:[
        {
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"food.categoryId"
            },
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"food.Food"
            },
            quantity:{
                type:String
            }
        }
    ],
    subTotal:{
        type:Number
    },
    shipping:{
        type:Number,
        default:0
    },
    lessAmountAfterPromocode:{
        type:Number,
        default:0
    },
    payableAmount:{
        type:Number
    }

})

const cart=mongoose.model('cart',cartSchema)
module.exports=cart