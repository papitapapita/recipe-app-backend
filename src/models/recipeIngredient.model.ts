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
  indexes: [{ fields: ['recipe_id', 'ingredient_id'], unique: true }],
  timestamps: false
})
export class RecipeIngredient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Recipe)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'recipe_id'
  })
  recipeId!: number;

  @ForeignKey(() => Ingredient)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'ingredient_id'
  })
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
