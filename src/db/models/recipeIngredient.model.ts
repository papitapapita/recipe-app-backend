import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

@Table({ tableName: 'recipes_ingredients' })
export class RecipeIngredient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Recipe)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  recipeId!: number;

  @ForeignKey(() => Ingredient)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  ingredientId!: number;

  @Column(DataType.FLOAT)
  quantity!: number;

  @Column(DataType.STRING)
  measurement!: string;
}
