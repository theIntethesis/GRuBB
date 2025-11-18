"use server"

import { Budget, InstitutionalAccount } from "./models"
import dbConnect from "./mongodb"

export async function createBudget(
    name: string,
    pi: string,
    type: "primary" | "secondary" | "parallel"
){
    await dbConnect()

    const newBudget = new Budget({
        name: name,
        pi,
        coPI: [],
        type: type
    })
    await newBudget.save()

    return newBudget._id.toJSON()
}

export async function modifyBudget(
    budgetID: string,
    modifiedBudget: any
) {
    await dbConnect()
    const res = await Budget.findByIdAndUpdate(budgetID, {
        name: modifiedBudget.name,
        pi: modifiedBudget.pi,
        coPI: modifiedBudget.coPI
    })


}