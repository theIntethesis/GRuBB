"use server"
import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, InstitutionalAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"
import Link from "next/link";

// Rates

const addNewSemester = () => {
    console.log("add new semester")
};

export default async function Page({ params, children }: {params: {budgetID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    // if this returns more than one institutional account then budgetID is not unique and something has fucked up.
    const semesters = await InstitutionalAccount
        .find({budgetID: budgetID})
        .lean()

    // console.log(studentAccIds)
    // console.log(studentAccIds[0].studentAccounts)

    if (semesters.length > 0) {
        return <main className="two-col">
            <div className="items">
                {semesters.map(x => {
                    return <Link href={`/dashboard/${budgetID}/Rates/${x._id.toJSON()}`} key={x._id.toJSON()}>{x.semester}</Link>
                })}
                <Link href={`/dashboard/${budgetID}/Rates/`}>Add New Semester</Link>
            </div>
            <div>
                {children}
            </div>
        </main>
    }

        // console.log(individuals)

    return <main className="two-col">
        <div className="items">
            <Link href={`/dashboard/${budgetID}/Rates/`}>Add New Semester</Link>
        </div>
        <div>
            {children}
        </div>
    </main>
}