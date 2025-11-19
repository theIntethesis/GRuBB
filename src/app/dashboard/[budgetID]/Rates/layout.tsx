"use server"
import dbConnect from "@/lib/mongodb"
import { getAllAccounts } from "@/api/semesterAccount";
import Link from "next/link";
import RatesSidebar from "./sidebar";


export default async function Page({ params, children }: {params: {budgetID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    // if this returns more than one institutional account then budgetID is not unique and something has fucked up.
    // this needs to be
    const semesters = await getAllAccounts(budgetID)


    return <main className="two-col">
        <RatesSidebar budgetID={budgetID} semesters={semesters}/>
        <div>
            {children}
        </div>
    </main>
}