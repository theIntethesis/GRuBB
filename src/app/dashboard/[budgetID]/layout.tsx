import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/app/dashboard/header";

import BudgetAPI from "@/lib/models/budget";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ budgetID: string }>
}) {
    const { budgetID } = await params

    const budget = await BudgetAPI.getOne({budgetID})
    const allBudgets = await BudgetAPI.getAll()


    return <>
        <Header budgets={allBudgets} current_budget={budget}/>


        {children}
    </>

}
