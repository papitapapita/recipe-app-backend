import {
  BelongsTo,
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
  @ForeignKey(() => Recipe)
  @Column(DataType.INTEGER)
  recipeId!: number;

  @PrimaryKey
  @ForeignKey(() => Tag)
  @Column(DataType.INTEGER)
  tagId!: number;

  @BelongsTo(() => Recipe, { onDelete: 'CASCADE' })
  recipe!: Recipe;

  @BelongsTo(() => Tag, { onDelete: 'CASCADE' })
  tag!: Tag;
}
