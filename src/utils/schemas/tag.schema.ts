import Joi from 'joi';

const name = Joi.string().messages({
  'string.base': 'Tag name should be a type of text'
});

const tagSchema = Joi.object({
  name: name.required()
});

const softTagSchema = Joi.object({
  name: name
});

export { tagSchema, softTagSchema };
