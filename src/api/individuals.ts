"use server"
import { Individual, Student, Faculty, Budget } from "@/lib/models";
import { redirect } from "next/navigation"
import { refresh, revalidatePath} from 'next/cache'

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

    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Student/${student.individual_id.toJSON()}`)
}

export async function deleteStudent(individual_id: string, budgetID: string) {
    // make sure to delete the student, the individual, and all accounts connected to them
    await Student.deleteOne({individual_id})
    await Individual.findByIdAndDelete(individual_id)

    const budget = await Budget.findById(budgetID)
    budget.students.pull(individual_id)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Student`)
}

export async function modifyStudent(name: string, outOfState: boolean, individual_id: string) {
    const student = await Student.findOne({individual_id})
    student.outOfState = outOfState
    await student.save()

    const individual = await Individual.findById(individual_id)
    individual.name = name
    await individual.save()


    revalidatePath("/dashboard", "layout")
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

    budget.faculty.push(individual._id)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Faculty/${faculty.individual_id.toJSON()}`)
}

export async function deleteFaculty(individual_id: string, budgetID: string) {
    // make sure to delete the student, the individual, and all accounts connected to them
    await Faculty.deleteOne({individual_id})
    await Individual.findByIdAndDelete(individual_id)

    const budget = await Budget.findById(budgetID)
    budget.faculty.pull(individual_id)
    await budget.save()

    revalidatePath("/dashboard", "layout")
    redirect(`/dashboard/${budgetID}/Faculty`)
}



export async function modifyFaculty(name: string, role: string, individual_id: string) {
    const faculty = await Faculty.findOne({individual_id})
    faculty.role = role
    await faculty.save()

    const individual = await Individual.findById(individual_id)
    individual.name = name

    await individual.save()


    revalidatePath("/dashboard", "layout")
    refresh()
}


export async function getStudent(individual_id: string) {
    const student = (await Student.find({individual_id: individual_id}))[0] // individualID is unique
    const ind = await Individual.findById(individual_id);

    return {
        name: ind.name,
        individual_id,
        outOfState: student.outOfState
    }
}


export async function getAllStudents(budgetID: string) {
    // return { individual: {name, id}, outOfState}

    const budget = await Budget.findById(budgetID)
    let students = []
    for (let i in budget.students) {
        const individual_id = budget.students[i].toJSON();
        students.push(await getStudent(individual_id))
    }
    //console.log(students)
    return students;
}

export async function getFaculty(individual_id: string) {
    const ind = await Individual.findById(individual_id);
    const faculty = (await Faculty.find({individual_id: individual_id}))[0]
    //console.log(individual_id)
    //console.log(ind)

    return {
        name: ind.name,
        individual_id,
        role: faculty.role
    }
}

export async function getAllFaculty(budgetID: string) {
    const budget = await Budget.findById(budgetID)
    let faculty = []
    for (let i in budget.faculty) {
        const individual_id = budget.faculty[i].toJSON();

        faculty.push(await getFaculty(individual_id));
    }
    return faculty;
}