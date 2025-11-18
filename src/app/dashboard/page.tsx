import Header from "@/app/dashboard/header";
import dbConnect from "@/lib/mongodb";
import { Budget, InstitutionalAccount } from "@/lib/models";
import NewInstituionForm from "@/forms/newInstitutionForm";

export default async function Page() {
    await dbConnect()

    const allBudgets = await Budget.find({}).lean()
    allBudgets.forEach(x => {
        x._id = x._id.toJSON()
    })

    return <>
        <Header budgets={allBudgets} current_budget={null}/>
        <main>
            {/* Prompt done. Next step is create acct.*/}
            <NewInstituionForm/>
        </main>

    </>
}