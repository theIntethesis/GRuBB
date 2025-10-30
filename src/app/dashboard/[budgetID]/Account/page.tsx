
import { getBudget } from "../../utils";
import AccountForm from "./form";


// Account
export default async function Page({params}) {
    var numCoPIs = 0;



    const { budgetID } = await params

    const budget = await getBudget(budgetID)


    return <AccountForm budget={budget}></AccountForm>

}