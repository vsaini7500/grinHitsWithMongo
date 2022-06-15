const mongoose=require('mongoose')

const addressSchema=mongoose.Schema({
   
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    userName:{
        type:String
    },
    countryCode:{
     type:String,
     default: '+91'
    },
    phoneNo:{
        type:String
    },
    street1:{
        type:String
    },
    street2:{
        type:String
    },
    state:{
        type:String
    },
    zipCode:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
    
        // { timestamps: true }
    

)


const useraddress=mongoose.model('useraddress',addressSchema)
 module.exports=useraddress