const joi=require('joi')

const create=joi.object().keys({
    Title:joi.string().required().regex(/^[A-Za-z ]{2,30}$/),
    discountPercentage:joi.number().required().min(0),
    promocode:joi.string().required(),
    maxUse:joi.number().min(1)
})

module.exports={create}