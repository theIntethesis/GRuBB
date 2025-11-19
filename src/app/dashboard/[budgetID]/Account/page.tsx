
import { getBudget } from "@/api/budget";
import AccountForm from "@/forms/accountForm";

// Account
export default async function Page({params}: {params: {budgetID: string}}) {
    const { budgetID } = await params

    const budget = await getBudget(budgetID)


    return <AccountForm budget={budget}></AccountForm>

}