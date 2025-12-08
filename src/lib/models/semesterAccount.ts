"use server"
import mongoose from "mongoose"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { Semester, SemesterCombo } from "../common"
import dbConnect from "../mongodb"
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import { refresh } from "next/cache"
import { Budget } from "./budget"
import { StudentAccount } from "./studentAccount"
import { SalaryAccount } from "./salaryAccount"

/* BEGIN OVERHEAD CHARGE */

export interface I_OverheadCharge {
    charge: number,
    description: string
}

const OverheadChargesSchema = new mongoose.Schema<I_OverheadCharge>({
    charge: Number,
    description: String
})

const OverheadCharge = mongoose.models.OverheadCharge || mongoose.model<I_OverheadCharge>("OverheadCharge", OverheadChargesSchema, "OverheadCharges")

/* BEGIN TRAVEL PROFILE */

export interface I_TravelProfile {
    perDiem: number,
    airfare: number,
    lodging: number
}

const TravelProfileSchema = new mongoose.Schema<I_TravelProfile>({
    perDiem: Number,
    airfare: Number,
    lodging: Number
})

const TravelProfile =  mongoose.models.TravelProfile || mongoose.model<I_TravelProfile>("TravelProfile", TravelProfileSchema, "TravelProfiles")

/* BEGIN SEMESTER ACCOUNT */

export interface I_SemesterAccountFK {
    budgetID: string,
}

export interface I_SemesterAccountPK extends SemesterCombo, I_SemesterAccountFK {}

export interface I_SemesterAccount extends I_SemesterAccountPK {

    // incoming,
    // outgoing,
    inStateTuitionRate: number,
    outOfStateTuitionRate: number,
    tuitionIncrease: number,
    facultyFBR: number,
    studentFBR: number,
    postDocFBR: number,
    // incomingTuition - calculated,
    // aidAllocated - calculated

    travelProfileID?: string,
    overheadChargeID?: string
}

const SemesterAccountSchema = new mongoose.Schema<I_SemesterAccount>({
    semester: String,
    year: Number,
    budgetID: mongoose.Types.ObjectId,
    inStateTuitionRate: Number,
    outOfStateTuitionRate: Number,
    tuitionIncrease: Number,
    facultyFBR: Number,
    studentFBR: Number,
    postDocFBR: Number,
    travelProfileID: mongoose.Types.ObjectId,
    overheadChargeID: mongoose.Types.ObjectId
})

const SemesterAccount = mongoose.models.SemesterAccount || mongoose.model<I_SemesterAccount>("SemesterAccount", SemesterAccountSchema, "SemesterAccounts")

/* BEGIN PUBLIC INTERFACE */

export interface SemesterAccountCombo {
    semesterAccount: I_SemesterAccount,
    travelProfile: I_TravelProfile,
    overheadCharge: I_OverheadCharge
}

