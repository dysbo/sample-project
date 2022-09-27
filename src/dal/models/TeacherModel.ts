import { DataTypes, Optional } from 'sequelize'
import { AllowNull, Column, Model, Table } from 'sequelize-typescript'

export enum Salutation {
  MR = 'Mr.',
  MRS = 'Mrs.',
  MS = 'Ms.',
  DR = 'Dr.',
  PROF = 'Prof.'
}

interface TeacherModelProperties {
  id: number
  firstName: string
  lastName: string
  salutation?: Salutation
}

interface TeacherModelCreationProperties extends Optional<TeacherModelProperties, 'id'> {
}

@Table({ tableName: 'teacher' })
export class TeacherModel extends Model<TeacherModelProperties, TeacherModelCreationProperties> {
  @Column(DataTypes.STRING)
  firstName: string

  @Column(DataTypes.STRING)
  lastName: string

  @AllowNull
  @Column(DataTypes.ENUM({ values: Object.values(Salutation) }))
  salutation: Salutation
}
