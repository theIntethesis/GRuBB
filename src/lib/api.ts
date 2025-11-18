"use server"

import { Budget, InstitutionalAccount } from "./models"

export async function createBudget(
    name: string,
    pi: string,
    type: "primary" | "secondary" | "parallel"
){
    const newBudget = new Budget({
        name: name,
        pi,
        coPI: [],
        type: type
    })
    await newBudget.save()

    return newBudget._id.toJSON()
}