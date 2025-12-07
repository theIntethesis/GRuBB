// Rates

import {BudgetAPI} from '@/lib/models'
import SemesterForm from '@/forms/SemesterSetupForm'
import { DashboardSlugs } from '@/lib/common'

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID } = await params
    const budget = await BudgetAPI.getOne({_id: budgetID})

    return <SemesterForm budget={budget}/>
}