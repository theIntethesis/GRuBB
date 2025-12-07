"use server"
import dbConnect from "@/lib/mongodb"

import Link from "next/link";
import RatesSidebar from "./sidebar";
import {SemesterAccountAPI} from "@/lib/models";
import { SemesterCombo } from "@/lib/_common";


export default async function Page({ params, children }: {params: {budgetID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    // if this returns more than one institutional account then budgetID is not unique and something has fucked up.
    // this needs to be
    const semesters = (await SemesterAccountAPI.getAll({budgetID})).map(x => {return x.semesterAccount as SemesterCombo})



    return <main className="two-col">
        <RatesSidebar budgetID={budgetID} semesters={semesters}/>
        <div>
            {children}
        </div>
    </main>
}