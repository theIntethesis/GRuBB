"use server"
import mongoose from "mongoose"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { RateTimeUnit, Semester, SemesterCombo } from "../common"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"
import dbConnect from "../mongodb"

interface I_SalaryAccount_FK {
    individualID: string
}
interface I_SalaryAccount_PK extends I_SalaryAccount_FK, SemesterCombo {}

export interface I_SalaryAccount  extends I_SalaryAccount_PK{
    rate: number,
    rateTimeUnit: RateTimeUnit,
    percentFTE: number, // Percentage

    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}

const SalaryAccountSchema = new mongoose.Schema<I_SalaryAccount>({
    rate: Number,
    rateTimeUnit: String,
    percentFTE: Number,
    semester: String,
    year: Number,
    individualID: mongoose.Types.ObjectId
})

export const SalaryAccount = mongoose.models.SalaryAccount || mongoose.model<I_SalaryAccount>("SalaryAccount", SalaryAccountSchema, "SalaryAccounts")

/*
const SalaryAccountAPI: ForeignKeyModelAPI<
    I_SalaryAccount_PK,
    I_SalaryAccount,
    I_SalaryAccount_FK
> = {
    create: async (val, fk) => {
        await dbConnect()

        const acc = new SalaryAccount(val)
        await acc.save()

        revalidatePath("/dashboard", "layout")
    },
    delete: async (pk, fk) => {
        await dbConnect()

        revalidatePath("/dashboard", "layout")
    },
    modify: async (val) => {
        await dbConnect()
        const acc = await SalaryAccount.findOne(val as I_SalaryAccount_PK).exec()
        acc.rate = val.rate
        acc.rateTimeUnit = val.rateTimeUnit
        acc.percentFTE = val.percentFTE
        await acc.save()

        revalidatePath("/dashboard", "layout")
    },
    getOne: async (pk) => {return undefined},
    getAll: async (fk) => {
        await dbConnect()
        const accs = await SalaryAccount.find(fk).exec()

        // todo: sanitize
        return accs
    },
}
*/

export async function create(
    val: I_SalaryAccount,
    fk: I_SalaryAccount_FK
): Promise<void> {
    await dbConnect()

    const acc = new SalaryAccount(val)
    await acc.save()

    revalidatePath("/dashboard", "layout")
    refresh()
}

export async function del(
    pk: I_SalaryAccount_PK,
    fk: I_SalaryAccount_FK
): Promise<void> {
    await dbConnect()

    await SalaryAccount.deleteOne({...pk, ...fk})

    revalidatePath("/dashboard", "layout")
    refresh()
}

export async function modify(
    val: I_SalaryAccount
): Promise<void> {
    await dbConnect()

    const acc = await SalaryAccount.findOne({individualID: val.individualID}).exec()

    acc.rate = val.rate
    acc.rateTimeUnit = val.rateTimeUnit
    acc.percentFTE = val.percentFTE

    await acc.save()

    revalidatePath("/dashboard", "layout")
    refresh()
}

export async function getOne(
    pk: I_SalaryAccount_PK
): Promise<I_SalaryAccount | undefined> {
    return undefined
}

export async function getAll(
    fk: I_SalaryAccount_FK
): Promise<I_SalaryAccount[]> {
    await dbConnect()

    const accs = await SalaryAccount.find(fk).exec()

    // todo: sanitize
    return JSON.parse(JSON.stringify(accs))
}
