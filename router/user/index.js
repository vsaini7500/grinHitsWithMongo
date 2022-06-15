const express=require('express')
const router=express.Router();
router.use(express.json());
const userInfo=require('./userController')
const schema=require('./userSceema')
const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')


router.post('/signup',requestValidator(schema.create),userInfo.signup)
router.post('/login',requestValidator(schema.checkNumber),userInfo.login)
router.post('/verify',requestValidator(schema.forverify),userInfo.verifyOtp)
router.put('/update',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.forUpdate),requestValidator(schema.foruserid,"query"),userInfo.updateprofile)
router.get('/getProfile',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.foruserid,"query"),userInfo.getProfile)



module.exports=router