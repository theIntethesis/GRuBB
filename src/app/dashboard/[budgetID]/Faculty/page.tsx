import { FacultyForm } from "@/forms/individualForms"
import { getAllAccounts } from "@/api/semesterAccount"
// new faculty
export default async function Page({params}: {params: Promise<{budgetID: string}>}) {
    const { budgetID } = await params

    const semesterAccounts = await getAllAccounts(budgetID)

    return <FacultyForm budgetID={budgetID} semesterAccounts={semesterAccounts}/>
}