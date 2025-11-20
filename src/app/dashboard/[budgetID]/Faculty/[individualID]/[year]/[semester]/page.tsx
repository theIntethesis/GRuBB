import { FacultyForm } from "@/forms/individualForms"
// modify semester
export default function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    //  need to fetch all semesters they are in
    return <FacultyForm/>
}