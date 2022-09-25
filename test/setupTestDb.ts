import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import { runMigrations } from '../src/dal/db'

/**
 * Sets up the test DB for unit testing so no real data is affected
 * @returns {Promise<void>}
 */
export default setupTestDb = async (): Promise<void> => {
  // create a new in-memory sequelize instance
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    models: [path.resolve(process.cwd(), 'src', 'dal', 'models')],
    logging: false
  })

  // run migrations on the new instance
  await runMigrations(db)
}
