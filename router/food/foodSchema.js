const joi=require('joi')
const pattern=require('../../utils/regex')


const create=joi.object().keys({
   
    Title:joi.string().required().regex(pattern.name),
    Cost:joi.number().required().min(0),
    Quantity:joi.string().required().regex(pattern.num),
    Description:joi.string().required().min(25),

})

const forcategoryId=joi.object().keys({
    categoryId:joi.string().min(24).max(24).required()
})


module.exports={create,forcategoryId}