
import BudgetAPI from "@/lib/models/budget";
import AccountForm from "@/forms/accountForm";

// Account
export default async function Page({params}: {params: {budgetID: string}}) {
    const { budgetID } = await params

    const budget = await BudgetAPI.getOne({budgetID})


    return <AccountForm budget={budget}></AccountForm>

}