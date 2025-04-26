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

const paginationSchema = Joi.object({
  limit: limit.optional(),
  offset: offset.optional()
});

export { limit, offset, paginationSchema };
