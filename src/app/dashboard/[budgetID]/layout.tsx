import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/modules/header";
import {BudgetAPI} from "@/lib/models";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ budgetID: string }>
}) {
    const { budgetID } = await params

    const budget = await BudgetAPI.getOne({_id: budgetID})
    const allBudgets = await BudgetAPI.getAll()


    return <>
        <Header budgets={allBudgets} currentBudget={budget}/>
        {children}
        <div style={{flexGrow: 2, height: "100%"}}>

        </div>
        <footer style={{textAlign: "center"}}>
           Developed and Designed by Julia Abdel-Monem and Ferris Hammes-Buehler
           <br/>
           Copyright 2025 | All Rights Reserved
        </footer>
    </>

}
