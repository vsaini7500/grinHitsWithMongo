const joi=require('joi')
const pattern=require('../../utils/regex')
const create=joi.object().keys({
    categoryId:joi.string().required().max(24).min(24),
    food:joi.string().required().min(24).max(24),
    quantity:joi.string().required().regex(pattern.num)
})

const foruserId=joi.object().keys({
    userId:joi.string().min(24).max(24).required()
})

const forupdatequantity=joi.object().keys({
    food:joi.string().required().max(24).min(24),
    quantity:joi.string().required().regex(pattern.num)
})

const forpromo=joi.object().keys({
    cartId:joi.string().min(24).max(24).required(),
    promoId:joi.string().min(24).max(24).required()
})
module.exports={create,foruserId,forupdatequantity,forpromo}