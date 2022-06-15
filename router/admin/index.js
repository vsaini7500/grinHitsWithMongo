const express=require('express')


const router=express.Router()
router.use(express.json());
const schema=require('./adminSchema')
const {requestValidator } = require('../../middleware/request_validator');


const admin=require('./adminController')

router.post('/signUp',requestValidator(schema.create),admin.signup)

router.post('/login',requestValidator(schema.forlogin),admin.login)

module.exports=router