const Joi = require('@hapi/joi');

exports.MAIL_MODEL = Joi.object({
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    content: Joi.string().required()
})
