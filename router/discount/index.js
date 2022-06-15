const express=require('express')
const router=express.Router()
router.use(express.json());
const schema=require('./discountSchema')
const {requestValidator } = require('../../middleware/request_validator');

const discountRouter=require('./discountContoller')
const token=require('../../middleware/auth')



router.post('/add',token.userTokenVerify,token.verifyadminToken,requestValidator(schema.create),discountRouter.add)
router.get('/getTop',token.userTokenVerify,token.verifybothToken,discountRouter.getdiscount)


module.exports=router