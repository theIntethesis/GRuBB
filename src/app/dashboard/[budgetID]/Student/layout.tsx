import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, SemesterAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"
import Link from "next/link";
import { getAllStudents } from "@/api/individuals";
import StudentSidebar from "./sidebar";


export default async function Page({ params, children }) {
    await dbConnect()
    const { budgetID } = await params

    const students = await getAllStudents(budgetID)
    return <main className="two-col">
        <StudentSidebar students={students} budgetID={budgetID}/>
        <div>
            {children}
        </div>
    </main>
}