const Joi = require('joi'); 

const registerSchema = Joi.object({
   name:Joi.object({
       first:Joi.string().required().min(2),
       middle:Joi.string(),
       last:Joi.string().required().min(2)
   }),
   isBusiness:Joi.boolean(),
   phone:Joi.string().required().min(10).max(10),
    email:Joi.string().required().email(),
    address:Joi.object({
        state:Joi.string().required(),
        country:Joi.string().required(),
        city:Joi.string().required(),
        street:Joi.string().required(),
        houseNumber:Joi.string().required(),
        zipCode:Joi.number()
    }),
    image:Joi.object({
        url:Joi.string().required(),
        alt:Joi.string().min(5)
    }),
    password:Joi.string().required().min(8)
});

const loginSchma = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8),
})

const updateUserScma = Joi.object({
   name:Joi.object({
       first:Joi.string().min(2),
       middle:Joi.string(),
       last:Joi.string().min(2)
   }),
   phone:Joi.string().min(10).max(10),
    email:Joi.string().email(),
    address:Joi.object({
        state:Joi.string(),
        country:Joi.string(),
        city:Joi.string(),
        street:Joi.string(),
        houseNumber:Joi.string(),
        zipCode:Joi.number()
    }),
    image:Joi.object({
        url:Joi.string(),
        alt:Joi.string().min(5)
    }),
});

const updateUserBusinessScma = Joi.object({
   isBusiness:Joi.boolean(),
});



module.exports = {registerSchema, loginSchma, updateUserScma , updateUserBusinessScma};