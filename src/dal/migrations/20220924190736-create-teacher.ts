import { DataTypes } from 'sequelize'
import { MigrationParams } from '../db'

module.exports = {
  async up({ context: { sequelize: { queryInterface } } }: MigrationParams) {
    await queryInterface.createTable('teacher', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salutation: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  async down({ context: { sequelize: { queryInterface } } }: MigrationParams) {
    await queryInterface.dropTable('teacher')
  }
}
