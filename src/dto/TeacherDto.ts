import { valueOrUndefined } from '../common'
import { Salutation } from '../dal/models/TeacherModel'

interface TeacherDtoProperties {
  firstName: string
  lastName: string
  salutation?: Salutation
  id?: number
}

class TeacherDto implements TeacherDtoProperties {
  id?: number
  firstName: string
  lastName: string
  salutation?: Salutation

  constructor(data: TeacherDtoProperties) {
    this.id = valueOrUndefined(data.id)
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.salutation = valueOrUndefined(data.salutation)
  }
}

export default TeacherDto
