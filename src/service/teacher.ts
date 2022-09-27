import { TeacherRepository } from '../dal/repository'
import { TeacherDto } from '../dto'
import { TeacherTransformer } from '../transform/TeacherTransformer'

const teacherTransformer = new TeacherTransformer()
const teacherRepository = new TeacherRepository()

export const listTeachers = async (): Promise<Array<TeacherDto>> => {
  const teachers = await teacherRepository.getAll()
  return teachers.map(teacherDao => teacherTransformer.toDataTransferObject(teacherDao))
}

export const createTeacher = async (dto: TeacherDto): Promise<TeacherDto> => {
  const teacher = await teacherRepository.create(dto)
  return teacherTransformer.toDataTransferObject(teacher)
}

export const getTeacher = async (teacherId: number): Promise<TeacherDto | null> => {
  const teacher = await teacherRepository.getById(teacherId)
  if (!teacher) {
    return null
  }

  return teacherTransformer.toDataTransferObject(teacher)
}

export const deleteTeacher = async (teacherId: number): Promise<boolean> => {
  const teacher = await teacherRepository.getById(teacherId)

  if (!teacher) {
    throw Error('No teacher found.')
  }

  return await teacherRepository.destroy(teacherId)
}
