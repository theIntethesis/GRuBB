import { StudentForm } from "@/forms/individualForms"
// add new student
export default async function Page({params}) {
    const { budgetID} = await params

    return <StudentForm budgetID={budgetID}/>
}