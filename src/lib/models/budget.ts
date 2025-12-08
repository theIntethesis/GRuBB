"use server"
import mongoose from "mongoose"
import dbConnect from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache'
import ModelAPI from "./_modelAPI"
import { BudgetType } from "../common"

export interface I_Budget {
    name: string,
    pi: string,
    type: BudgetType,

    coPI?: string[],
    students?: string[],
    faculty?: string[],
    _id?: string,

}

const BudgetSchema = new mongoose.Schema<I_Budget>({
    name: String,
    pi: String,
    coPI: [String],
    type: String,
    students: [mongoose.Types.ObjectId],
    faculty: [mongoose.Types.ObjectId],
})

export const Budget = mongoose.models.Budget || mongoose.model<I_Budget>("Budget", BudgetSchema, "Budgets")


/*
const BudgetAPI: ModelAPI<{_id: string}, I_Budget> = {
    getOne: async ({_id}) => {
        await dbConnect()
        try {
            const budget = await Budget.findById(_id).exec()

            if (budget != null) {
                budget._id = budget._id.toJSON()

                budget.students = budget.students.map(y => {
                    return y.toJSON()
                })
                budget.faculty = budget.faculty.map(y => {
                    return y.toJSON()
                });

                // [TODO fix]
                //return budget
            }

            return undefined
        }
        catch (e) {
            console.log(e)
            return undefined
        }
    },
    getAll: async () => {
        await dbConnect()
        const allBudgets = await Budget.find({}).exec()

        allBudgets.forEach(x => {
            x._id = x._id.toJSON()

            // hey there is an error here
            x.students = x.students.map(y => {
                return y.toJSON()
            })
            x.faculty = x.faculty.map(y => {
                return y.toJSON()
            });
        })

        return []
    },
    create: async (val: I_Budget) => {
        await dbConnect()

        const newBudget = new Budget(val)
        await newBudget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${newBudget._id.toJSON()}/Student`)
    },
    modify: async (val: I_Budget) => {
        await dbConnect()
        const res = await Budget.findByIdAndUpdate(val._id, {
            name: val.name,
            pi: val.pi,
            coPI: val.coPI
        })

        revalidatePath("/dashboard", "layout")
    },
    delete: async (pk) => {return undefined}
}
*/

export async function getOne(
    { _id }: { _id: string }
): Promise<I_Budget | undefined> {
    await dbConnect()

    try {
        const budget = await Budget.findById(_id).exec()

        if (budget != null) {
            return JSON.parse(JSON.stringify(budget))
        }

        return undefined
    } catch (e) {
        console.log(e)
        return undefined
    }
}


export async function getAll(): Promise<I_Budget[]> {
    await dbConnect()

    const allBudgets = await Budget.find({}).exec()

    return JSON.parse(JSON.stringify(allBudgets))
}


export async function create(val: I_Budget): Promise<void> {
    await dbConnect()

    const newBudget = new Budget(val)
    await newBudget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${newBudget._id.toJSON()}`)
}


export async function modify(val: I_Budget): Promise<void> {
    await dbConnect()

    await Budget.findByIdAndUpdate(val._id, {
        name: val.name,
        pi: val.pi,
        coPI: val.coPI
    })

    revalidatePath("/dashboard", "layout")
}


export async function del(
    pk: { _id: string }
): Promise<void> {

    return undefined
}
