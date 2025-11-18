import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "../form"

// add new semester
export default async function page({params}: {params: {budgetID: string, studentID: string}}) {


    // fetch individual and all a list of all the semesters applicable
    return <StudentForm/>
}
