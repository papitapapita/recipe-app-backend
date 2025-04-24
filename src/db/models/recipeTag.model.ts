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

@Table({ tableName: 'recipes_tags', timestamps: false })
export class RecipeTag extends Model {
  @PrimaryKey
  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.INTEGER,
    field: 'recipe_id'
  })
  recipeId!: number;

  @PrimaryKey
  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    field: 'tag_id'
  })
  tagId!: number;

  @BelongsTo(() => Recipe, { onDelete: 'CASCADE' })
  recipe!: Recipe;

  @BelongsTo(() => Tag, { onDelete: 'CASCADE' })
  tag!: Tag;
}
