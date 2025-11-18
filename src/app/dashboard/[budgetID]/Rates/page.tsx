// Rates

import SemesterForm from './form'

export default async function Page({ params }) {
    const { budgetID } = await params

    return <SemesterForm budgetID={budgetID}/>
}