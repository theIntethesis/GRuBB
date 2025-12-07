import { FacultyForm } from "@/forms/individualForms"

import { DashboardSlugs } from "@/lib/_common"
import {SemesterAccountAPI} from "@/lib/models"
// new faculty
export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID } = await params

    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})

    return <FacultyForm budgetID={budgetID} semesterAccounts={semesterAccounts}/>
}