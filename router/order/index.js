const express=require('express')
const router=express.Router()
router.use(express.json());

const order=require('./orderController')
const schema=require('./orderSchema')

const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')




router.post('/applyPromo',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.forapply),order.dopayment)

router.post('/payNow',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.forpayNow),order.paynow)
router.get('/get',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.forget,'query'),order.getOrder)
router.get('/getList',token.userTokenVerify,token.verifybothToken,requestValidator(schema.forgetlist,'query'),order.getList)

router.put('/updateStatus',token.userTokenVerify,token.verifyadminToken,requestValidator(schema.forupdate),order.updateStatus)
module.exports=router