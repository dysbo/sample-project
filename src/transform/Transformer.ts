export interface Transformer<DaoType, DtoType> {
  toDataTransferObject(dao: DaoType): DtoType

  toDataAccessObject(dto: DtoType): DaoType
}
