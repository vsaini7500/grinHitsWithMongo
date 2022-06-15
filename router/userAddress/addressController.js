const addressModel=require('../../model/userAddress')
const err=require('../../error/index')
const response=require('../../response/index')
const helperService=require('../../service/helper')

// function for add addresss


const add=async (req,res)=>{
try {
    
const data=req.body

const result=await addressModel.insertMany(data)

if(result){
    res.status(200).json(response.successResponse(result,"address added successfully")
    )
}
} catch (error) {
    res.status(200).json(err.error('BAD_REQUEST',error.message))
    
}
 
};

// function for update address


const updateAddress = async(req, res) => {
    id = req.query.addressId
    const data =req.body
 const   getdata = await helperService.updateQuery(addressModel, { _id: id}, data)
//    console.log('data is ',getdata);
    if (getdata.error) {
 

        res.status(200).json(err.error('INTERNAL_SERVER_ERROR','internal server error'))
    }
    if (getdata==0) {
             res.status(200).json(err.error('NOT_MODIFIED','not updated'))


    } else {
      
        res.status(200).json(response.successResponse(getdata,'ADDRESS_UPDATED'))

    }
}
 
// function for get addresss

const getAddress=async (req,res)=>{
    const id=req.query.addressId

    try {
        const result=await helperService.findById(addressModel,{_id:id})
    if(result.error){
        res.status(200).json(err.error('INTERNAL_SERVER_ERROR',result.error.message))

    }
    if(result==null){
        res.status(200).json(err.error('NOT_FOUND','Data not found'))
    }
    else{
       
        res.status(200).json(response.successResponse(result,'fetch successfully'))


    }
        
    } catch (error) {
        res.status(200).json(err.error('INTERNAL_SERVER_ERROR',error.message))

    }
}


module.exports={add,updateAddress,getAddress}