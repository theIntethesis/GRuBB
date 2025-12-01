import { getFaculty } from "@/api/individuals"
import { FacultyForm } from "@/forms/individualForms"
import { getAllSalaryAccounts } from "@/api/accounts"
import { getAllAccounts } from "@/api/semesterAccount"
// new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string, year: string, semester: string}>}) {
    const {budgetID, individualID, year, semester} = await params
    const faculty = await getFaculty(individualID)

    const salaryAccounts = await getAllSalaryAccounts(faculty.individual_id)
    const semesterAccounts = await getAllAccounts(budgetID)


    // add new semester - need to fetch all semesters they are in
    return <FacultyForm
        budgetID={budgetID}
        faculty={faculty}
        semesterAccounts={semesterAccounts}
        salaryAccounts={salaryAccounts}
        inputSemester={{semester: semester, year: Number(year)}}
    />
}