import { getFaculty } from "@/api/individuals"
import { FacultyForm } from "@/forms/individualForms"
// new semester
export default async function page({params}: {params: Promise<{budgetID: string, individualID: string}>}) {
    const {budgetID, individualID} = await params
    const faculty = await getFaculty(individualID)

    // add new semester - need to fetch all semesters they are in
    return <FacultyForm budgetID={budgetID} faculty={faculty}/>
}