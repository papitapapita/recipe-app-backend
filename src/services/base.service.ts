import { Model, Repository } from 'sequelize-typescript';
import {
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  CreationAttributes
} from 'sequelize';

export abstract class BaseService<T extends Model<T>> {
  protected repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return await this.repository.findAll(options);
  }

  async findById(
    id: number,
    options?: FindOptions
  ): Promise<T | null> {
    return await this.repository.findByPk(id, options);
  }

  async create(
    data: CreationAttributes<T>,
    options?: CreateOptions
  ): Promise<T> {
    return await this.repository.create(data, options);
  }

  async update(
    id: number,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<[number, T[]]> {
    const [affectedCount] = await this.repository.update(data, {
      where: { id },
      ...options
    } as UpdateOptions);

    const updatedRecords = await this.repository.findAll({
      where: { id },
      ...options
    });

    return [affectedCount, updatedRecords];
  }

  async delete(
    id: number,
    options?: DestroyOptions
  ): Promise<number> {
    return await this.repository.destroy({
      where: { id },
      ...options
    });
  }
}
