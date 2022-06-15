const express=require('express')
const router=express.Router()
router.use(express.json());
const schema=require('./categorySchema')

const {requestValidator } = require('../../middleware/request_validator');
const token=require('../../middleware/auth')

const ceategoryRouter=require('./categoryContoller')

router.post('/add',token.userTokenVerify,token.verifyadminToken,requestValidator(schema.create),ceategoryRouter.add)
router.get('/getAll',token.userTokenVerify,token.verifybothToken,ceategoryRouter.getAll)


module.exports=router