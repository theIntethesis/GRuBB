import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/app/dashboard/header";

import { getAllBudgets, getBudget } from "../utils";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ budgetID: string }>
}) {
    const { budgetID } = await params

    const budget = await getBudget(budgetID)
    const allBudgets = await getAllBudgets()


    return <>
        <Header budgets={allBudgets} current_budget={budget}/>


        {children}
    </>

}
