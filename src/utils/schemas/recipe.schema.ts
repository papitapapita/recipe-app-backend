import Joi from 'joi';
import {
  instructionSchema,
  tagSchema,
  recipeIngredientSchema,
  softIngredientsSchema,
  softTagSchema
} from '.';

const title = Joi.string().min(3).max(100).messages({
  'string.base': 'Title should be a type of text',
  'string.empty': 'Title cannot be an empty field',
  'string.min': 'Title should have a minimum length of {#limit}',
  'string.max': 'Title should have a maximum length of {#limit}'
});
const description = Joi.string().min(5).max(1000).messages({
  'string.base': 'Description should be a type of text',
  'string.empty': 'Description cannot be an empty field',
  'string.min':
    'Description should have a minimum length of {#limit}',
  'string.max': 'Description should have a maximum length of {#limit}'
});
const imageUrl = Joi.string().uri().messages({
  'string.uri': 'Image URL should be a valid URI'
});
const preparingTime = Joi.number().positive().integer().messages({
  'number.base': 'Preparing time should be a type of number',
  'number.positive': 'Preparing time should be a positive number',
  'number.integer': 'Preparing time should be an integer'
});
const cookingTime = Joi.number().positive().integer().messages({
  'number.base': 'Cooking time should be a type of number',
  'number.positive': 'Cooking time should be a positive number',
  'number.integer': 'Cooking time should be an integer'
});
const calories = Joi.number().min(0).messages({
  'number.base': 'Calories should be a type of number',
  'number.positive': 'Calories should be a positive number'
});
const carbs = Joi.number().min(0).messages({
  'number.base': 'Carbs should be a type of number',
  'number.positive': 'Carbs should be a positive number'
});
const protein = Joi.number().min(0).messages({
  'number.base': 'Protein should be a type of number',
  'number.positive': 'Protein should be a positive number'
});
const fat = Joi.number().min(0).messages({
  'number.base': 'Fat should be a type of number',
  'number.positive': 'Fat should be a positive number'
});
const instructions = Joi.array()
  .items(instructionSchema)
  .min(1)
  .messages({
    'array.min': 'Instructions should have at least {#limit} items'
  });
const tags = Joi.array().items(tagSchema).messages({
  'array.min': 'Tags should have at least {#limit} items'
});
const ingredients = Joi.array()
  .items(recipeIngredientSchema)
  .min(1)
  .messages({
    'array.min': 'Tags should have at least {#limit} items'
  });
const softInstructions = Joi.array()
  .items(softIngredientsSchema)
  .min(1);
const softTags = Joi.array().items(softTagSchema).min(1);
const softIngredients = Joi.array()
  .items(softIngredientsSchema)
  .min(1);

const recipeSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  imageUrl: imageUrl.required(),
  preparingTime,
  cookingTime,
  calories,
  carbs,
  protein,
  fat,
  instructions: instructions.required(),
  ingredients: ingredients.required(),
  tags
});

const softRecipeSchema = Joi.object({
  title,
  description,
  imageUrl,
  preparingTime,
  cookingTime,
  calories,
  carbs,
  protein,
  fat,
  softInstructions,
  softIngredients,
  softTags
});

export { recipeSchema, softRecipeSchema };
