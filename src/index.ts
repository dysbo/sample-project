import app from './app'
import { config, logger } from './common'
import { runMigrations } from './dal/db'

const { PORT } = config

export const startServer = async () => {
  await runMigrations()

  return app.listen(PORT, async () => {
    logger.info(`Listening on port ${PORT}`)
  })
}

startServer()
