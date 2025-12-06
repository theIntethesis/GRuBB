"use server"
import mongoose from "mongoose"
import ModelAPI from "./_modelAPI"

export interface I_SalaryAccount {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage
    semester: "Fall" | "Spring", // i'll type this later
    year: number,
    individual_id: string
    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}

const SalaryAccountSchema = new mongoose.Schema<I_SalaryAccount>({
    rate: Number,
    rateTimeUnit: String,
    percentFTE: Number,
    semester: String,
    year: Number,
    individual_id: mongoose.Types.ObjectId
})

export const SalaryAccount = mongoose.models.SalaryAccount || mongoose.model<I_SalaryAccount>("SalaryAccount", SalaryAccountSchema, "SalaryAccounts")

const SalaryAccountAPI: ModelAPI<
    {semester: string, year: number, individual_id: string},
    I_SalaryAccount
> = {
    create: async (val) => {

    },
    delete: async (pk) => {

    },
    modify: async (val) => {

    },
    getOne: async (pk) => {

    },
    getAll: async () => {

    },
}