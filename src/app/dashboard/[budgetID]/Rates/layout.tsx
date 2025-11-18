"use server"
import dbConnect from "@/lib/mongodb"
import { getAllAccounts } from "@/lib/server-api";
import Link from "next/link";


export default async function Page({ params, children }: {params: {budgetID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    // if this returns more than one institutional account then budgetID is not unique and something has fucked up.
    // this needs to be
    const semesters = await getAllAccounts(budgetID)

    return <main className="two-col">
        <div className="items">
            {semesters != null ? semesters.map(x => {
                    return <Link href={`/dashboard/${budgetID}/Rates/${x._id}`} key={x._id}>{x.semester}</Link>
            }) : null}
            <Link href={`/dashboard/${budgetID}/Rates/`}>Add New Semester</Link>
        </div>
        <div>
            {children}
        </div>
    </main>
}