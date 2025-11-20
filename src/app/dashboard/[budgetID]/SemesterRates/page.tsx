// Rates

import { getBudget } from '@/api/budget'
import SemesterForm from '@/forms/SemesterSetupForm'

export default async function Page({ params }: {params: {budgetID: string}}) {
    const { budgetID } = await params
    const budget = await getBudget(budgetID)

    return <SemesterForm budget={budget}/>
}