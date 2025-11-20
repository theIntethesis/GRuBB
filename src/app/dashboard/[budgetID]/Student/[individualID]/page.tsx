import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "@/forms/individualForms"
import { getStudent } from "@/api/individuals"

// add new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string}>}) {
    const {budgetID, individualID} = await params

    const student = await getStudent(individualID)

    // fetch individual and all a list of all the semesters applicable
    return <StudentForm budgetID={budgetID} student={student}/>
}
