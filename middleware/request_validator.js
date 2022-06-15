const joi = require('joi');
// const HttpStatus = require('http-status');
// const { head } = require('lodash');

const requestValidator = (schema, source = 'body') => async (req, res, next) => {
    const data = req[source];

    try {
        req.item = await joi.validate(data, schema, {
            stripUnknown: { objects: true, arrays: true },
            convert: true,
            abortEarly: false
        });
    }
    catch (err) {
        res.status(200).json({
            "status":true,
            "response":null,
            "code":"200",
            "error":{
                "errorCode":"BAD_REQUEST",
                "errorMessage":err.message
            }
        })

        return next(err);
    }

    return next();
};

module.exports = {
    requestValidator
};