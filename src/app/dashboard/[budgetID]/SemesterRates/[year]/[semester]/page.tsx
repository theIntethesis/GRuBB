import {BudgetAPI} from '@/lib/models'
import SemesterForm from '@/forms/SemesterSetupForm'
import { DashboardSlugs } from '@/lib/common'
import {SemesterAccountAPI} from '@/lib/models'
import { redirect } from 'next/navigation'

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID, semester, year } = await params

    const budget = await BudgetAPI.getOne({_id: budgetID})

    const semesterAcc = await SemesterAccountAPI.getOne({budgetID, semester, year})

    if (budget != undefined) {
        return <SemesterForm budget={budget} semester={semesterAcc}/>
    }
    else {
        redirect("/dashboard")
    }


}