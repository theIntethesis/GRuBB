"use server"
import dbConnect from "@/lib/mongodb";
import { Budget } from "@/lib/models";

export async function getBudget(budgetID) {
    await dbConnect()
    try {
        const budget = await Budget.findById(budgetID).lean()
        if (budget != null) {
            budget._id = budget._id.toJSON()
        }
        return budget
    }
    catch (e) {
        console.log(e)
        return null
    }
}

export async function getAllBudgets() {
    await dbConnect()
    const allBudgets = await Budget.find({}).lean()
    allBudgets.forEach(x => {
        x._id = x._id.toJSON()
    })

    return allBudgets
}