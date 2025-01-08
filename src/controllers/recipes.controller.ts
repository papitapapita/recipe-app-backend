import { RecipeData } from '../models/RecipeData';
import { Request, Response } from 'express';
import tryCatch from '../utils/tryCatch';
import Boom from '@hapi/Boom';

export default class RecipesController {
  async getRecipes(
    req: Request,
    res: Response,
    next: Function
  ): Promise<RecipeData[]> {
    return tryCatch(async () => {
      let { size } = req.query;

      let recipes: RecipeData[];

      if (size) {
        
      } else {
        recipes = await recipesService.getAll();
      }

      return recipes;
    });
  }
}
