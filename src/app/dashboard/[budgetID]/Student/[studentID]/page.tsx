import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "../form"

// add new semester
export default async function page({params}) {
    const { studentID } = await params
    return <StudentForm/>
}