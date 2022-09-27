import { valueOrUndefined } from '../../common'
import { Salutation } from '../models'

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

  constructor (data: TeacherDaoProperties) {
    this.id = valueOrUndefined(data.id)
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.salutation = valueOrUndefined(data.salutation)
    this.createdAt = valueOrUndefined(data.createdAt)
    this.updatedAt = valueOrUndefined(data.updatedAt)
  }
}

export default TeacherDao