/*
const SemesterAccountAPI: ForeignKeyModelAPI<
    I_SemesterAccountPK,
    SemesterAccountCombo,
    I_SemesterAccountFK
> = {
    create: async (val, fk) => {
        await dbConnect()

        const travelProfile = new TravelProfile(val.travelProfile)
        await travelProfile.save()
        const oCharge = new OverheadCharge(val.overheadCharge)
        await oCharge.save()

        const newAcc = new SemesterAccount({
            semester: val.semesterAccount.semester,
            year: val.semesterAccount.year,
            budgetID: fk.budgetID,

            inStateTuitionRate: val.semesterAccount.inStateTuitionRate,
            outOfStateTuitionRate: val.semesterAccount.outOfStateTuitionRate,
            tuitionIncrease: val.semesterAccount.tuitionIncrease,
            facultyFBR: val.semesterAccount.facultyFBR,
            studentFBR: val.semesterAccount.studentFBR,
            postDocFBR: val.semesterAccount.postDocFBR,
            studentAccounts: [],
            salaryAccounts: [],
            travelProfileID: travelProfile._id,
            overheadChargeID: oCharge._id
        })
        await newAcc.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${val.semesterAccount.budgetID}/SemesterRates/${val.semesterAccount.year}/${val.semesterAccount.semester}`)

    },
    delete: async (pk, fk) => {
        await dbConnect()

        const acc = await SemesterAccount.findOne(pk).exec()

        await TravelProfile.findByIdAndDelete(acc.travelProfileID)
        await OverheadCharge.findByIdAndDelete(acc.overheadChargeID)
        await SemesterAccount.findByIdAndDelete(acc._id)


        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${fk.budgetID}/SemesterRates`)
    },
    modify: async (val) => {
        await dbConnect()

        const acc = await SemesterAccount.findOne({budgetID: val.semesterAccount.budgetID, semester: val.semesterAccount.semester, year: val.semesterAccount.year}).exec()

        acc.inStateTuitionRate = val.semesterAccount.inStateTuitionRate
        acc.outOfStateTuitionRate = val.semesterAccount.outOfStateTuitionRate
        acc.tuitionIncrease = val.semesterAccount.tuitionIncrease
        acc.facultyFBR = val.semesterAccount.facultyFBR
        acc.studentFBR = val.semesterAccount.studentFBR
        acc.postDocFBR = val.semesterAccount.postDocFBR

        await acc.save()

        const travelProfile = await TravelProfile.findById(acc.travelProfileID).exec()
        travelProfile.perDiem = val.travelProfile.perDiem
        travelProfile.airfare = val.travelProfile.airfare
        travelProfile.lodging = val.travelProfile.lodging

        await travelProfile.save()

        const overheadCharge = await OverheadCharge.findById(acc.overheadChargeID).exec()
        overheadCharge.charge = val.overheadCharge.charge

        await overheadCharge.save()

        revalidatePath("/dashboard", "layout")
    },
    getOne: async (pk) => {
        await dbConnect()

        // todo: sanitize
        const semesterAccount = await SemesterAccount.findOne(pk).exec()
        const travelProfile = await TravelProfile.findById(semesterAccount.travelProfileID).exec()
        const overheadCharge = await OverheadCharge.findById(semesterAccount.overheadChargeID).exec()

        return {
            semesterAccount,
            travelProfile,
            overheadCharge
        }
    },
    getAll: async (fk) => {
        await dbConnect()

        const accs = await SemesterAccount.find(fk).exec()

        // todo: sanitize
        return accs
    },
}
*/

export async function create(
    val: SemesterAccountCombo,
    fk: I_SemesterAccountFK
): Promise<void> {
    await dbConnect()

    const travelProfile = new TravelProfile(val.travelProfile)
    await travelProfile.save()

    const oCharge = new OverheadCharge(val.overheadCharge)
    await oCharge.save()

    const newAcc = new SemesterAccount({
        semester: val.semesterAccount.semester,
        year: val.semesterAccount.year,
        budgetID: fk.budgetID,

        inStateTuitionRate: val.semesterAccount.inStateTuitionRate,
        outOfStateTuitionRate: val.semesterAccount.outOfStateTuitionRate,
        tuitionIncrease: val.semesterAccount.tuitionIncrease,
        facultyFBR: val.semesterAccount.facultyFBR,
        studentFBR: val.semesterAccount.studentFBR,
        postDocFBR: val.semesterAccount.postDocFBR,

        studentAccounts: [],
        salaryAccounts: [],
        travelProfileID: travelProfile._id,
        overheadChargeID: oCharge._id
    })

    await newAcc.save()

    revalidatePath("/dashboard", "layout")

    redirect(
        `/dashboard/${val.semesterAccount.budgetID}/SemesterRates/${val.semesterAccount.year}/${val.semesterAccount.semester}`
    )
}

