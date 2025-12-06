"use server"
import mongoose from "mongoose"
import ModelAPI from "./_modelAPI"

export interface I_SemesterAccount {
    semester: "Fall" | "Spring",
    year: number,
    budgetID: string,
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

    travelProfile: string,
    overheadCharge: string
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
    travelProfile: mongoose.Types.ObjectId,
    overheadCharge: mongoose.Types.ObjectId
})

const SemesterAccount =  mongoose.models.SemesterAccount || mongoose.model<I_SemesterAccount>("SemesterAccount", SemesterAccountSchema, "SemesterAccounts")

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

/* BEGIN PUBLIC INTERFACE */

export interface SemesterAccountCombo {
    semesterAccount: I_SemesterAccount,
    travelProfile: I_TravelProfile,
    overheadCharge: I_OverheadCharge
}

const SemesterAccountAPI: ModelAPI<
    {semester: string, year: number, budgetID: string},
    SemesterAccountCombo
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