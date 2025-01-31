import Joi from 'joi';

const ingredientName = Joi.string()
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
  ingredientName: ingredientName.required()
});

const recipeIngredientSchema = Joi.object({
  ingredientName: ingredientName.required(),
  quantity: quantity.required(),
  measurement: measurement.required()
});

const softIngredientsSchema = Joi.object({
  ingredientName: ingredientName.optional(),
  quantity: quantity.optional(),
  measurement: measurement.optional()
});

export {
  ingredientSchema,
  softIngredientsSchema,
  recipeIngredientSchema
};
