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
    const budget = await Budget.findById(budgetID)
    const allBudgets = await Budget.find({})

    console.log(allBudgets)

    return <>
        <Header budgets={allBudgets}/>


        {children}
    </>

}
