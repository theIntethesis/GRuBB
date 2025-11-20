import { FacultyForm } from "@/forms/individualForms"
// new faculty
export default async function Page({params}: {params: Promise<{budgetID: string}>}) {
    const { budgetID } = await params

    return <FacultyForm budgetID={budgetID}/>
}