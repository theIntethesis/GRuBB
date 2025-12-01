"use server"

import { SalaryAccount, Student, StudentAccount } from "@/lib/models"
import { revalidatePath } from "next/cache"

export async function getAllStudentAccounts(individual_id: string) {
    const accounts = await StudentAccount.find({individual_id: individual_id}).lean()

    // console.log(accounts)

    return accounts.map(x => {
        return {
            semester: x.semester,
            year: x.year,
            individual_id: x.individual_id.toJSON(),
            aidRecieved: x.aidRecieved
        }
    })
}


export async function createStudentAccount(
    individual_id: string,
    semester: "Fall" | "Spring",
    year: number,
    aidRecieved: number
) {

    const account = new StudentAccount({
        semester,
        year,
        individual_id: individual_id,
        aidRecieved
    })

    await account.save()

    revalidatePath("/dashboard", "layout")

}


export async function getAllSalaryAccounts(individual_id: string) {
    const accounts = await SalaryAccount.find({individual_id: individual_id}).lean()

    console.log(accounts)

    return accounts.map(x => {
        return {
            rate: x.rate,
            percentFTE: x.percentFTE,
            semester: x.semester,
            year: x.year,
            individual_id: x.individual_id.toJSON()
        }
    })
}


export async function createSalaryAccount(
    individual_id: string,
    semester: "Fall" | "Spring",
    year: number,
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number
) {
    const account = new SalaryAccount({
        rate,
        rateTimeUnit,
        percentFTE,
        semester,
        year,
        individual_id
    })

    await account.save()
}
