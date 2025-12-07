import dbConnect from "@/lib/mongodb"

import StudentSidebar from "./sidebar";
import { DashboardSlugs } from "@/lib/common";
import {StudentAPI} from "@/lib/models";


export default async function Page({ params, children }: {params: DashboardSlugs, children: any[]}) {
    await dbConnect()
    const { budgetID } = await params

    const students = await StudentAPI.getAll({budgetID})

    return <main className="two-col">
        <StudentSidebar students={students} budgetID={budgetID}/>
        <div>
            {children}
        </div>
    </main>
}