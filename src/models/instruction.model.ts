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

@Table({
  tableName: 'instructions',
  indexes: [{ fields: ['recipe_id'] }],
  timestamps: false
})
export class Instruction extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Recipe)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'recipe_id'
  })
  recipeId!: number;

  @BelongsTo(() => Recipe, { onDelete: 'CASCADE' })
  recipe!: Recipe;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  step!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  title?: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;
}
