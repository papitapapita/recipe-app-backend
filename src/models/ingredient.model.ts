import {
  AllowNull,
  AutoIncrement,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Column,
  BelongsToMany,
  Unique
} from 'sequelize-typescript';
import { RecipeIngredient } from './recipeIngredient.model';
import { Recipe } from './recipe.model';

@Table({
  tableName: 'ingredients'
})
export class Ingredient extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Recipe, () => RecipeIngredient)
  recipes!: Recipe[];
}
