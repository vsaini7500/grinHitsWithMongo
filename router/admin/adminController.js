const adminModel=require('../../model/admin')
const bcrypt=require('bcrypt')
const err=require('../../error/index')
const response=require('../../response/index')
const jwt=require('jsonwebtoken')


// function for Admin signup


const signup=async (req,res)=>{
    try {
        const phoneNo=req.body.phoneNo
        const check=await adminModel.findOne({"phoneNo":phoneNo})
        if(check!=null){
            return res.status(200).json(err.error('ALLREADY_EXIST','All ready register'))
        }
        const salt= await bcrypt.genSalt(10)
        let password=req.body.password
        let encryptedPassword = await bcrypt.hashSync(password, salt);
   
        req.body.password=encryptedPassword
        const data=req.body
        const getdata=await adminModel.insertMany(data)
        if(getdata){
            res.status(200).json(response.successResponse(getdata,'successfully signup'))
        }
        else{
            res.status(403).json(err.error('FORBIDDEN','Not signUp'))
        }       
    } catch (error) {

        res.status(200).json(err.error("BAD_REQUEST",error.message))

    }
}

// function for Admin login

const login=  async (req, res) => {
    try {
        let result =await adminModel.findOne({phoneNo:req.body.phoneNo});
    if(result==null){
            return res.status(200).json(err.error('NOT_FOUND','Invalid user'))
    } 
     var match =await bcrypt.compare(req.body.password,result.password)
     if(match){
         var privateKey = process.env.privateKey;
         let params = {
         id:result._id,role:'admin'
         }
         var token =  jwt.sign(params,privateKey,{expiresIn:'1d'});
         res.status(200).json(response.successResponse({"token":token},'Successfully authorized'));
     }else{
        res.status(403).json(err.error('Unauthorized','Invalid password'))
     }
           
        
    } catch (error) {

        res.status(200).json(err.error("BAD_REQUEST",error.message))  
    }
    };



    module.exports={signup,login}