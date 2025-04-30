import Joi from 'joi';

const limit = Joi.string()
  .pattern(/^[1-9][0-9]*$/)
  .max(3)
  .messages({
    'string.base': 'Limit should be a string',
    'string.pattern.base': 'Limit should be a positive integer',
    'string.max': 'Limit should be at most 100'
  });

const offset = Joi.string()
  .pattern(/^[0-9]+$/)
  .messages({
    'string.base': 'Offset should be a string',
    'string.pattern.base': 'Offset should be a non-negative integer'
  });

const name = Joi.string().min(1).max(100).messages({
  'string.base': 'Name should be a string',
  'string.empty': 'Name cannot be empty',
  'string.min': 'Name should have at least {#limit} character',
  'string.max': 'Name should have at most {#limit} characters'
});

const ingredients = Joi.string()
  .pattern(/^[a-zA-Z0-9\s,-]+$/)
  .min(1)
  .max(500)
  .messages({
    'string.base': 'Ingredients should be a string',
    'string.empty': 'Ingredients cannot be empty',
    'string.pattern.base':
      'Ingredients should only contain letters, numbers, spaces, hyphens, and commas',
    'string.min': 'At least one ingredient is required',
    'string.max': 'Ingredients list is too long'
  });

const tags = Joi.string()
  .pattern(/^[a-zA-Z0-9\s,-]+$/)
  .min(1)
  .max(200)
  .messages({
    'string.base': 'Tags should be a string',
    'string.empty': 'Tags cannot be empty',
    'string.pattern.base':
      'Tags should only contain letters, numbers, spaces, hyphens, and commas',
    'string.min': 'At least one tag is required',
    'string.max': 'Tags list is too long'
  });

const paginationSchema = Joi.object({
  limit: limit.optional(),
  offset: offset.optional(),
  name: name.optional(),
  ingredients: ingredients.optional(),
  tags: tags.optional()
});

export { limit, offset, name, ingredients, tags, paginationSchema };
