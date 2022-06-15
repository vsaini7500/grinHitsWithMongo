const joi=require('joi')

const forapply=joi.object().keys({
    cartId:joi.string().max(24).min(24).required(),
    addressId:joi.string().max(24).min(24).required(),
    promoId:joi.string().max(24).min(24).required(),
})

const forpayNow=joi.object().keys({
    paymentId:joi.string().max(24).min(24).required(),
    payAmount:joi.number().required()
})

const forgetlist=joi.object().keys({
    userId:joi.string().max(24).min(24).required()
})

const forget=joi.object().keys({
    orderId:joi.string().max(16).min(16).required()
})

const forupdate=joi.object().keys({
    orderId:joi.string().max(24).min(24).required(),
    Status:joi.string().valid(['Accepted','Preparing','Ready to pickup','Received','accepted','preparing','ready to pickup','received']).required()
})

module.exports={forapply,forpayNow,forgetlist,forget,forupdate}