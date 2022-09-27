import path from 'path'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { MigrationMeta, SequelizeStorage, Umzug } from 'umzug'
import { config, logger } from '../common'

export type MigrationParams = {
  context: {
    sequelize: {
      queryInterface: QueryInterface
    }
  }
}

const database = new Sequelize({
  dialect: 'mysql',
  // storage: path.resolve(process.cwd(), 'db.sqlite'),
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  username: config.DB_USER,
  models: [path.resolve(process.cwd(), 'src', 'dal', 'models', '*Model.*')],
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
