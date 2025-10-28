import Header from "@/app/dashboard/header";
import dbConnect from "@/lib/mongodb";
import Budget from "@/lib/Models/Budget";

export default async function Page() {
    await dbConnect()

    const allBudgets = await Budget.find({}).lean()
    allBudgets.forEach(x => {
        x._id = x._id.toJSON()
    })

    return <>
        <Header budgets={allBudgets} current_budget={null}/>
        {/* insert code to prompt the user to create a new budget*/}
    </>
}