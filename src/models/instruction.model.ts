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
  indexes: [{ fields: ['recipeId'] }]
})
export class Instruction extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Recipe)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  recipeId!: number;

  @BelongsTo(() => Recipe)
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

  static associate() {
    this.belongsTo(Recipe, { foreignKey: 'recipeId' });
    this.addHook(
      'beforeValidate',
      async (instruction: Instruction) => {
        const existingInstruction = await Instruction.findOne({
          where: {
            recipeId: instruction.recipeId,
            step: instruction.step
          }
        });

        if (existingInstruction) {
          throw new Error(
            `Step ${instruction.step} already exists for this recipe.`
          );
        }
      }
    );
  }

  static addHooks() {
    Instruction.addHook(
      'beforeCreate',
      async (instruction: Instruction) => {
        const lastStep: number = await Instruction.max('step', {
          where: { recipeId: instruction.recipeId }
        });

        if (lastStep && instruction.step !== lastStep + 1) {
          throw new Error(
            `Step number must be sequential. Expected step ${lastStep + 1}.`
          );
        }
      }
    );
  }
}
