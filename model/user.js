const mongoose=require('mongoose')


const userScheema=mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,

    },
    countryCode:{
        type:String,
        default:'+91'

    },
    phoneNo:{
        type:String
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})

const user=mongoose.model('user',userScheema)
 module.exports=user