import { getInstitutionalAccount, getBudget } from '@/lib/server-api'
import SemesterForm from '../form'

export default async function Page({ params }: {params: {budgetID: string, semesterID: string}}) {
    const { budgetID, semesterID } = await params

    const budget = await getBudget(budgetID)
    const semester = await getInstitutionalAccount(budgetID, semesterID)


    return <SemesterForm budget={budget} semester={semester}/>
}