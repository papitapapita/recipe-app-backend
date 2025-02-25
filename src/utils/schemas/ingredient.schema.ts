import Joi from 'joi';

const name = Joi.string()
  .messages({
    'string.base': 'Ingredient name should be a type of text'
  })
  .min(1);
const quantity = Joi.number().positive().messages({
  'number.base': 'Quantity should be a type of number',
  'number.positive': 'Quantity should be a positive number'
});
const measurement = Joi.string().messages({
  'string.base': 'Measurement should be a type of text'
});

const ingredientSchema = Joi.object({
  name: name.required()
});

const recipeIngredientSchema = Joi.object({
  name: name.required(),
  quantity: quantity.required(),
  measurement: measurement.required()
});

const softIngredientsSchema = Joi.object({
  name: name.optional(),
  quantity: quantity.optional(),
  measurement: measurement.optional()
});

export {
  ingredientSchema,
  softIngredientsSchema,
  recipeIngredientSchema
};
