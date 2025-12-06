"use server"
import mongoose from "mongoose"
import ModelAPI from "./modelAPI"

export interface I_Individual {
    name: string,
    _id?: string // do not set
}

const IndividualSchema = new mongoose.Schema<I_Individual>({
    name: String
})

export const Individual = mongoose.models.Individual || mongoose.model<I_Individual>("Individual", IndividualSchema, "Individuals")
