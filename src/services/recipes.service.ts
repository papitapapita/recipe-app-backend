import { createRecipes } from '../data/recipesGenerator';
import { Recipe, RecipeData } from '../models/index';
import boom from '../../node_modules/@hapi/boom/lib/index';
type Id = Pick<RecipeData, 'id'>;

class RecipesService {
  private recipes: RecipeData[] = [];

  constructor(recipes?: RecipeData[]) {
    this.recipes = recipes ?? [];
  }

  private async generate(amount = 100) {
    return createRecipes(amount);
  }

  public async initialize(amount = 100) {
    this.recipes = await this.generate(amount);
  }

  private async ensureInitialized() {
    if (!this.recipes || this.recipes.length === 0) {
      await this.initialize(100);
    }
  }

  public async getRecipes(limit?: number) {
    await this.ensureInitialized();

    if (!limit) {
      return this.recipes;
    }

    return this.recipes.slice(0, limit);
  }

  public async findRecipe(
    id: Id
  ): Promise<RecipeData | undefined> {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  public async findRecipeIndex(id: Id) {
    return this.recipes.findIndex(
      (recipe) => recipe.id === id
    );
  }

  public async getRecipe(id: Id): Promise<RecipeData> {
    const recipe = await this.findRecipe(id);

    if (!recipe) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  private validate(
    recipe: Partial<RecipeData>,
    isPartial = false
  ) {
    const requiredProperties = Object.keys(new Recipe());

    for (const key of Object.keys(recipe)) {
      if (!requiredProperties.includes(key)) {
        throw boom.badData(`Invalid property: ${key}`);
      }
    }

    if (!isPartial) {
      for (const prop of requiredProperties) {
        if (!(prop in recipe)) {
          throw boom.expectationFailed(
            `Missing property: ${prop}`
          );
        }
      }
    }

    return recipe;
  }

  public async updateRecipe(
    id: Id,
    recipeUpdates: Partial<RecipeData>
  ) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    const validUpdates = this.validate(recipeUpdates, true);

    const updatedRecipe = this.validate({
      ...this.recipes[recipeIndex],
      ...validUpdates
    });

    const validatedRecipe = this.validate(updatedRecipe);

    this.recipes[recipeIndex] = validatedRecipe;
    return validatedRecipe;
  }

  public async replaceRecipe(
    id: Id,
    recipe: Partial<RecipeData>
  ) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    const validatedRecipe = this.validate(recipe);
    this.recipes[recipeIndex] = validatedRecipe;

    return validatedRecipe;
  }

  public async createRecipe(
    recipe: Omit<RecipeData, 'id'>
  ) {
    const createdRecipe = this.validate({
      ...recipe,
      id: this.recipes.length + 1
    });

    this.recipes.push(createdRecipe);
    return createdRecipe;
  }

  public async deleteRecipe(id: Id) {
    const recipeIndex = await this.findRecipeIndex(id);

    if (recipeIndex === -1) {
      throw boom.notFound(`Recipe with ID ${id} not found`);
    }

    this.recipes = this.recipes.filter(
      (recipe) => recipe.id !== id
    );
  }
}

const recipesService = new RecipesService();
recipesService.initialize();

export { recipesService };
