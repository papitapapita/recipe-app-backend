import { BaseService } from './base.service';
import boom from '@hapi/boom';
import {
  Ingredient,
  Instruction,
  Recipe,
  RecipeIngredient,
  Tag
} from '../db/models';
import { Repository } from 'sequelize-typescript';
import { FindOptions, Sequelize, Op, Transaction } from 'sequelize';
import {
  recipeSchema,
  softRecipeSchema
} from '../utils/schemas/recipe.schema';
import {
  RecipeInput,
  RecipeWithRelations,
  PartialRecipeInput
} from '../types/Recipe';
import { IngredientDTO } from '../types/Ingredient';
import { InstructionDTO } from '../types/Instruction';
import Joi from 'joi';

export class RecipesService extends BaseService<Recipe> {
  constructor(
    private sequelize: Sequelize,
    private recipeRepository: Repository<Recipe>
  ) {
    super(recipeRepository);
    this.sequelize = sequelize;
  }

  public async getAllRecipes(options?: {
    limit?: number;
    order?: [string, 'ASC' | 'DESC'][];
  }): Promise<RecipeWithRelations[]> {
    try {
      const findOptions: FindOptions = {
        include: [
          {
            model: Ingredient,
            attributes: ['name'],
            through: { attributes: ['quantity', 'measurement'] }
          },
          {
            model: Instruction,
            attributes: ['step', 'title', 'description']
          },
          {
            model: Tag,
            attributes: ['name']
          }
        ]
      };

      if (options?.limit) {
        findOptions.limit = options.limit;
      }

      if (options?.order) {
        findOptions.order = options.order;
      }

      const recipes = await this.findAll(findOptions);
      return recipes.map(this.transformRecipe);
    } catch (error) {
      console.error('Error in getAllRecipes:', error);
      throw error;
    }
  }

  public async getRecipe(id: number): Promise<RecipeWithRelations> {
    try {
      const findOptions: FindOptions = {
        include: [
          {
            model: Ingredient,
            attributes: ['name'],
            through: { attributes: ['quantity', 'measurement'] }
          },
          {
            model: Instruction,
            attributes: ['step', 'title', 'description']
          },
          {
            model: Tag,
            attributes: ['name']
          }
        ]
      };

      const recipe = await this.findById(id, findOptions);

      if (!recipe) {
        throw boom.notFound(`Recipe with ID ${id} not found`);
      }

      return this.transformRecipe(recipe);
    } catch (error) {
      console.error(`Error fetching recipe with ID ${id}:`, error);
      throw error;
    }
  }

