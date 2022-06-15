const discountModel=require('../../model/discount')
const err=require('../../error/index')
const response=require('../../response/index')
// const cModel=require('../../model/category')
const helperService=require('../../service/helper')



const add=async (req,res)=>{
    try {
        const data= req.body

        const result=await helperService.insertQuery(discountModel,data)

        if(result==0){
            res.status(200).json(err.error(" Forbidden",'not inserted'))
        }
        else{
            res.status(200).json(response.successResponse(result,"successfully added"))

        }
        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }
}

const getdiscount=async (req,res)=>{
    try {

        const result=await discountModel.find().sort({discountPercentage:-1})
        if(result[0]!=null){
            res.status(200).json(response.successResponse(result,'Fetch successfully'))
        }
        else{
            res.status(200).json(err.error('NOT_FOUND','Data is not found'))
        }

     
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

    }
}

module.exports={add,getdiscount}