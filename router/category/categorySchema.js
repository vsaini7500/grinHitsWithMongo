const joi=require('joi')


const create=joi.object().keys({
    Title:joi.string().required().regex(/^[A-Za-z ]{2,30}$/)
})

module.exports={create}