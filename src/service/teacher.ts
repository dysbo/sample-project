import { TeacherDao } from '../dal/dao'
import { TeacherDto } from '../dto'
import { TeacherTransformer } from '../transform/TeacherTransformer'

const teacherTransformer = new TeacherTransformer()

export const listTeachers = async (): Promise<Array<TeacherDto>> => {
  const teachers = await TeacherDao.getAll()
  return teachers.map(teacherDao => teacherTransformer.toDataTransferObject(teacherDao))
}

export const createTeacher = async (dto: TeacherDto): Promise<TeacherDto> => {
  const teacher = await TeacherDao.create(dto)
  return teacherTransformer.toDataTransferObject(teacher)
}

export const getTeacher = async (teacherId: number): Promise<TeacherDto | null> => {
  const teacher = await TeacherDao.getById(teacherId)
  if (!teacher) {
    return null
  }

  return teacherTransformer.toDataTransferObject(teacher)
}
