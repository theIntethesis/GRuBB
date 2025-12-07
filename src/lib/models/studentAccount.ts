"use server"
import mongoose from "mongoose"
import { ForeignKeyModelAPI} from "./_modelAPI"
import { revalidatePath } from "next/cache"
import { Semester, SemesterCombo } from "../common"
import dbConnect from "../mongodb"

interface I_StudentAccount_FK {
    individualID: string
}

interface I_StudentAccount_PK extends I_StudentAccount_FK, SemesterCombo {}

export interface I_StudentAccount extends I_StudentAccount_PK {
    aidRecieved: number
}

const StudentAccountSchema = new mongoose.Schema<I_StudentAccount>({
    semester: String,
    year: Number,
    individualID: mongoose.Types.ObjectId,
    aidRecieved: Number
})

export const StudentAccount = mongoose.models.StudentAccount || mongoose.model<I_StudentAccount>("StudentAccount", StudentAccountSchema, "StudentAccounts")

/*
const StudentAccountAPI: ForeignKeyModelAPI<
    I_StudentAccount_PK,
    I_StudentAccount,
    I_StudentAccount_FK
> = {
    create: async (val, fk) => {
        await dbConnect()
        const account = new StudentAccount(val)
        await account.save()

        revalidatePath("/dashboard", "layout")
    },
    delete: async (pk, fk) => {
        await dbConnect()

        revalidatePath("/dashboard", "layout")
    },
    modify: async (val) => {
        await dbConnect()
        const acc = await StudentAccount.findOne(val as I_StudentAccount_PK).exec()
        acc.aidRecieved = val.aidRecieved

        await acc.save()
        revalidatePath("/dashboard", "layout")
    },
    getOne: async (pk) => {return undefined},
    getAll: async (fk) => {
        await dbConnect()
        const accs = await StudentAccount.find(fk).exec()

        // todo: sanitize
        return accs
    },
}
*/

export async function create(
    val: I_StudentAccount,
    fk: I_StudentAccount_FK
): Promise<void> {
    await dbConnect()

    const account = new StudentAccount(val)
    await account.save()

    revalidatePath("/dashboard", "layout")
}

export async function del(
    pk: I_StudentAccount_PK,
    fk: I_StudentAccount_FK
): Promise<void> {
    await dbConnect()

    revalidatePath("/dashboard", "layout")
}

export async function modify(
    val: I_StudentAccount
): Promise<void> {
    await dbConnect()

    const acc = await StudentAccount.findOne({individualID: val.individualID}).exec()
    console.log(acc)

    acc.aidRecieved = val.aidRecieved
    await acc.save()

    revalidatePath("/dashboard", "layout")
}

export async function getOne(
    pk: I_StudentAccount_PK
): Promise<I_StudentAccount | undefined> {
    return undefined
}

export async function getAll(
    fk: I_StudentAccount_FK
): Promise<I_StudentAccount[]> {
    await dbConnect()

    const accs = await StudentAccount.find(fk).exec()

    // todo: sanitize
    return JSON.parse(JSON.stringify(accs))
}
