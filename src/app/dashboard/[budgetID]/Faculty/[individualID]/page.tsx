import { getFaculty } from "@/api/individuals"
import { FacultyForm } from "@/forms/individualForms"
import { getAllSalaryAccounts } from "@/api/accounts"
// new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string}>}) {
    const {budgetID, individualID} = await params
    const faculty = await getFaculty(individualID)

    const salaryAccounts = getAllSalaryAccounts(faculty.individual_id)


    // add new semester - need to fetch all semesters they are in
    return <FacultyForm budgetID={budgetID} faculty={faculty}/>
}