import { StudentForm } from "@/forms/individualForms"
import { getAllAccounts } from "@/api/semesterAccount"
// add new student
export default async function Page({params} : {params: Promise<{budgetID: string}>}) {
    const { budgetID } = await params

    const semesterAccounts = await getAllAccounts(budgetID)

    return <StudentForm budgetID={budgetID} semesterAccounts={semesterAccounts}/>
}