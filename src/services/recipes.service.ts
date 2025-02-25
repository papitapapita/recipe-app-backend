import { BaseService } from './base.service';
import boom from '@hapi/boom';
import {
  Ingredient,
  Instruction,
  Recipe,
  RecipeIngredient,
  Tag
} from '../models';
import { Repository } from 'sequelize-typescript';
import { FindOptions, Sequelize } from 'sequelize';
import { recipeSchema } from '../utils/schemas/recipe.schema';
import { RecipeInput } from '../types/Recipe';

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
  }): Promise<Recipe[]> {
    const findOptions: FindOptions = {};

    if (options?.limit) {
      findOptions.limit = options.limit;
    }

    if (options?.order) {
      findOptions.order = options.order;
    }

    return await this.findAll(options);
  }

  public async getRecipe(id: number): Promise<Recipe> {
    const recipe = await this.findById(id);

    if (!recipe) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  private async validateRecipeData(recipeData: RecipeInput) {
    const { error } = recipeSchema.validate(recipeData);
    if (error) {
      throw boom.badRequest(
        'Validation failed',
        error.details.map((d) => d.message)
      );
    }

    const existingRecipe = await this.recipeRepository.findOne({
      where: { title: recipeData.title }
    });

    if (existingRecipe) {
      throw boom.badData('This recipe title already exists');
    }
  }

  private async filterRecipeData(recipeData: RecipeInput) {
    await this.validateRecipeData(recipeData);

    const {
      instructions,
      ingredients,
      tags = [],
      ...recipe
    } = recipeData;

    return { recipe, instructions, ingredients, tags };
  }

  public async createRecipe(recipeData: RecipeInput) {
    const data = await this.filterRecipeData(recipeData);
    const transaction = await this.sequelize.transaction();

    try {
      const recipe = await this.recipeRepository.create(data.recipe, {
        transaction
      });

      for (let ingredient of data.ingredients) {
        const { measurement, quantity, ...filteredIngredient } =
          ingredient;

        const [createdIngredient] = await Ingredient.findOrCreate({
          where: { name: ingredient.name },
          defaults: filteredIngredient,
          transaction
        });

        await RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: createdIngredient.id,
          quantity,
          measurement
        });
      }

      let currentStep = 1;
      for (let instruction of data.instructions) {
        await Instruction.create(
          {
            ...instruction,
            recipeId: recipe.id,
            step: currentStep++
          },
          { transaction }
        );
      }

      if (data.tags) {
        const tags: Tag[] = [];

        for (let tag of data.tags) {
          const createdTag = await Tag.findOrCreate({
            where: { name: tag.name },
            defaults: tag,
            transaction
          });
          tags.push(createdTag[0]);
        }

        recipe.$add('tags', tags);
      }

      await transaction.commit();

      return recipe;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  /*
  public async updateRecipe(
    id: number,
    recipeUpdates: Partial<Recipe>
  ) {
    const validUpdates = this.validate(recipeUpdates, true);

    const [affectedCount, updatedRecipe] = await this.update(
      id,
      validUpdates
    );

    if (affectedCount === 0) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    return updatedRecipe;
  }

  /*
  public async replaceRecipe(id: number, recipe: Partial<Recipe>) {
    const validUpdates = this.validate(recipe, false);

    const [affectedCount, updatedRecipe] = await this.update(
      id,
      validUpdates
    );

    if (affectedCount === 0) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    return updatedRecipe;
  }

  public async deleteRecipe(id: number) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }*/
}

/*
const recipesService = new RecipesService();
recipesService.initialize();
console.log('------------ GET ------------');
console.log(await recipesService.getRecipes(2));
/*console.log('------------ FIND ------------');
console.log(await recipesService.findRecipe(2));
console.log('------------ CREATE -----------');
console.log(await recipesService.createRecipe(createRecipes(1)[0]));
console.log('--------- UPDATE -----------');
console.log(
  await recipesService.updateRecipe(1, {
    title: 'New Title'
  })
);
console.log(await recipesService.getRecipe(1));
console.log('---------- REPLACE ------------');
console.log(await recipesService.getRecipes(2));
console.log(
  await recipesService.replaceRecipe(1, createRecipes(1)[0])
);
console.log('---------- DELETE ------------');
console.log(await recipesService.deleteRecipe(2));
console.error(await recipesService.getRecipe(2));
 */
//export { recipesService };
