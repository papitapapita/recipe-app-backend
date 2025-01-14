import { recipesService } from '../services/recipes.service';
import { Response } from 'express';
import tryCatch from '../utils/tryCatch';
import boom from '../../node_modules/@hapi/boom/lib/index';
import { RecipeData } from '../types/RecipeData';

export default class RecipeController {
  public validateId(id: string | undefined): number {
    if (!id || isNaN(parseInt(id))) {
      throw boom.badRequest('Invalid or missing ID');
    }

    return parseInt(id);
  }

  public sendResponse<T>(
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

      this.sendResponse(
        res,
        200,
        'Recipe Retrieved',
        recipe
      );
    });
  }

  public getRecipes() {
    return tryCatch(async (req, res) => {
      const { size } = req.query;

      if (size && isNaN(parseInt(size as string))) {
        throw boom.badRequest('Invalid size parameter');
      }

      const parsedSize =
        parseInt(size as string) || undefined;
      const recipes =
        await recipesService.getRecipes(parsedSize);

      this.sendResponse(
        res,
        200,
        'Recipes Retrieved',
        recipes
      );
    });
  }

  public createRecipes() {
    return tryCatch(async (req, res) => {
      const { body } = req;

      const recipe =
        await recipesService.createRecipe(body);

      this.sendResponse(res, 201, 'Recipe Created', recipe);
    });
  }

  public updateRecipe() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const id = this.validateId(req.params.id);

      const updatedRecipe =
        await recipesService.updateRecipe(id, body);

      this.sendResponse(
        res,
        200,
        'Recipe updated',
        updatedRecipe
      );
    });
  }

  public replaceRecipe() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);
      const { body } = req;

      const replacedRecipe =
        await recipesService.replaceRecipe(id, body);

      this.sendResponse(
        res,
        204,
        'Recipe replaced',
        replacedRecipe
      );
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
