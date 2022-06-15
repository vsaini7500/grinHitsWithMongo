const express=require('express')


const router=express.Router()
router.use(express.json());

const schema=require('./cartSchema')
const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')




const cart=require('./cartController')

router.post('/add',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.create),requestValidator(schema.foruserId,'query'),cart.addToCart)

router.put('/updatequantity',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.forupdatequantity),requestValidator(schema.foruserId,'query'),cart.upadatequantity)

router.post('/applyPromoCode',token.userTokenVerify,token.verifyUserToken,requestValidator(schema.forpromo),cart.applypromo)

router.get('/getCart',token.userTokenVerify,token.verifyUserToken,token.verifyValidUser,requestValidator(schema.foruserId,'query'),cart.getcart)
module.exports=router