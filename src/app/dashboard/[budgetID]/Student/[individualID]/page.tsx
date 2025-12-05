import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "@/forms/individualForms"
import { getStudent } from "@/api/individuals"
import { getAllSalaryAccounts, getAllStudentAccounts } from "@/api/accounts"
import { getAllAccounts } from "@/api/semesterAccount"

// add new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string}>}) {
    const {budgetID, individualID} = await params

    const student = await getStudent(individualID)

    const studentAccounts = await getAllStudentAccounts(student.individual_id)
    const salaryAccounts = await getAllSalaryAccounts(student.individual_id)
    const semesterAccounts = await getAllAccounts(budgetID)

    // [TODO] if semesterAccounts is null then do something

    // fetch individual and all a list of all the semesters applicable
    return <StudentForm
        budgetID={budgetID}
        student={student}
        studentAccounts={studentAccounts}
        salaryAccounts={salaryAccounts}
        semesterAccounts={semesterAccounts}
    />
}
