import { getBudget } from '@/api/budget'
import { getSemesterAccount } from '@/api/semesterAccount'
import SemesterForm from '@/forms/SemesterSetupForm'

export default async function Page({ params }: {params: {budgetID: string, semester: string, year: string}}) {
    const { budgetID, semester, year } = await params

    const budget = await getBudget(budgetID)
    const semesterAcc = await getSemesterAccount(budgetID, semester, parseInt(year))

    return <SemesterForm budget={budget} semester={semesterAcc}/>
}