import { StudentForm } from "@/forms/individualForms"
// edit a semester
export default async function page({params}: {params: {budgetID: string, individualID: string, semester: string, year: string}}) {
    const { budgetID, individualID, semester, year } = await params


    // fetch indiviudal and semester
    // will also need a list of all the semesters applicable
    return <StudentForm/>
}
