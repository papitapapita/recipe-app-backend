import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  AllowNull,
  BelongsToMany,
  DataType
} from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipeIngredient.model';
import { Tag } from './tag.model';
import { RecipeTag } from './recipeTag.model';

@Table({
  tableName: 'recipes',
  timestamps: true
})
class Recipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  preparingTime!: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  cookingTime!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  imageUrl!: string;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  calories!: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  carbs!: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  protein!: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  fat!: number;

  @BelongsToMany(() => Ingredient, () => RecipeIngredient)
  ingredients!: Ingredient[];

  @BelongsToMany(() => Tag, () => RecipeTag)
  tags!: Tag[];
}

export { Recipe };
