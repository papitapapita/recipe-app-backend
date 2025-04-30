import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { RecipeTag } from './recipeTag.model';

@Table({ tableName: 'tags', timestamps: false })
export class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Recipe, () => RecipeTag)
  recipes!: Recipe[];
}
