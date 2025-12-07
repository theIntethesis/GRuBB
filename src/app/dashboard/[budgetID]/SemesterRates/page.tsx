// Rates

import {BudgetAPI, SemesterAccountAPI} from '@/lib/models'
import SemesterForm from '@/forms/SemesterSetupForm'
import { DashboardSlugs } from '@/lib/common'
import { redirect } from 'next/navigation'

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID } = await params
    const budget = await BudgetAPI.getOne({_id: budgetID})
    const semesters = await SemesterAccountAPI.getAll({budgetID})

    if (budget != undefined) {
        return <SemesterForm budget={budget} semesters={semesters}/>
    }
    else {
        redirect("/dashboard")
    }


}