"use server"
import mongoose from "mongoose"
import { I_Individual, Individual } from "./_individual"
import { Budget } from "./budget"
import { ForeignKeyModelAPI } from "./_modelAPI"
import { refresh, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import dbConnect from "../mongodb"
import { SalaryAccount } from "./salaryAccount"
import { StudentAccount } from "./studentAccount"

export interface I_Student {
    outOfState: boolean,
    individualID?: string // uid from Individual
}

const StudentSchema = new mongoose.Schema<I_Student>({
    outOfState: Boolean,
    individualID: mongoose.Types.ObjectId
})

export const Student = mongoose.models.Student || mongoose.model<I_Student>("Student", StudentSchema, "Students")

export interface StudentIndividual {individual: I_Individual, student: I_Student}

/*
const StudentAPI: ForeignKeyModelAPI<
    {individualID: string},
    StudentIndividual,
    {budgetID: string}
> = {
    getOne: async ({individualID}) => {
        await dbConnect()
        const student = (await Student.find({individualID: individualID}))[0] // individualID is unique
        const ind = await Individual.findById(individualID);

        return {
            individual: ind,
            student
        }
    },

    getAll: async ({budgetID}) => {
        await dbConnect()
        const budget = await Budget.findById(budgetID)
        let students = []

        for (let i in budget.students) {
            const individualID = budget.students[i].toJSON();
            const stu = await StudentAPI.getOne({individualID})
            if (stu != undefined) students.push(stu)
        }

        //console.log(students)
        return students;
    },
    create: async (input, fk) => {
        await dbConnect()
        const individual = new Individual({
            name: input.individual.name
        })
        await individual.save()

        const student = new Student({
            individualID: individual._id,
            outOfState: input.student.outOfState
        })
        await student.save()

        const budget = await Budget.findById(fk.budgetID)
        budget.students.push(individual._id)

        await budget.save()

        revalidatePath("/dashboard", "layout")
        redirect(`/dashboard/${fk.budgetID}/Student/${student.individualID.toJSON()}`)
    },
    modify: async (input) => {
        await dbConnect()
        const student = await Student.findOne({individualID: input.student.individualID})
        student.outOfState = input.student.outOfState
        await student.save()

        const individual = await Individual.findById(input.student.individualID)
        individual.name = input.individual.name
        await individual.save()


        revalidatePath("/dashboard", "layout")
    },
    // budgetID is required
    delete: async ({individualID}, {budgetID}) => {
        await dbConnect()
        // await Student.deleteOne({individualID})
        // await Individual.findByIdAndDelete(individualID)

        // const budget = await Budget.findById(budgetID)
        // budget.students.pull(individualID)
        // await budget.save()

        // revalidatePath("/dashboard", "layout")
        // redirect(`/dashboard/${budgetID}/Student`)


    }
}
*/

export interface I_StudentPK { individualID: string }

export async function getOne(
    { individualID }: { individualID: string }
): Promise<StudentIndividual | undefined> {
    await dbConnect()

    const student = (await Student.find({ individualID }))[0] // unique
    const individual = await Individual.findById(individualID)


    return JSON.parse(JSON.stringify({
        individual,
        student
    }))
}

export async function getAll(
    { budgetID }: { budgetID: string }
): Promise<StudentIndividual[]> {
    await dbConnect()

    const budget = await Budget.findById(budgetID)
    const students: StudentIndividual[] = []

    for (let i in budget.students) {
        const individualID = budget.students[i].toJSON()

        // Now calls the exported function instead of StudentAPI.getOne
        const stu = await getOne({ individualID })

        if (stu != undefined) students.push(stu)
    }

    return JSON.parse(JSON.stringify(students))
}

export async function create(
    input: StudentIndividual,
    fk: { budgetID: string }
): Promise<void> {
    await dbConnect()

    const individual = new Individual({
        name: input.individual.name
    })
    await individual.save()

    const student = new Student({
        individualID: individual._id,
        outOfState: input.student.outOfState
    })
    await student.save()

    const budget = await Budget.findById(fk.budgetID)
    budget.students.push(individual._id)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${fk.budgetID}/Student/${student.individualID.toJSON()}`)
}

export async function createNR(
    input: StudentIndividual,
    fk: { budgetID: string }
): Promise<string> {
    await dbConnect()

    const individual = new Individual({
        name: input.individual.name
    })
    await individual.save()

    const student = new Student({
        individualID: individual._id,
        outOfState: input.student.outOfState
    })
    await student.save()

    const budget = await Budget.findById(fk.budgetID)
    budget.students.push(individual._id)
    await budget.save()
    return individual._id;
}

export async function modify(
    input: StudentIndividual
): Promise<void> {
    await dbConnect()

    const student = await Student.findOne({
        individualID: input.student.individualID
    })

    student.outOfState = input.student.outOfState
    await student.save()

    const individual = await Individual.findById(input.student.individualID)
    individual.name = input.individual.name
    await individual.save()

    revalidatePath("/dashboard", "layout")
    refresh()
}

/// deletes student/salary accounts connected to student
export async function del(
    { individualID }: { individualID: string },
    { budgetID }: { budgetID: string }
): Promise<void> {
    await dbConnect()

    await SalaryAccount.deleteMany({individualID})
    await StudentAccount.deleteMany({individualID})

    await Student.deleteOne({individualID})
    await Individual.findByIdAndDelete(individualID)

    const budget = await Budget.findById(budgetID)
    budget.students.pull(individualID)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Student`)

}
