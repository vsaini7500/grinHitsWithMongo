const express=require('express')
const cModel=require('../../model/category')
const err=require('../../error/index')
const response=require('../../response/index')

const helperService=require('../../service/helper')



const add=async (req,res)=>{
    try {
        const data=req.body
        // console.log('data is requi',data);
         const result=await helperService.insertQuery(cModel,data)
          
         if(result.error){
            res.status(200).json(err.error("INTERNAL_SERVER_ERROR",result.error.message))
         }
         else
         {
             res.status(200).json(response.successResponse(result,'category added successfully'))
         }
        
    } catch (error) {
        
        res.status(200).json(err.error("BAD_REQUEST",error.message))

    }
}


const getAll=async (req,res)=>{

    try {
        let limit = 0 ; let skip = 0
        if(req.query.limit!=null || req.query.limit!=0){
            limit= req.query.limit
        }
        if(req.query.skip!=0 || req.query.skip != 0){
            skip = req.query.skip
        }
         const result= await helperService.findall(cModel)
    
         if(result==0){
             res.status(200).json(err.error('NOT_FOUND','data is not available'))
         }
         else{
            res.status(200).json(response.successResponse(result,'successfully fetch'))

         }
        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }
   


}

module.exports={add,getAll}