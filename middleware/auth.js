var bodyParser = require("body-parser")
// var urlencoderParser = bodyParser.urlencoded({extended:false})
const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtDecode=require('jwt-decode')
const error=require('../error/index')

var userTokenVerify = async (req,res,next)=>{
var token = req.headers.authorization;
if(!token){
   return res.status(200).json(error.error('UNAUTHORIZED',"jwt must be provided"))

}
var privateKey = process.env.privateKey;
jwt.verify(token,privateKey,function(err,docs){
    if(err){
            res.status(403).json(error.error('SESSION_EXPIRED','token expired'))
   
    }else{
        next();
    }
})
}

// for user verify

const verifyUserToken= async (req,res,next)=>{
    const token=req.headers.authorization

    const tokenData=jwtDecode(token)
    if(tokenData.role!="user"){
        res.status(200).json(error.error("UNAUTHORIZED",'invalid signature'))
    }
    else{
        next();
    }

}

//verify admin

const verifyadminToken= async (req,res,next)=>{
    const token=req.headers.authorization

    const tokenData=jwtDecode(token)
    if(tokenData.role!="admin"){
        res.status(200).json(error.error("UNAUTHORIZED",'invalid signature'))
    }
    else{
        next();
    }

}

// for both 

const verifybothToken= async (req,res,next)=>{
    const token=req.headers.authorization

    const tokenData=jwtDecode(token)
    if(tokenData.role=="user" && tokenData.role=="admin"){
        res.status(200).json(error.error("UNAUTHORIZED",'invalid signature'))
    }
    else{
        next();
    }

}

const verifyValidUser=async (req,res,next)=>{
    const token=req.headers.authorization
    const tokenData=jwtDecode(token)
    const userId=req.query.userId||req.body.userId
    if(tokenData.id!=userId){
        res.status(200).json(error.error("UNAUTHORIZED",'invalid User '))

    }
    else{
        next();
    }



}


module.exports={userTokenVerify,verifyUserToken,verifyadminToken,verifybothToken,verifyValidUser}