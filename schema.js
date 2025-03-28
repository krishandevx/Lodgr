const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(9),
        image: Joi.object({
            filename: Joi.string().default("default.jpg"),
            url: Joi.string().uri().required()
        }).required(),
    }).required()
})