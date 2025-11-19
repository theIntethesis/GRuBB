import { FacultyForm } from "@/forms/individualForms"
// modify semester
export default function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    return <FacultyForm/>
}