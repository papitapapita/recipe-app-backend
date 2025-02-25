import boom from '../../node_modules/@hapi/boom/lib/index';
import Joi, { ObjectSchema } from 'joi';
import { BaseService } from './base.service';
import { Recipe } from '../models';
import { Repository } from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { recipeSchema } from '../utils/schemas/recipe.schema';
import { recipeIngredientSchema } from '../utils/schemas/ingredient.schema';
import { softRecipeSchema } from '../utils/schemas';
import { instructionSchema } from '../utils/schemas/instruction.schema';
import { tagSchema } from '../utils/schemas/tag.schema';

export class RecipesService extends BaseService<Recipe> {
  /* static readonly attributes = [
    'id',
    'title',
    'description',
    'preparingTime',
    'cookingTime',
    'imageUrl',
    'calories',
    'carbs',
    'protein',
    'fat',
    'ingredients',
    'tags'
  ]; // Room to improve making an Object.keys()*/
  constructor(recipeRepository: Repository<Recipe>) {
    super(recipeRepository);
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

  /*
  I need to validate the info is right
  1. Create the schemas with properties value types and constrains
  2. Define what is the schema you need (What are the properties you need to check)
  3. You need to check every property that it exists and it has the 
  required type of data according to the database constrains


  private validate(schma: ObjectSchema<T>)
  */
  /*
  private async validate(
    recipe: Recipe | Partial<Recipe>,
    schema: ObjectSchema
  ): Promise<Recipe | Partial<Recipe>> {
    const { error, value } = schema.validate(recipe, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      throw boom.badRequest(
        error.details.map((detail: any) => detail.message).join(',')
      );
    }

    // Si hay un título a validar
    if (recipe.title) {
      const isUnique = await validateUniqueness(
        recipe.title,
        'title',
        'recipe'
      );
      if (!isUnique) {
        throw boom.badRequest(
          'A recipe with this title already exists'
        );
      }
    }

    // Si hay ingredientes validar que los ingredientes no existan, o si no crearlos
    if (recipe.ingredients) {
      //const { ingredients } = recipe;
      await ingredientService.validateIngredient(
        recipe.ingredients,
        instructionSchema
      );
    }

    if (recipe.instructions) {
      await instructionService.validateInstruction(
        recipe.instructions,
        instructionSchema
      );
    }

    if (recipe.tags) {
      await tagService.validateTag(recipe.tags, tagSchema);
    }

    return value;
  }

  private async validateUniqueness(value, property, table) {}

  /*
  private validate(
    recipe: Partial<Recipe>,
    isPartial = false
  ): Recipe | Partial<Recipe> {
    const requiredProperties = Object.keys(Recipe.prototype);

    for (const key of Object.keys(recipe)) {
      if (!requiredProperties.includes(key)) {
        throw boom.badData(`Invalid property: ${key}`);
      }
    }

    if (!isPartial) {
      for (const prop of requiredProperties) {
        if (!(prop in recipe)) {
          throw boom.expectationFailed(`Missing property: ${prop}`);
        }
      }
    }

    return recipe;
  }*/

  public async createRecipe(recipe: Recipe) {
    const createdRecipe = this.validate(recipe);

    this.recipes.push(createdRecipe);
    return createdRecipe;
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
export { recipesService };
