import { TeacherModel } from '../models'
import { BaseRepository } from './Repository'

export class TeacherRepository extends BaseRepository<TeacherModel> {
  constructor () {
    super(TeacherModel)
  }
}
