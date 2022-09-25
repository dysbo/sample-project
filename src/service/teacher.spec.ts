import { TeacherDao } from '../dal/dao'
import { Salutation } from '../dal/models/TeacherModel'
import { createTeacher, getTeacher, listTeachers } from './teacher'

const dateTime = new Date().toISOString()

describe('teacher service tests', () => {
  describe('listTeachers', () => {
    test('should list nothing when no teachers exist', async () => {
      jest.spyOn(TeacherDao, 'getAll')
        .mockResolvedValue([])

      await expect(listTeachers())
        .resolves
        .toEqual([])
    })

    test('should list test teacher when test teacher exists', async () => {
      jest.spyOn(TeacherDao, 'getAll')
        .mockResolvedValue([{
          firstName: 'test',
          lastName: 'teacher',
          id: 1234,
          createdAt: dateTime,
          updatedAt: dateTime
        }])

      await expect(listTeachers())
        .resolves
        .toEqual([{
          firstName: 'test',
          lastName: 'teacher',
          id: 1234
        }])
    })
  })

  describe('createTeacher', () => {
    test('should create teacher', async () => {
      jest.spyOn(TeacherDao, 'create')
        .mockResolvedValue({
          firstName: 'test',
          lastName: 'teacher',
          salutation: Salutation.MS,
          id: 1,
          createdAt: dateTime,
          updatedAt: dateTime
        })

      await expect(createTeacher({
        firstName: 'test',
        lastName: 'teacher',
        salutation: Salutation.MS
      }))
        .resolves
        .toEqual({
          firstName: 'test',
          lastName: 'teacher',
          salutation: Salutation.MS,
          id: 1
        })
    })

    test('should throw error when error occurs in dao', async () => {
      jest.spyOn(TeacherDao, 'create')
        .mockRejectedValue(new Error('Validation error'))

      await expect(createTeacher({
        firstName: 'only one line'
      } as any))
        .rejects
        .toThrowError('Validation error')
    })
  })

  describe('getTeacher', () => {
    test('should retrieve teacher if it exists', async () => {
      jest.spyOn(TeacherDao, 'getById')
        .mockResolvedValue({
          firstName: 'test',
          lastName: 'teacher',
          salutation: Salutation.MR,
          createdAt: dateTime,
          updatedAt: dateTime,
          id: 14
        })

      await expect(getTeacher(14))
        .resolves
        .toEqual({
          'firstName': 'test',
          'id': 14,
          'lastName': 'teacher',
          'salutation': 'Mr.'
        })
    })

    test('should return null if teacher does not exist', async () => {
      jest.spyOn(TeacherDao, 'getById')
        .mockResolvedValue(null)

      await expect(getTeacher(192))
        .resolves
        .toEqual(null)
    })
  })
})
