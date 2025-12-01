import { StudentForm } from "@/forms/individualForms"
import { getAllSalaryAccounts, getAllStudentAccounts } from "@/api/accounts"
import { getStudent } from "@/api/individuals"
import { getAllAccounts } from "@/api/semesterAccount"
// edit a semester
export default async function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    const { budgetID, individualID, semester, year } = await params

    const student = await getStudent(individualID)


    const studentAccounts = await getAllStudentAccounts(student.individual_id)
    const salaryAccounts = await getAllSalaryAccounts(student.individual_id)
    const semesterAccounts = await getAllAccounts(budgetID)



    // search these values for the selected semester/year

    /*
    map those values to {semester, year}[]
    */

    // fetch indiviudal and semester
    // will also need a list of all the semesters applicable


    return <StudentForm
        budgetID={budgetID}
        student={student}
        studentAccounts={studentAccounts}
        salaryAccounts={salaryAccounts}
        semesterAccounts={semesterAccounts}
        inputSemester={{semester: semester, year: Number(year)}}
    />
}
