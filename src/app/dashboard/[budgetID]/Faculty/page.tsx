import { FacultyForm } from "@/forms/individualForms"
// new faculty
export default async function Page({params}) {
    const { budgetID } = await params

    return <FacultyForm budgetID={budgetID}/>
}