  private transformRecipe(recipe: Recipe): RecipeWithRelations {
    try {
      const recipeJson =
        recipe.toJSON() as RecipeWithRelations as any;

      if (recipeJson.ingredients) {
        recipeJson.ingredients = recipeJson.ingredients.map(
          (ingredient: any) => {
            const { RecipeIngredient, ...rest } = ingredient;
            return {
              ...rest,
              quantity: RecipeIngredient?.quantity,
              measurement: RecipeIngredient?.measurement
            };
          }
        );
      }

      if (recipeJson.tags) {
        recipeJson.tags = recipeJson.tags.map((tag: any) => {
          const { name } = tag;
          return {
            name
          };
        });
      }

      return recipeJson;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async validateRecipeData(
    recipeData: RecipeInput | Partial<RecipeInput>,
    isPartial: boolean = false
  ) {
    try {
      let result: Joi.ValidationResult;

      if (isPartial) {
        result = softRecipeSchema.validate(recipeData);
      } else {
        const existingRecipe = await this.recipeRepository.findOne({
          where: { title: recipeData.title }
        });

        if (existingRecipe) {
          throw boom.badData('This recipe title already exists');
        }

        result = recipeSchema.validate(recipeData);
      }

      if (result.error) {
        throw boom.badRequest(
          'Validation failed',
          result.error.details.map((d) => d.message)
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async filterRecipeData(
    recipeData: RecipeInput | Partial<RecipeInput>
  ) {
    try {
      await this.validateRecipeData(
        recipeData,
        'instructions' in recipeData === false
      );

      const {
        instructions,
        ingredients,
        tags = [],
        ...recipe
      } = recipeData;

      return { recipe, instructions, ingredients, tags };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async createRecipe(recipeData: RecipeInput) {
    const transaction = await this.sequelize.transaction();
    try {
      // Validate and prepare recipe data
      const data = await this.filterRecipeData(recipeData);

      // Create the main recipe
      const rawRecipe = await this.recipeRepository.create(
        data.recipe,
        {
          transaction
        }
      );
      const recipe = rawRecipe.toJSON();
      console.log('Created recipe with ID:', recipe.id);

      // Create ingredients and their relationships
      await this.createRecipeIngredients(
        recipe.id,
        data.ingredients,
        transaction
      );

      // Create instructions
      await this.createRecipeInstructions(
        recipe.id,
        data.instructions,
        transaction
      );

      // Create tags if provided
      if (data.tags?.length > 0) {
        await this.createRecipeTags(
          rawRecipe,
          data.tags,
          transaction
        );
      }

      await transaction.commit();
      console.log('Transaction committed successfully');
      return recipe;
    } catch (error) {
      await transaction.rollback();
      console.error('Error in createRecipe:', error);
      throw error;
    }
  }

  private async createRecipeIngredients(
    recipeId: number,
    ingredients: IngredientDTO[] | undefined,
    transaction: Transaction
  ) {
    if (!ingredients) return;

    for (const ingredient of ingredients) {
      const { measurement, quantity, ...filteredIngredient } =
        ingredient;
      console.log('Processing ingredient:', ingredient.name);

      const [rawCreatedIngredient] = await Ingredient.findOrCreate({
        where: { name: ingredient.name },
        defaults: filteredIngredient,
        transaction
      });

      const createdIngredient = rawCreatedIngredient.toJSON();
      console.log(
        'Created/found ingredient with ID:',
        createdIngredient.id
      );

      const recipeIngredient = await RecipeIngredient.create(
        {
          recipeId,
          ingredientId: createdIngredient.id,
          quantity,
          measurement
        },
        { transaction }
      );
      console.log(
        'Created RecipeIngredient:',
        recipeIngredient.toJSON()
      );
    }
  }

  private async createRecipeInstructions(
    recipeId: number,
    instructions: InstructionDTO[] | undefined,
    transaction: Transaction
  ) {
    if (!instructions) return;

    let currentStep = 1;
    for (const instruction of instructions) {
      await Instruction.create(
        {
          ...instruction,
          recipeId,
          step: currentStep++
        },
        { transaction }
      );
    }
  }

  private async createRecipeTags(
    recipe: Recipe,
    tags: RecipeInput['tags'] | undefined,
    transaction: any
  ) {
    if (!tags) return;

    const createdTags: Tag[] = [];
    for (const tag of tags) {
      const [createdTag] = await Tag.findOrCreate({
        where: { name: tag.name },
        defaults: tag,
        transaction
      });
      createdTags.push(createdTag);
    }
    await recipe.$set('tags', createdTags, { transaction });
  }

  private async updateRecipeBase(
    recipeId: number,
    recipeUpdates: RecipeInput | PartialRecipeInput,
    isReplace: boolean = false
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      // Find and validate recipe exists
      const recipe = await this.recipeRepository.findByPk(recipeId, {
        transaction
      });

      if (!recipe) {
        throw boom.notFound('Recipe not found');
      }

      // Validate and prepare update data
      await this.validateRecipeData(recipeUpdates, !isReplace);
      const {
        instructions,
        ingredients,
        tags,
        recipe: recipeData
      } = await this.filterRecipeData(recipeUpdates as RecipeInput);

      // Update main recipe data
      const updateData = isReplace
        ? {
            preparingTime: null,
            cookingTime: null,
            calories: null,
            carbs: null,
            protein: null,
            fat: null,
            ...recipeData
          }
        : recipeData;

      await recipe.update(updateData, { transaction });

      // Update ingredients if provided
      if (ingredients) {
        await this.updateRecipeIngredients(
          recipeId,
          ingredients,
          transaction
        );
      }

      // Update instructions if provided
      if (instructions) {
        await this.updateRecipeInstructions(
          recipeId,
          instructions,
          transaction
        );
      }

      // Update tags if provided
      if (tags?.length > 0) {
        await this.updateRecipeTags(recipe, tags, transaction);
      }

      await transaction.commit();
      return recipe;
    } catch (error) {
      await transaction.rollback();
      console.error(
        `Error ${isReplace ? 'replacing' : 'updating'} recipe with ID ${recipeId}:`,
        error
      );
      throw error;
    }
  }

  public async updateRecipe(
    recipeId: number,
    recipeUpdates: PartialRecipeInput
  ) {
    return this.updateRecipeBase(recipeId, recipeUpdates, false);
  }

  public async replaceRecipe(
    recipeId: number,
    newRecipe: RecipeInput
  ) {
    return this.updateRecipeBase(recipeId, newRecipe, true);
  }

  private async updateRecipeIngredients(
    recipeId: number,
    ingredients: IngredientDTO[] | undefined,
    transaction: Transaction
  ) {
    if (!ingredients) return;

    const newIngredientsIds: number[] = [];

    for (const ingredient of ingredients) {
      const { measurement, quantity, ...filteredIngredient } =
        ingredient;

      const [createdIngredient] = await Ingredient.findOrCreate({
        where: { name: ingredient.name },
        defaults: filteredIngredient,
        transaction
      });

      newIngredientsIds.push(createdIngredient.toJSON().id);

      const upsertData = {
        recipeId,
        ingredientId: createdIngredient.toJSON().id,
        quantity,
        measurement
      };

      await RecipeIngredient.upsert(upsertData, { transaction });
    }

    // Remove old ingredients that are not in the new list
    await RecipeIngredient.destroy({
      where: {
        recipeId,
        ingredientId: { [Op.notIn]: newIngredientsIds }
      },
      transaction
    });
  }

  private async updateRecipeInstructions(
    recipeId: number,
    instructions: InstructionDTO[] | undefined,
    transaction: Transaction
  ) {
    if (!instructions) return;

    // Remove old instructions
    await Instruction.destroy({
      where: { recipeId },
      transaction
    });

    // Create new instructions
    let step = 1;
    for (const instruction of instructions) {
      await Instruction.create(
        { ...instruction, recipeId, step: step++ },
        { transaction }
      );
    }
  }

  private async updateRecipeTags(
    recipe: Recipe,
    tags: RecipeInput['tags'] | undefined,
    transaction: Transaction
  ) {
    if (!tags) return;

    const newTags: Tag[] = [];
    for (const tag of tags) {
      const [createdTag] = await Tag.findOrCreate({
        where: { name: tag.name },
        defaults: tag,
        transaction
      });
      newTags.push(createdTag);
    }
    await recipe.$set('tags', newTags, { transaction });
  }

  public async deleteRecipe(recipeId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const recipe = await this.recipeRepository.findByPk(recipeId, {
        transaction
      });
      if (!recipe) {
        throw boom.notFound('Recipe not found');
      }

      await RecipeIngredient.destroy({
        where: { recipeId },
        transaction
      });
      await Instruction.destroy({ where: { recipeId }, transaction });
      await recipe.$set('tags', [], { transaction });

      await recipe.destroy({ transaction });

      await transaction.commit();
      return { message: 'Recipe deleted successfully' };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  }
}

//export const recipesService = new RecipesService(sequelize, Recipe);
