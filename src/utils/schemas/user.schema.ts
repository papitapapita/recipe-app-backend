import Joi from 'joi';
import { Role } from '../../types/Role';

const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string().min(2).max(50);
const role = Joi.string().valid(...Object.values(Role));

export const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

export const updateUserSchema = Joi.object({
  name: name.optional(),
  email: email.optional(),
  password: password.optional(),
  role: role.optional()
});

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

export const recoverSchema = Joi.object({
  email: email.required()
});

export const changePasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: password.required()
});
