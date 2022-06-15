const mongoose=require('mongoose')

const foodSchema=mongoose.Schema({
    categoryId:{
       type: mongoose.Schema.Types.ObjectId,
    ref:"categories"},
    Food:[{
        Title:{
            type:String,
            trim:true
            
        },
            Cost:{
                type:String
            },
            Quantity:{
                type:String
            },
            Description:{
                type:String,
                trim:true
            }
        }
    ]
})

const food=mongoose.model('food',foodSchema)
module.exports=food