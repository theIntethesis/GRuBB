import { StudentForm } from "@/forms/individualForms"
// edit a semester
export default async function page({params}: {params: {budgetID: string, studentID: string, semester: string}}) {
    const { studentID, semester } = await params


    // fetch indiviudal and semester
    // will also need a list of all the semesters applicable
    return <StudentForm/>
}
