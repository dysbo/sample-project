import { valueOrUndefined } from '../../common'
import TeacherModel, { Salutation } from '../models/TeacherModel'

export interface TeacherDaoProperties {
  firstName: string
  lastName: string
  salutation?: Salutation
  id?: number
  createdAt?: string
  updatedAt?: string
}

class TeacherDao implements TeacherDaoProperties {
  id?: number
  firstName: string
  lastName: string
  salutation?: Salutation
  createdAt?: string
  updatedAt?: string

  constructor(data: TeacherDaoProperties) {
    this.id = valueOrUndefined(data.id)
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.salutation = valueOrUndefined(data.salutation)
    this.createdAt = valueOrUndefined(data.createdAt)
    this.updatedAt = valueOrUndefined(data.updatedAt)
  }

  static async create(data: TeacherDaoProperties): Promise<TeacherDao> {
    const model = await TeacherModel.create(data)
    return new TeacherDao(model)
  }

  static async getById(id: number): Promise<TeacherDao | null> {
    const model = await TeacherModel.findByPk(id)
    if (model) {
      return new TeacherDao(model)
    }

    return null
  }

  static async getAll(): Promise<Array<TeacherDao>> {
    const models = await TeacherModel.findAll()
    return models.map(model => new TeacherDao(model))
  }
}

export default TeacherDao
