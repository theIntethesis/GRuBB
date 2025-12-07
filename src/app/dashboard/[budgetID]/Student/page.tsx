import { StudentForm } from "@/forms/individualForms"

import { DashboardSlugs } from "@/lib/common"
import {SemesterAccountAPI} from "@/lib/models"
// add new student
export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID } = await params

    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})

    return <StudentForm budgetID={budgetID} semesterAccounts={semesterAccounts}/>
}