export async function del(
    pk: I_SemesterAccountPK,
    fk: I_SemesterAccountFK
): Promise<void> {
    await dbConnect()

    const acc = await SemesterAccount.findOne(pk).exec()

    // this needs to also delete all associated semester/salary accounts!

    const budget = JSON.parse(JSON.stringify(await Budget.findById(pk.budgetID).exec()))
    console.log(budget)

    const promises = []

    for (let i = 0; i < budget.students.length; i++) {
        console.log(budget.students[i])
        promises.push(StudentAccount.findOneAndDelete({individualID: budget.students[i], semester: pk.semester, year: pk.year}).exec())
        promises.push(SalaryAccount.findOneAndDelete({individualID: budget.students[i], semester: pk.semester, year: pk.year}).exec())
    }

    for (let i = 0; i < budget.faculty.length; i++) {
        console.log(budget.faculty[i])
        promises.push(SalaryAccount.findOneAndDelete({individualID: budget.faculty[i], semester: pk.semester, year: pk.year}).exec())
    }

    promises.push(TravelProfile.findByIdAndDelete(acc.travelProfileID))
    promises.push(OverheadCharge.findByIdAndDelete(acc.overheadChargeID))
    promises.push(SemesterAccount.findByIdAndDelete(acc._id))

    // this is a little neat optimization!
    await Promise.all(promises)

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${fk.budgetID}/SemesterRates`)
}

export async function modify(
    val: SemesterAccountCombo
): Promise<void> {
    await dbConnect()

    const acc = await SemesterAccount.findOne({budgetID: val.semesterAccount.budgetID, semester: val.semesterAccount.semester, year: val.semesterAccount.year}).exec()

    console.log(acc)

    acc.inStateTuitionRate = val.semesterAccount.inStateTuitionRate
    acc.outOfStateTuitionRate = val.semesterAccount.outOfStateTuitionRate
    acc.tuitionIncrease = val.semesterAccount.tuitionIncrease
    acc.facultyFBR = val.semesterAccount.facultyFBR
    acc.studentFBR = val.semesterAccount.studentFBR
    acc.postDocFBR = val.semesterAccount.postDocFBR

    const travelProfile = await TravelProfile.findById(acc.travelProfileID).exec()
    travelProfile.perDiem = val.travelProfile.perDiem
    travelProfile.airfare = val.travelProfile.airfare
    travelProfile.lodging = val.travelProfile.lodging

    const overheadCharge = await OverheadCharge.findById(acc.overheadChargeID).exec()
    overheadCharge.charge = val.overheadCharge.charge

    console.log(await acc.save())
    console.log(await travelProfile.save())
    console.log(await overheadCharge.save())

    revalidatePath("/dashboard", "layout")
    refresh()
}

export async function getOne(
    pk: I_SemesterAccountPK
): Promise<SemesterAccountCombo | undefined> {
    await dbConnect()

    // todo: sanitize
    const semesterAccount = await SemesterAccount.findOne(pk).exec()
    const travelProfile = await TravelProfile.findById(semesterAccount.travelProfileID).exec()
    const overheadCharge = await OverheadCharge.findById(semesterAccount.overheadChargeID).exec()

    // remove these ids from the return since they're not necessary
    const {travelProfileID, overheadChargeID, ...semesterAccRet} = JSON.parse(JSON.stringify(semesterAccount))

    // console.log(semesterAccount)
    return JSON.parse(JSON.stringify({
        semesterAccount: semesterAccRet,
        travelProfile,
        overheadCharge
    }))
}

export async function getAll(
    fk: I_SemesterAccountFK
): Promise<SemesterAccountCombo[]> {
    await dbConnect()

    const accs = await SemesterAccount.find(fk).exec()


    const accsPaired = await Promise.all(accs.map(async (x) => {
        return await getOne({budgetID: x.budgetID, semester: x.semester, year: x.year})
    }))

    return JSON.parse(JSON.stringify(accsPaired))
}
