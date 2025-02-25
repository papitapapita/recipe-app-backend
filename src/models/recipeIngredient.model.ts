import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'recipes_ingredients',
  indexes: [{ fields: ['recipeId', 'ingredientId'], unique: true }]
})
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

  @AllowNull(false)
  @Column(DataType.FLOAT)
  quantity!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  measurement!: string;

  @BelongsTo(() => Recipe, { onDelete: 'CASCADE' })
  recipe!: Recipe;

  @BelongsTo(() => Ingredient, { onDelete: 'CASCADE' })
  ingredient!: Ingredient;
}
