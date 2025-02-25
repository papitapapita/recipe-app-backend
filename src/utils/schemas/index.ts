export {
  ingredientSchema,
  recipeIngredientSchema,
  softIngredientsSchema
} from './ingredient.schema';
export {
  instructionSchema,
  softInstructionSchema
} from './instruction.schema';
export { tagSchema, softTagSchema } from './tag.schema';
export { recipeSchema, softRecipeSchema } from './recipe.schema';

/*
import Joi from 'joi';

const id = Joi.number().positive().integer().messages({
  'number.base': 'Recipe ID should be a type of number',
  'number.positive': 'Recipe ID should be a positive number',
  'number.integer': 'Recipe ID should be an integer'
});

// RECIPE PROPERTIES
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

// INGREDIENT PROPERTIES
const ingredientName = Joi.string().messages({
  'string.base': 'Ingredient name should be a type of text'
});
const quantity = Joi.number().positive().messages({
  'number.base': 'Quantity should be a type of number',
  'number.positive': 'Quantity should be a positive number'
});
const measurement = Joi.string().messages({
  'string.base': 'Measurement should be a type of text'
});

// INSTRUCTION PROPERTIES
const instructionId = Joi.number().positive().integer().messages({
  'number.base': 'Instruction ID should be a type of number',
  'number.positive': 'Instruction ID should be a positive number',
  'number.integer': 'Instruction ID should be an integer'
});
const recipeId = Joi.number().positive().integer().messages({
  'number.base': 'Recipe ID should be a type of number',
  'number.positive': 'Recipe ID should be a positive number',
  'number.integer': 'Recipe ID should be an integer'
});
const step = Joi.number().positive().integer().messages({
  'number.base': 'Step should be a type of number',
  'number.positive': 'Step should be a positive number',
  'number.integer': 'Step should be an integer'
});
const instructionTitle = Joi.string().messages({
  'string.base': 'Instruction title should be a type of text'
});
const instructionDescription = Joi.string().messages({
  'string.base': 'Instruction description should be a type of text'
});

// TAG PROPERTIES
const tagId = Joi.number().positive().integer().messages({
  'number.base': 'Tag ID should be a type of number',
  'number.positive': 'Tag ID should be a positive number',
  'number.integer': 'Tag ID should be an integer'
});
const tagName = Joi.string().messages({
  'string.base': 'Tag name should be a type of text'
});

/**
 * Schema for validating an ID parameter.
 * Fields:
 * - `id` (required): A positive integer representing the ID.
 */
/*
const idSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID should be a type of number',
    'number.positive': 'ID should be a positive number',
    'number.integer': 'ID should be an integer',
    'any.required': 'ID is a required field'
  })
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

const ingredientsSchema = Joi.object({
  ingredientName: ingredientName.required(),
  quantity: quantity.required(),
  measurement: measurement.required()
});

const softIngredientsSchema = Joi.object({
  ingredientName: ingredientName,
  quantity: quantity,
  measurement: measurement
});

const instructionSchema = Joi.object({
  instructionId: instructionId.required(),
  recipeId: recipeId.required(),
  step: step.required(),
  instructionTitle: instructionTitle.required(),
  instructionDescription: instructionDescription.required()
});

const softInstructionSchema = Joi.object({
  instructionId: instructionId,
  recipeId: recipeId,
  step: step,
  instructionTitle: instructionTitle,
  instructionDescription: instructionDescription
});

const tagSchema = Joi.object({
  tagId: tagId.required(),
  tagName: tagName.required()
});

const softTagSchema = Joi.object({
  tagId: tagId,
  tagName: tagName
});

export {
  idSchema,
  recipeSchema,
  softRecipeSchema,
  ingredientsSchema,
  softIngredientsSchema,
  instructionSchema,
  softInstructionSchema,
  tagSchema,
  softTagSchema
};
*/
