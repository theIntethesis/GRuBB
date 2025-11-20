import { StudentForm } from "@/forms/individualForms"
import { getAllSalaryAccounts, getAllStudentAccounts } from "@/api/accounts"
import { getStudent } from "@/api/individuals"

// edit a semester
export default async function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    const { budgetID, individualID, semester, year } = await params

    const student = await getStudent(individualID)


    const studentAccounts = getAllStudentAccounts(student.individual_id)
    const salaryAccounts = getAllSalaryAccounts(student.individual_id)

    // search these values for the selected semester/year

    /*
    map those values to {semester, year}[]
    */

    // fetch indiviudal and semester
    // will also need a list of all the semesters applicable
    return <StudentForm/>
}
