const Joi = require('joi');
module.exports.houseSchemaValidation=Joi.object({
    house: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        price: Joi.number().required().min(0),
        availability: Joi.number().required().min(0),
        // images: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});