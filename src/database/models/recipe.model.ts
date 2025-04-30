import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  AllowNull,
  BelongsToMany,
  DataType,
  Unique,
  HasMany
} from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipeIngredient.model';
import { Tag } from './tag.model';
import { RecipeTag } from './recipeTag.model';
import { Instruction } from './instruction.model';

@Table({
  tableName: 'recipes',
  timestamps: true,
  underscored: true
})
class Recipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    field: 'preparing_time'
  })
  preparingTime?: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    field: 'cooking_time'
  })
  cookingTime?: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'image_url'
  })
  imageUrl!: string;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  calories?: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  carbs?: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  protein?: number;

  @AllowNull(true)
  @Column({ type: DataType.FLOAT, validate: { min: 0 } })
  fat?: number;

  @BelongsToMany(() => Ingredient, () => RecipeIngredient)
  ingredients!: Ingredient[];

  @BelongsToMany(() => Tag, () => RecipeTag)
  tags!: Tag[];

  @HasMany(() => Instruction)
  instructions!: Instruction[];
}

export { Recipe };
