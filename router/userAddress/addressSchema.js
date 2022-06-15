const joi=require('joi')
const pattern=require('../../utils/regex')
const create=joi.object().keys({
    userName:joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
    phoneNo:joi.string().required().regex(pattern.mobileNo),
    street1:joi.string().required(),
    street2:joi.string(),
    city:joi.string().required().regex(pattern.capital),
    state:joi.string().required().regex(pattern.state),
    zipCode:joi.string().required().min(6).max(6).regex(pattern.num)

})


const forUpdate=joi.object().keys({
    userName:joi.string().regex(/^[A-Za-z ]{2,30}$/),
    phoneNo:joi.string().regex(pattern.mobileNo),
    street1:joi.string(),
    street2:joi.string(),
    city:joi.string().regex(pattern.capital),
    state:joi.string().regex(pattern.state),
    zipCode:joi.string().min(6).max(6).regex(pattern.num)

})
const foruserid=joi.object().keys({
    addressId:joi.string().min(24).max(24).required()
})
module.exports={create,forUpdate,foruserid}