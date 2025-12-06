"use server"
import mongoose from "mongoose"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { I_Individual, Individual } from "./_individual"
import { Budget } from "./budget"
import { refresh, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface I_Faculty  {
    role: "faculty" | "staff" | "postdoc",
    individual_id?: string // uid from Individual
}

const FacultySchema = new mongoose.Schema<I_Faculty>({
    role: String,
    individual_id: mongoose.Types.ObjectId
})

const Faculty =  mongoose.models.Faculty || mongoose.model<I_Faculty>("Faculty", FacultySchema, "FacultyMembers")

const FacultyAPI: ForeignKeyModelAPI<
    {individual_id: string},
    {faculty: I_Faculty, individual: I_Individual},
    {budgetID: string}
> = {
    getOne: async ({individual_id}) => {
        const ind = await Individual.findById(individual_id);
        const faculty = await Faculty.findOne({individual_id: individual_id})
        //console.log(individual_id)
        //console.log(ind)

        return {
            individual: ind,
            faculty: faculty,
        }
    },
    getAll: async ({budgetID}) => {
        const budget = await Budget.findById(budgetID)
        let faculty = []
        for (let i in budget.faculty) {
            const individual_id = budget.faculty[i].toJSON();

            const fac = await FacultyAPI.getOne(individual_id)
            if (fac != undefined) faculty.push(fac);
        }
        return faculty;
    },
    create: async (input, fk) => {
        const individual = new Individual({
            name: input.individual.name
        })
        await individual.save()
        const faculty = new Faculty({
            individual_id: individual._id,
            role: input.faculty.role
        })
        await faculty.save()
        const budget = await Budget.findById(fk.budgetID)

        budget.faculty.push(individual._id)
        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${fk.budgetID}/Faculty/${faculty.individual_id.toJSON()}`)
    },
    modify: async (input) => {
        const faculty = await Faculty.findOne({indiviudal_id: input.faculty.individual_id})
        faculty.role = input.faculty.role
        await faculty.save()

        const individual = await Individual.findById(input.faculty.individual_id)
        individual.name = input.individual.name

        await individual.save()


        revalidatePath("/dashboard", "layout")
        refresh()
    },
    delete: async ({individual_id}, {budgetID}) => {
        // make sure to delete the student, the individual, and all accounts connected to them
        await Faculty.deleteOne({individual_id})
        await Individual.findByIdAndDelete(individual_id)

        const budget = await Budget.findById(budgetID)
        budget.faculty.pull(individual_id)
        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${budgetID}/Faculty`)
    }
}

export default FacultyAPI