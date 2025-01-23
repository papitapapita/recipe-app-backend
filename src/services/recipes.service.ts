import { createRecipes } from '../data/recipesGenerator';
import { RecipeData } from '../types/RecipeData';
import { sequelize } from '../libs/sequelize';
import { Recipe } from '../db/models/index';
import boom from '../../node_modules/@hapi/boom/lib/index';
class RecipesService {
  private recipes: RecipeData[] = [];
  constructor(recipes?: RecipeData[]) {
    this.recipes = recipes ?? [];
  }

  public async getRecipes(limit?: number) {
    const query = 'SELECT * FROM recipes';
    //const recipes = await models.Recipe.findAll();
    /*const [recipes]: [
      recipes: Partial<RecipeData>[],
      metadata: unknown
    ] = await sequelize.query(query);*/

    if (!limit || limit >= recipes.length) {
      return recipes;
    }
    return recipes.slice(0, limit);
    //return this.recipes.slice(0, limit);
  }

  public async findRecipe(
    id: number
  ): Promise<RecipeData | undefined> {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  private async findRecipeIndex(id: number) {
    return this.recipes.findIndex((recipe) => recipe.id === id);
  }

  public async getRecipe(id: number): Promise<RecipeData> {
    const recipe = await this.findRecipe(id);

    if (!recipe) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  private validate(
    recipe: Partial<RecipeData>,
    isPartial = false
  ): RecipeData | Partial<RecipeData> {
    const requiredProperties = Object.keys(createRecipes(1)[0]);

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
  }

  public async updateRecipe(
    id: number,
    recipeUpdates: Partial<RecipeData>
  ) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    const validUpdates = this.validate(recipeUpdates, true);

    const updatedRecipe = this.validate({
      ...this.recipes[recipeIndex],
      ...validUpdates,
      updatedAt: new Date().toString()
    });

    const validatedRecipe = this.validate(
      updatedRecipe
    ) as RecipeData;

    this.recipes[recipeIndex] = validatedRecipe;
    return validatedRecipe;
  }

  public async replaceRecipe(
    id: number,
    recipe: Partial<RecipeData>
  ) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    const validatedRecipe = {
      ...this.validate(recipe),
      updatedAt: new Date().toString()
    };
    this.recipes[recipeIndex] = validatedRecipe as RecipeData;

    return validatedRecipe;
  }

  public async createRecipe(recipe: RecipeData) {
    const derivedRecipe = {
      id: this.recipes.length,
      ...recipe,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };
    const createdRecipe = this.validate(derivedRecipe) as RecipeData;

    this.recipes.push(createdRecipe);
    return createdRecipe;
  }

  public async deleteRecipe(id: number) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }
}

const recipesService = new RecipesService();
/*
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
