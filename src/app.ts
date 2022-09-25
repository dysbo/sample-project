import bodyParser from 'body-parser'
import express from 'express'
import { teacherRouter } from './router'

const app = express()

app.use(bodyParser.json())

app.use('/teacher', teacherRouter)

export default app
