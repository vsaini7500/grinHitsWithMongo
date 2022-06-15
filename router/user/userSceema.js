const joi=require('joi')
const pattern=require('../../utils/regex')

const create=joi.object().keys({
    firstName:joi.string().required().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    lastName:joi.string().required().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    phoneNo:joi.string().required().length(10).regex(/^[6-9][0-9]+$/)
})
const checkNumber=joi.object().keys({
    phoneNo:joi.string().required().length(10).regex(/^[6-9][0-9]+$/)
})

const forUpdate=joi.object().keys({
    firstName:joi.string().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    lastName:joi.string().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    phoneNo:joi.string().length(10).regex(/^[6-9][0-9]+$/)
})
const foruserid=joi.object().keys({
    userId:joi.string().min(24).max(24).required()
})

const forverify=joi.object().keys({
    phoneNo:joi.string().length(10).regex(/^[6-9][0-9]+$/).required(),
    OTP:joi.string().required().length(6).regex(pattern.num)
})


module.exports={create,checkNumber,forUpdate,foruserid,forverify}