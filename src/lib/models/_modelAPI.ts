"use server"

export default interface ModelAPI<PrimaryKey, RowType> {
    // getOne: ({ budgetID }: { budgetID: string; }) => Promise<undefined>;
    getOne: (pk: PrimaryKey) => Promise<RowType | undefined>
    getAll: () => Promise<RowType[]>
    create: (val: RowType) => Promise<void>
    modify: (val: RowType) => Promise<void>
    delete: (pk: PrimaryKey) => Promise<void>
}

export interface ForeignKeyModelAPI<PrimaryKey, RowType, ForeignKey> {
    // getOne: ({ budgetID }: { budgetID: string; }) => Promise<undefined>;
    getOne: (pk: PrimaryKey) => Promise<RowType | undefined>
    getAll: (fk: ForeignKey) => Promise<RowType[]>
    create: (val: RowType, fk: ForeignKey) => Promise<void>
    modify: (val: RowType) => Promise<void>
    delete: (pk: PrimaryKey, fk: ForeignKey) => Promise<void>
}
