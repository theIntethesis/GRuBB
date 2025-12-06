// Rates

import BudgetAPI from '@/lib/models/budget'
import SemesterForm from '@/forms/SemesterSetupForm'

export default async function Page({ params }: {params: {budgetID: string}}) {
    const { budgetID } = await params
    const budget = await BudgetAPI.getOne({budgetID})

    return <SemesterForm budget={budget}/>
}