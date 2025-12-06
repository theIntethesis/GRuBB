"use server"
import mongoose from "mongoose"
import ModelAPI from "./_modelAPI"

export interface I_StudentAccount {
    // tuition - to be looked up
    semester: "Fall" | "Spring", // i'll type this later
    year: number,
    individual_id: string, // individual ID
    aidRecieved: number,
}

const StudentAccountSchema = new mongoose.Schema<I_StudentAccount>({
    semester: String,
    year: Number,
    individual_id: mongoose.Types.ObjectId,
    aidRecieved: Number
})

export const StudentAccount = mongoose.models.StudentAccount || mongoose.model<I_StudentAccount>("StudentAccount", StudentAccountSchema, "StudentAccounts")


const StudentAccountAPI: ModelAPI<
    {semester: string, year: number, individual_id: string},
    I_StudentAccount
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