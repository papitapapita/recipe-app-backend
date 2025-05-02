import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});
