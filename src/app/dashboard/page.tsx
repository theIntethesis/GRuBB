import Header from "@/app/dashboard/header";
import dbConnect from "@/lib/mongodb";
import NewInstituionForm from "@/forms/newInstitutionForm";
import BudgetAPI from "@/lib/models/budget";

export default async function Page() {
    await dbConnect()

    const allBudgets = await BudgetAPI.getAll()

    return <>
        <Header budgets={allBudgets} current_budget={null}/>
        <main>
            <NewInstituionForm/>
        </main>

    </>
}