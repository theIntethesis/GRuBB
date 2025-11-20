"use server"
import { Budget } from "@/lib/models"
import dbConnect from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { revalidatePath} from 'next/cache'

export async function getBudget(budgetID: string) {
    await dbConnect()
    try {
        const budget = await Budget.findById(budgetID).lean()
        if (budget != null) {
            budget._id = budget._id.toJSON()
        }
        budget.students = budget.students.map(y => {
            return y.toJSON()
        })
        budget.faculty = budget.faculty.map(y => {
            return y.toJSON()
        });
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

        x.students = x.students.map(y => {
            return y.toJSON()
        })
        x.faculty = x.faculty.map(y => {
            return y.toJSON()
        });
    })

    console.log(allBudgets)

    return allBudgets
}


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

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${newBudget._id.toJSON()}/Student`)
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
