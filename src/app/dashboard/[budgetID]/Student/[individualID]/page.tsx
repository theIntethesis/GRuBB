import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "@/forms/individualForms"
import { getStudent } from "@/api/individuals"
import { getAllSalaryAccounts, getAllStudentAccounts } from "@/api/accounts"

// add new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string}>}) {
    const {budgetID, individualID} = await params

    const student = await getStudent(individualID)

    const studentAccounts = getAllStudentAccounts(student.individual_id)
    const salaryAccounts = getAllSalaryAccounts(student.individual_id)

    /*
    map those values to {semester, year}[]
    */

    // fetch individual and all a list of all the semesters applicable
    return <StudentForm budgetID={budgetID} student={student}/>
}
