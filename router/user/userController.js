const userModel=require('../../model/user')
const otp=require('../../model/otpModel')
const jwt=require('jsonwebtoken')
const bcrpt=require('bcrypt')
const err=require('../../error/index')
const response=require('../../response/index')
const otpgenerator=require('otp-generator')
const mongoose=require('mongoose')

// function for user signup 


const signup=async (req,res)=>{
    try {
        const check=await userModel.findOne({phoneNo:req.body.phoneNo})
        if(check){
             return res.status(200).json(err.error("ALLREADY_EXIST","Fail to signUp")
         
            )
        }
        const data=req.body

        const result= await userModel.insertMany(data)
        if(result){
            res.status(200).json(response.successResponse(result,'successfully signup'))
         
        }
        
    } catch (error) {
        res.status(200).json(err.error('BAD_REQUEST',error.message))
        
    }
}

// function for user log in  



const login=async (req,res)=>{
   const phoneNumber=await userModel.findOne({phoneNo:req.body.phoneNo})

   console.log(phoneNumber);

   if(!phoneNumber){
       return res.status(200).json(err.error('INVALID_USER','phone number is wrong'))
   }

const OTP=otpgenerator.generate(6,{
    digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
});
const phoneNo=req.body.phoneNo;
console.log(OTP);


const Otp=new otp({phoneNo:phoneNo,OTP:OTP});
// console.log(Otp.OTP);
const salt=await bcrpt.genSalt(10)

Otp.OTP=await bcrpt.hash(Otp.OTP,salt)

const result=await Otp.save();

return res.status(200).send(response.successResponse({OTP:OTP},"OTP send successfully")) 

} ;


// function for verify OTP


const verifyOtp=async (req,res)=>{

    const otpHolder= await otp.find({phoneNo:req.body.phoneNo})
if(otpHolder.length==0){
    return res.status(200).json({
        "status":true,
        "msg":"you use an expired otp!"
    })

}
const user=await userModel.findOne({phoneNo:req.body.phoneNo})
const rightOtpFind=otpHolder[otpHolder.length-1];

const validUser=await bcrpt.compare(req.body.OTP,rightOtpFind.OTP)
if(rightOtpFind.phoneNo==req.body.phoneNo && validUser){
  

    var privateKey = process.env.privateKey;
    let params = {
    id:user._id,
    role:'user'
    }
    var token =  jwt.sign(params,privateKey,{expiresIn:'1d'});
    const Otpdelete=await otp.deleteMany({
        phoneNo:rightOtpFind.phoneNo
    });
    return res.status(200).send(response.successResponse({token:token},'Successfully authorized')
   
    )
}
else{
    return res.status(200).json(
        err.error('AUTHORIZE_FAILED','Failed to authorize')

    )
}

}

// function for update profile


const updateprofile=async (req,res)=>{
    try {
        const id=req.query.userId
        console.log(id);

    const check=await userModel.findById({_id:id})
    if(!check){
        return res.status(200).json(err.error('NOT_FOUND','id is not exist'))
    }
     const data=req.body
    const result=await userModel.updateOne({_id:id},data)

    if(result.modifiedCount!=0){

        const updatedprofile=await userModel.findById({_id:id})

        res.status(200).json(response.successResponse(updatedprofile,'profile updated successfully'))
    }
    else{
        res.status(200).json(err.error("NOT_MODIFIED","not modified"))
    }

        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))
    }
    
}

// get profile 


const getProfile=async (req,res)=>{
    const id =req.query.userId
    const result=await userModel.aggregate([
        {
            $match:{_id:new mongoose.Types.ObjectId(id)}
        },{
            $lookup:{
                from:"useraddresses",
                localField:"_id",
                foreignField:"userId",
                as:"Addresses"   
            }
        }
    ])
    if(result){
        res.status(200).json(response.successResponse(result,'fetch successfully'))
    }
    else{
        return res.status(200).json(err.error('NOT_FOUND','id is not exist'))

    }

}

module.exports={signup,login,verifyOtp,updateprofile,getProfile}