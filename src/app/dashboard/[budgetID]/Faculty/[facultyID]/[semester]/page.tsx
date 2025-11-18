import { FacultyForm } from "@/forms/individualForms"
// modify semester
export default function page({params}: {params: {budgetID: string, facultyID: string, semester: string}}) {
    return <FacultyForm/>
}