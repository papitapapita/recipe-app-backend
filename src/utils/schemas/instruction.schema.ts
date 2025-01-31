import Joi from 'joi';

// INSTRUCTION PROPERTIES

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
const title = Joi.string().messages({
  'string.base': 'Instruction title should be a type of text'
});
const description = Joi.string().messages({
  'string.base': 'Instruction description should be a type of text'
});

const instructionSchema = Joi.object({
  recipeId: recipeId.required(),
  step: step.required(),
  title: title.required(),
  description: description.required()
});

const softInstructionSchema = Joi.object({
  recipeId: recipeId,
  step: step,
  title: title,
  description: description
});

export { instructionSchema, softInstructionSchema };
