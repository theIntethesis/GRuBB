import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "./header";
import dbConnect from "@/lib/mongodb";
import Budget from "@/lib/Models/Budget";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ budgetID: string }>
}) {
    const { budgetID } = await params
    await dbConnect()

    // const budget = await Budget.findById(budgetID)
    const budget = await Budget.findById(budgetID).lean()


    const allBudgets = await Budget.find({}).lean()
    allBudgets.forEach(x => {
        x._id = x._id.toJSON()
    })
    budget._id = budget._id.toJSON()



    console.log(allBudgets)
    console.log(budget)

    return <>
        <Header budgets={allBudgets} current_budget={budget}/>


        {children}
    </>

}
