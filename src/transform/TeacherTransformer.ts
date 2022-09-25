import { TeacherDao } from '../dal/dao'
import { TeacherDto } from '../dto'
import { Transformer } from './Transformer'

export class TeacherTransformer implements Transformer<TeacherDao, TeacherDto> {
  toDataAccessObject(dto: TeacherDto): TeacherDao {
    return new TeacherDao(dto)
  }

  toDataTransferObject(dao: TeacherDao): TeacherDto {
    return new TeacherDto(dao)
  }
}
