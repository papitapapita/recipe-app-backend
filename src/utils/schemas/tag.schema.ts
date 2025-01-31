import Joi from 'joi';

const tagName = Joi.string().messages({
  'string.base': 'Tag name should be a type of text'
});

const tagSchema = Joi.object({
  tagName: tagName.required()
});

const softTagSchema = Joi.object({
  tagName: tagName
});

export { tagSchema, softTagSchema };
