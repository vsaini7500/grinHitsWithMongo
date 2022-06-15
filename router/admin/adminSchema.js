const joi=require('joi')

const create=joi.object().keys({
    firstName:joi.string().required().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    lastName:joi.string().required().regex(/^(?=.{1,10}$)[a-z]+(?:[a-z]+)*$/i),
    phoneNo:joi.string().required().length(10).regex(/^[6-9][0-9]+$/),
    password:joi.string().required().regex(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/)
})
const forlogin=joi.object().keys({
    phoneNo:joi.string().required().length(10).regex(/^[6-9][0-9]+$/),
    password:joi.string().required()
})
module.exports={create,forlogin}