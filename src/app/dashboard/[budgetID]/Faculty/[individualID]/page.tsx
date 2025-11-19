import { FacultyForm } from "@/forms/individualForms"
// new semester
export default function page({params}: {params: {budgetID: string, facultyID: string}}) {
    return <FacultyForm/>
}