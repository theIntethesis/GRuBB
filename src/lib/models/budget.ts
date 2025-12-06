"use server"
import mongoose from "mongoose"
import dbConnect from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache'
import ModelAPI from "./_modelAPI"

export interface I_Budget {
    name: string,
    pi: string,
    coPI?: string[],
    students?: string[],
    faculty?: string[],
    _id?: string,
    type: "primary" | "secondary" | "parallel"
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
    delete: async ({_id}) => {

    }
}

export default BudgetAPI