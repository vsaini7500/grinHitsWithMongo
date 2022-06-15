const express=require('express')
const router=express.Router()
router.use(express.json());
const schema=require('./foodSchema')
// const schema=require('./categorySchema')
const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')



const foodRouter=require('./foodContoller')

router.post('/add',token.userTokenVerify,token.verifyadminToken,requestValidator(schema.create),requestValidator(schema.forcategoryId,"query"),foodRouter.addFood)
router.get('/getallfood',token.userTokenVerify,token.verifybothToken,foodRouter.getallfood)
// router.get('/getallfood',foodRouter.getallfood)


module.exports=router