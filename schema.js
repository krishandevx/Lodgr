const Joi = require("joi");

module.exports.createListingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(9),
    image: Joi.object({
      filename: Joi.string().default("default.jpg"),
      url: Joi.string().uri().required(),
    }).required(),
  }).required(),
});

module.exports.updateListingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(9),
    image: Joi.object({
      filename: Joi.string().default("default.jpg"),
      url: Joi.string().uri(),
    }).optional(),
    // Optional for edit
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});
