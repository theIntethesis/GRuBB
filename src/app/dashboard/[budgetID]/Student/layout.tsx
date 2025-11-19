import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, SemesterAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"
import Link from "next/link";
import { getAllStudents } from "@/api/individuals";


export default async function Page({ params, children }) {
    await dbConnect()
    const { budgetID } = await params

    const students = await getAllStudents(budgetID)
    return <main className="two-col">
        <div className="items">
            {students != null ? students.map((x, idx) => {
                return <Link key={idx} href={"/dashboard/" + budgetID + "/Student/" + x._id.toString()}>{x.name}</Link>
            }) : null}
            <Link href={`/dashboard/${budgetID}/Student/`}>Add New Student</Link>
        </div>
        <div>
            {children}
        </div>
    </main>
}