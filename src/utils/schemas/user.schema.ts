import Joi from 'joi';
import { Role } from '../../types/Role';

const email = Joi.string().required().email();
const password = Joi.string().required().min(6);

export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email,
  password,
  role: Joi.string()
    .valid(...Object.values(Role))
    .required()
});

export const loginSchema = Joi.object({
  email,
  password
});

export const recoverSchema = Joi.object({
  email
});
