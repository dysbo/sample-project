import { Request, Response, Router } from 'express'
import { createTeacher, getTeacher, listTeachers } from '../service'

const teacherRouter = Router()

teacherRouter.get('/', async (req: Request, res: Response) => {
  const list = await listTeachers()
  res.status(200).send(list)
})

teacherRouter.get('/:teacherId', async (req: Request, res: Response) => {
  const id = parseInt(req.params.teacherId)
  const teacher = await getTeacher(id)
  res.status(200).send(teacher)
})

teacherRouter.put('/', async (req: Request, res: Response) => {
  const saved = await createTeacher(req.body)
  res.status(201).send(saved)
})

teacherRouter.put('/:teacherId', async (req: Request, res: Response) => {
  res.sendStatus(501)
})

teacherRouter.delete('/:teacherId', async (req: Request, res: Response) => {
  res.sendStatus(501)
})

export default teacherRouter
