import { Individual, Student, StudentAccount } from "@/lib/models"
import SemesterForm from '../form'

export default async function Page({ params }) {
    const { budgetID, semesterID } = await params

    return <SemesterForm budgetID={budgetID} semesterID={semesterID}/>
}