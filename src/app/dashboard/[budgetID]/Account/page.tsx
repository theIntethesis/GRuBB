
import { BudgetAPI } from "@/lib/models";
import AccountForm from "@/forms/accountForm";
import { DashboardSlugs } from "@/lib/common";

// Account
export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID } = await params

    const budget = await BudgetAPI.getOne({_id: budgetID})

    return <AccountForm budget={budget}></AccountForm>

}