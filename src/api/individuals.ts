"use server"
import { Individual, Student, Faculty, Budget } from "@/lib/models";

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

export async function createNewFaculty(name:string, role:string, budgetID:string) {
    const individual = new Individual({
        name: name
    })
    await individual.save()
    const faculty = new Faculty({
        individual_id: individual._id,
        role: role
    })
    await faculty.save()
    const budget = await Budget.findById(budgetID)
    
    budget.facultys.push(individual._id)
    await budget.save()
}

export async function getAllStudents(budgetID: string) {
    const budget = await Budget.findById(budgetID)
    let students = []
    for (let i in budget.students) {
        const studentID = budget.students[i].toJSON();
        const ind = await Individual.findById(studentID);
        students.push(ind);
    }
    return students;
}

export async function getAllFaculty(budgetID: string) {
    const budget = await Budget.findById(budgetID)
    let faculty = []
    for (let i in budget.faculty) {
        const facultyID = budget.faculty[i].toJSON();
        const ind = await Individual.findById(facultyID);
        faculty.push(ind);
    }
    return faculty;
}