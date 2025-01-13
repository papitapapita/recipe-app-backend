import { recipesService } from '../services/recipes.service';
import tryCatch from '../utils/tryCatch';
import boom from '../../node_modules/@hapi/boom/lib/index';
import { RecipeData } from '../types/RecipeData';

export default class ProductsController {
  public getRecipe() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const recipe = await recipesService.getRecipe(
        parseInt(id)
      );

      res.status(200).json({
        success: true,
        message: 'Recipe Retrieved',
        data: recipe
      });
    });
  }

  public getRecipes() {
    return tryCatch(async (req, res) => {
      const { size } = req.query;

      let recipes: RecipeData[];

      if (size && typeof size === 'string') {
        if (isNaN(parseInt(size)) || parseInt(size) < 0) {
          throw boom.badRequest('Invalid size paramenter');
        }

        const parsedSize = parseInt(size);
        recipes =
          await recipesService.getRecipes(parsedSize);
      } else {
        recipes = await recipesService.getRecipes();
      }

      res.status(200).send({
        success: true,
        message: 'Recipes Retrieved',
        data: recipes
      });
    });
  }
}
