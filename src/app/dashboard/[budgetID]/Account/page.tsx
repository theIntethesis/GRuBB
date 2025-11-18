
import { getBudget } from "@/lib/server-api";
import AccountForm from "./form";


// Account
export default async function Page({params}: {params: {budgetID: string}}) {
    const { budgetID } = await params

    const budget = await getBudget(budgetID)


    return <AccountForm budget={budget}></AccountForm>

}