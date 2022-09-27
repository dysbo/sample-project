import { Salutation } from '../dal/models'
import { TeacherDto } from '../dto'
import { createTeacher, getTeacher, listTeachers } from './teacher'

// test constants and mocks
const dateTime = new Date().toISOString()
const mockCreate = jest.fn()
const mockDestroy = jest.fn()
const mockGetAll = jest.fn()
const mockGetById = jest.fn()

// inline mock for repository
jest.mock('../dal/repository', () => ({
  TeacherRepository: class MockTeacherRepo extends jest.requireActual('../dal/repository').TeacherRepository {
    async create (data: TeacherDto) {
      return mockCreate(data)
    }

    async destroy (id: number) {
      return mockDestroy(id)
    }

    async getAll () {
      return mockGetAll()
    }

    async getById (id: number) {
      return mockGetById(id)
    }
  }
}))

describe('teacher service tests', () => {
  describe('listTeachers', () => {
    test('should list nothing when no teachers exist', async () => {
      mockGetAll.mockResolvedValue([])

      await expect(listTeachers())
        .resolves
        .toEqual([])
    })

    test('should list test teacher when test teacher exists', async () => {
      mockGetAll.mockResolvedValue([{
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
      mockCreate.mockResolvedValue({
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
      mockCreate.mockRejectedValue(new Error('Validation error'))

      await expect(createTeacher({
        firstName: 'only one line'
      } as any))
        .rejects
        .toThrowError('Validation error')
    })
  })

  describe('getTeacher', () => {
    test('should retrieve teacher if it exists', async () => {
      mockGetById.mockResolvedValue({
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
      mockGetById.mockResolvedValue(null)

      await expect(getTeacher(192))
        .resolves
        .toEqual(null)
    })
  })
})
