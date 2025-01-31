import Joi from 'joi';

const title = Joi.string().min(3).max(100).messages({
  'string.base': 'Title should be a type of text',
  'string.empty': 'Title cannot be an empty field',
  'string.min': 'Title should have a minimum length of {#limit}',
  'string.max': 'Title should have a maximum length of {#limit}'
});
const description = Joi.string().min(5).max(100).messages({
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
const calories = Joi.number().positive().messages({
  'number.base': 'Calories should be a type of number',
  'number.positive': 'Calories should be a positive number'
});
const carbs = Joi.number().positive().messages({
  'number.base': 'Carbs should be a type of number',
  'number.positive': 'Carbs should be a positive number'
});
const protein = Joi.number().positive().messages({
  'number.base': 'Protein should be a type of number',
  'number.positive': 'Protein should be a positive number'
});
const fat = Joi.number().positive().messages({
  'number.base': 'Fat should be a type of number',
  'number.positive': 'Fat should be a positive number'
});
const instructions = Joi.array().min(1).messages({
  'array.min': 'Instructions should have at least {#limit} items'
});
const tags = Joi.array().min(1).messages({
  'array.min': 'Tags should have at least {#limit} items'
});

const recipeSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  imageUrl: imageUrl.required(),
  preparingTime: preparingTime,
  cookingTime: cookingTime,
  calories: calories,
  carbs: carbs,
  protein: protein,
  fat: fat,
  instructions: instructions.required(),
  tags: tags
});

const softRecipeSchema = Joi.object({
  title: title,
  description: description,
  imageUrl: imageUrl,
  preparingTime: preparingTime,
  cookingTime: cookingTime,
  calories: calories,
  carbs: carbs,
  protein: protein,
  fat: fat,
  instructions: instructions,
  tags: tags
});

export { recipeSchema, softRecipeSchema };
