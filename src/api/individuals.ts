"use server"
import { Individual, Student, Budget } from "@/lib/models";

export async function createNewStudent(name: string, outOfState: boolean, budgetID: string) {
    const individual = new Individual({
        name: name
    })
    await individual.save()

    const student = new Student({
        individual_id: individual._id,
        outOfState: outOfState
    })

    await student.save()

    const budget = await Budget.findById(budgetID)
    budget.students.push(individual._id)

    console.log("here")
    await budget.save()
}

export async function getAllStudents(budgetID: string) {
    // return { individual: {name, id}, outOfState}
}