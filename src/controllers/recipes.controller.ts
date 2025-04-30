import { RecipesService } from '../services/recipes.service';
import { Response } from 'express';
import tryCatch from '../utils/tryCatch';
import boom from '../../node_modules/@hapi/boom/lib/index';
import { sequelize } from '../db/sequelize';
import { Recipe } from '../db/models';

const recipesService = new RecipesService(sequelize, Recipe);

export default class RecipeController {
  private validateId(id: string | undefined): number {
    if (id === undefined || isNaN(parseInt(id))) {
      throw boom.badRequest('Invalid or missing ID');
    }

    return parseInt(id);
  }

  private sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T | null = null
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  public getRecipe() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);

      const recipe = await recipesService.getRecipe(id);

      this.sendResponse(res, 200, 'Recipe Retrieved', recipe);
    });
  }

  public getRecipes() {
    return tryCatch(async (req, res) => {
      const { limit, offset, name, ingredients, tags } = req.query;

      let parsedLimit: number | undefined;
      let parsedOffset: number | undefined;
      let parsedIngredients: string[] | undefined;
      let parsedTags: string[] | undefined;

      if (limit) {
        parsedLimit = parseInt(limit as string);
      }

      if (offset) {
        parsedOffset = parseInt(offset as string);
      }

      // Parse comma-separated values
      if (ingredients) {
        parsedIngredients = (ingredients as string)
          .split(',')
          .map((i) => i.trim());
      }

      if (tags) {
        parsedTags = (tags as string).split(',').map((t) => t.trim());
      }

      const recipes = await recipesService.getAllRecipes({
        limit: parsedLimit,
        offset: parsedOffset,
        name: name as string,
        ingredients: parsedIngredients,
        tags: parsedTags
      });

      this.sendResponse(res, 200, 'Recipes Retrieved', recipes);
    });
  }

  public createRecipes() {
    return tryCatch(async (req, res) => {
      const { body } = req;

      console.log(body);
      const recipe = await recipesService.createRecipe(body);

      this.sendResponse(res, 201, 'Recipe Created', recipe);
    });
  }

  public updateRecipe() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const id = this.validateId(req.params.id);

      const updatedRecipe = await recipesService.updateRecipe(
        id,
        body
      );

      this.sendResponse(res, 200, 'Recipe updated', updatedRecipe);
    });
  }

  public replaceRecipe() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);
      const { body } = req;

      const replacedRecipe = await recipesService.replaceRecipe(
        id,
        body
      );

      this.sendResponse(res, 201, 'Recipe replaced', replacedRecipe);
    });
  }

  public deleteRecipe() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);

      recipesService.deleteRecipe(id);

      this.sendResponse(res, 201, 'Recipe Deleted');
    });
  }
}
