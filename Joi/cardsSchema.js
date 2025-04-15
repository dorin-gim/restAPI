const Joi = require('joi');

const cardSchema = Joi.object({
    title: Joi.string().required().min(5),
    subtitle: Joi.string().required().min(5),
    description: Joi.string().required().min(5),
    phone: Joi.string().required().min(10).max(10),
    email: Joi.string().required().email(),
    web: Joi.string().required().min(5),
    image: Joi.object({
        url: Joi.string().required(),
        alt: Joi.string().required().min(5)
    }),
    address: Joi.object({
        state: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.string().required(),
        zipCode: Joi.number().required()
    }),
    bizNumber: Joi.number(),
    likes: Joi.array(),
})

const cardUpdateSchema = Joi.object({
      title: Joi.string().min(5),
    subtitle: Joi.string().min(5),
    description: Joi.string().min(5),
    phone: Joi.string().min(10).max(10),
    email: Joi.string().email(),
    web: Joi.string().min(5),
    image: Joi.object({
        url: Joi.string(),
        alt: Joi.string().min(5)
    }),
    address: Joi.object({
        state: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
        houseNumber: Joi.string(),
        zipCode: Joi.number()
    })
})


module.exports = {cardSchema , cardUpdateSchema};