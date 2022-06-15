const mongoose=require('mongoose')

const categoryModel=mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true
    }
})

const category=mongoose.model('category',categoryModel)
 
module.exports=category