import path from 'path'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { MigrationMeta, SequelizeStorage, Umzug } from 'umzug'
import { logger } from '../common'

export type MigrationParams = {
  context: {
    sequelize: {
      queryInterface: QueryInterface
    }
  }
}

const database = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), 'db.sqlite'),
  models: [path.resolve(process.cwd(), 'src', 'dal', 'models')],
  logging: false
})

const uzmug = (sequelize: Sequelize = database) => new Umzug({
  migrations: {
    glob: 'src/**/migrations/*.[jt]s'
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger
})

export const runMigrations = (sequelize: Sequelize = database): Promise<Array<MigrationMeta>> => {
  logger.info('running migrations ...')
  return uzmug(sequelize).up()
}
