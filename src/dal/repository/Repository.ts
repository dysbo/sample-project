import { CreationAttributes, WhereOptions } from 'sequelize'
import { Model, Repository as SequelizeRepository } from 'sequelize-typescript'

export interface Repository<M extends Model> {
  create (data: CreationAttributes<M>): Promise<M>

  destroy (id: number): Promise<boolean>

  getAll (): Promise<Array<M>>

  getById (id: number): Promise<M | null>
}

export abstract class BaseRepository<M extends Model> implements Repository<M> {
  protected constructor (protected readonly repository: SequelizeRepository<M>) {
  }

  async create (data: CreationAttributes<M>): Promise<M> {
    return await this.repository.create(data)
  }

  async getAll (): Promise<Array<M>> {
    return await this.repository.findAll()
  }

  async getById (id: number): Promise<M | null> {
    return await this.repository.findByPk(id)
  }

  async destroy (id: number): Promise<boolean> {
    const where: WhereOptions = {
      [this.repository.primaryKeyAttribute]: id
    }
    const destroyed = await this.repository.destroy({
      where
    })

    return destroyed === 1
  }
}
