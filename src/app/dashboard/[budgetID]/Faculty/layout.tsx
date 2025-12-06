import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, SemesterAccount, SalaryAccount } from "@/lib/models"
import Link from "next/link"
import { getAllFaculty } from "@/api/individuals"
import FacultySidebar from "./sidebar"
import BudgetAPI from "@/lib/models/budget"


export default async function Page({ params, children }: {params: {budgetID: string, facultyID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params


    const individuals = await getAllFaculty(budgetID)

    return <main className="two-col">
            <FacultySidebar budgetID={budgetID} faculty={individuals}/>
            <div>
                {children}
            </div>
        </main>
}