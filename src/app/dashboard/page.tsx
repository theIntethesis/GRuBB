import Header from "@/modules/header";
;
import NewInstituionForm from "@/forms/newInstitutionForm";
import { BudgetAPI } from "@/lib/models";

export default async function Page() {

    const allBudgets = await BudgetAPI.getAll()

    return <>
        <Header budgets={allBudgets} current_budget={null}/>
        <main>
            <NewInstituionForm/>
        </main>

    </>
}