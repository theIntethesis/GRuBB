"use server"
import mongoose from "mongoose"
import { I_Individual, Individual } from "./_individual"
import { Budget } from "./budget"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface I_Student {
    outOfState: boolean,
    individual_id: string // uid from Individual
}

const StudentSchema = new mongoose.Schema<I_Student>({
    outOfState: Boolean,
    individual_id: mongoose.Types.ObjectId
})

export const Student = mongoose.models.Student || mongoose.model<I_Student>("Student", StudentSchema, "Students")

const StudentAPI: ForeignKeyModelAPI<
    {individual_id: string},
    {individual: I_Individual, student: I_Student},
    {budgetID: string}
> = {
    getOne: async ({individual_id}) => {
        const student = (await Student.find({individual_id: individual_id}))[0] // individualID is unique
        const ind = await Individual.findById(individual_id);

        return {
            individual: ind,
            student
        }
    },

    getAll: async ({budgetID}) => {
        const budget = await Budget.findById(budgetID)
        let students = []

        for (let i in budget.students) {
            const individual_id = budget.students[i].toJSON();
            const stu = await StudentAPI.getOne({individual_id})
            if (stu != undefined) students.push(stu)
        }

        //console.log(students)
        return students;
    },
    create: async (input, fk) => {

        const individual = new Individual({
            name: input.individual.name
        })
        await individual.save()

        const student = new Student({
            individual_id: individual._id,
            outOfState: input.student.outOfState
        })
        await student.save()

        const budget = await Budget.findById(fk.budgetID)
        budget.students.push(individual._id)

        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${fk.budgetID}/Student/${student.individual_id.toJSON()}`)
    },
    modify: async (input) => {
        const student = await Student.findOne({individual_id: input.student.individual_id})
        student.outOfState = input.student.outOfState
        await student.save()

        const individual = await Individual.findById(input.student.individual_id)
        individual.name = input.individual.name
        await individual.save()


        revalidatePath("/dashboard", "layout")
    },
    // budgetID is required
    delete: async ({individual_id}, {budgetID}) => {
        await Student.deleteOne({individual_id})
        await Individual.findByIdAndDelete(individual_id)

        const budget = await Budget.findById(budgetID)
        budget.students.pull(individual_id)
        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${budgetID}/Student`)
    }
}

export default StudentAPI