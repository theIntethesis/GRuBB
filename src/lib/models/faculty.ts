"use server"
import mongoose from "mongoose"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { I_Individual, Individual } from "./_individual"
import { Budget } from "./budget"
import { refresh, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { FacultyRole } from "../common"
import dbConnect from "../mongodb"

interface I_Faculty_PK {
    individualID: string // uid from Individual
}

interface I_Faculty_Data {
    role: FacultyRole,
}

export interface I_Faculty extends I_Faculty_PK, I_Faculty_Data {}

const FacultySchema = new mongoose.Schema<I_Faculty>({
    role: String,
    individualID: mongoose.Types.ObjectId
})

const Faculty =  mongoose.models.Faculty || mongoose.model<I_Faculty>("Faculty", FacultySchema, "FacultyMembers")

/*
const FacultyAPI: ForeignKeyModelAPI<
    I_Faculty_PK,
    {faculty: I_Faculty, individual: I_Individual},
    {budgetID: string}
> = {
    getOne: async ({individualID}) => {
        await dbConnect()
        const ind = await Individual.findById(individualID);
        const faculty = await Faculty.findOne({individualID: individualID})
        //console.log(individualID)
        //console.log(ind)

        return {
            individual: ind,
            faculty: faculty,
        }
    },
    getAll: async ({budgetID}) => {
        await dbConnect()
        const budget = await Budget.findById(budgetID)
        let faculty = []
        for (let i in budget.faculty) {
            const individualID = budget.faculty[i].toJSON();

            const fac = await FacultyAPI.getOne(individualID)
            if (fac != undefined) faculty.push(fac);
        }
        return faculty;
    },
    create: async (input, fk) => {
        await dbConnect()
        const individual = new Individual({
            name: input.individual.name
        })
        await individual.save()
        const faculty = new Faculty({
            individualID: individual._id,
            role: input.faculty.role
        })
        await faculty.save()
        const budget = await Budget.findById(fk.budgetID)

        budget.faculty.push(individual._id)
        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${fk.budgetID}/Faculty/${faculty.individualID.toJSON()}`)
    },
    modify: async (input) => {
        await dbConnect()
        const faculty = await Faculty.findOne({indiviudal_id: input.faculty.individualID})
        faculty.role = input.faculty.role
        await faculty.save()

        const individual = await Individual.findById(input.faculty.individualID)
        individual.name = input.individual.name

        await individual.save()


        revalidatePath("/dashboard", "layout")
        refresh()
    },
    delete: async ({individualID}, {budgetID}) => {
        // await dbConnect()
        // // make sure to delete the student, the individual, and all accounts connected to them
        // await Faculty.deleteOne({individualID})
        // await Individual.findByIdAndDelete(individualID)

        // const budget = await Budget.findById(budgetID)
        // budget.faculty.pull(individualID)
        // await budget.save()

        // revalidatePath("/dashboard", "layout")
        // redirect(`/dashboard/${budgetID}/Faculty`)
    }
}
*/

// ---- getOne ----
export async function getOne(
    { individualID }: I_Faculty_PK
): Promise<{ faculty: I_Faculty; individual: I_Individual } | undefined> {
    await dbConnect()

    const individual = await Individual.findById(individualID)
    const faculty = await Faculty.findOne({ individualID })

    return {
        individual: individual,
        faculty: faculty,
    }
}


// ---- getAll ----
export async function getAll(
    { budgetID }: { budgetID: string }
): Promise<Array<{ faculty: I_Faculty; individual: I_Individual }>> {
    await dbConnect()

    const budget = await Budget.findById(budgetID)
    const facultyArr = []

    for (let i in budget.faculty) {
        const individualID = budget.faculty[i].toJSON()

        // Call the exported getFacultyOne instead of API.getOne
        const fac = await getOne({ individualID })

        if (fac != undefined) facultyArr.push(fac)
    }

    return facultyArr
}

// ---- create ----
export async function create(
    input: { faculty: I_Faculty; individual: I_Individual },
    fk: { budgetID: string }
): Promise<void> {
    await dbConnect()

    const individual = new Individual({
        name: input.individual.name
    })
    await individual.save()

    const faculty = new Faculty({
        individualID: individual._id,
        role: input.faculty.role
    })
    await faculty.save()

    const budget = await Budget.findById(fk.budgetID).exec()
    budget.faculty.push(individual._id)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${fk.budgetID}/Faculty/${faculty.individualID.toJSON()}`)
}

// ---- modify ----
export async function modify(
    input: { faculty: I_Faculty; individual: I_Individual }
): Promise<void> {
    await dbConnect()

    const faculty = await Faculty.findOne({
        indiviudalID: input.faculty.individualID // (keeping your typo: indiviudal_id)
    }).exec()

    faculty.role = input.faculty.role
    await faculty.save()

    const individual = await Individual.findById(input.faculty.individualID).exec()
    individual.name = input.individual.name
    await individual.save()

    revalidatePath("/dashboard", "layout")
    refresh()
}


// ---- delete ----
export async function del(
    { individualID }: { individualID: string },
    { budgetID }: { budgetID: string }
): Promise<void> {

    // Keeping your commented-out original logic:

    // await dbConnect()
    // await Faculty.deleteOne({ individualID })
    // await Individual.findByIdAndDelete(individualID)

    // const budget = await Budget.findById(budgetID)
    // budget.faculty.pull(individualID)
    // await budget.save()

    // revalidatePath("/dashboard", "layout")
    // redirect(`/dashboard/${budgetID}/Faculty`)
}
