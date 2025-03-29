import { RecipesService } from '../services/recipes.service';
import { Response } from 'express';
import tryCatch from '../utils/tryCatch';
import boom from '../../node_modules/@hapi/boom/lib/index';
import { sequelize } from '../db/sequelize';
import { Recipe } from '../models';

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
      const { size } = req.query;

      let parsedSize: number | undefined;
      let recipes;
      if (size) {
        parsedSize = parseInt(size as string);
        if (!parsedSize || parsedSize <= 0) {
          throw boom.badRequest('Invalid size parameter');
        }
        recipes = await recipesService.getAllRecipes({
          limit: parsedSize
        });
      } else {
        recipes = await recipesService.getAllRecipes();
      }

      this.sendResponse(res, 200, 'Recipes Retrieved', recipes);
    });
  }

  public createRecipes() {
    return tryCatch(async (req, res) => {
      const { body } = req;

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

      this.sendResponse(res, 204, 'Recipe replaced', replacedRecipe);
    });
  }

  public deleteRecipe() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);

      recipesService.deleteRecipe(id);

      this.sendResponse(res, 204, 'Recipe Deleted');
    });
  }
}
