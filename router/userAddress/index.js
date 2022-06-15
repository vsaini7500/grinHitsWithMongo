const express=require('express')
const router=express.Router();
router.use(express.json());
const addressInfo=require('./addressController')
const schema=require('./addressSchema')
const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')


router.post('/add',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.create),addressInfo.add)
router.put('/update',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.forUpdate),requestValidator(schema.foruserid,"query"),addressInfo.updateAddress)
router.get('/get',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.foruserid,"query"),addressInfo.getAddress)

module.exports=router