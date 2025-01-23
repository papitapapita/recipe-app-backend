import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { Tag } from './tag.model';

@Table({ tableName: 'recipes_tags' })
export class RecipeTag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Recipe)
  @Column(DataType.INTEGER)
  recipeId!: number;

  @ForeignKey(() => Tag)
  @Column(DataType.INTEGER)
  tagId!: number;
}
