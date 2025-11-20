import { FacultyForm } from "@/forms/individualForms"
import { getAllSalaryAccounts } from "@/api/accounts"
// modify semester
export default function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    //  need to fetch all semesters they are in
    const faculty = await getFaculty(individualID)
    const salaryAccounts = getAllSalaryAccounts(student.individual_id)

    // find the current salaryAccount

    return <FacultyForm budgetID={budgetID} faculty={faculty} />
}