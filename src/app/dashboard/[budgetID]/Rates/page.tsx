// Rates

import { getBudget } from '@/lib/server-api'
import SemesterForm from './form'

export default async function Page({ params }: {params: {budgetID: string}}) {
    const { budgetID } = await params
    const budget = await getBudget(budgetID)

    return <SemesterForm budget={budget}/>
}