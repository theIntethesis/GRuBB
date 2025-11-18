"use server"
import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, InstitutionalAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"
import Link from "next/link";

// Rates

const addNewSemester = () => {
    console.log("add new semester")
};

export default async function Page({ params, children }) {
    await dbConnect()
    const { budgetID } = await params

        // if this returns more than one institutional account then budgetID is not unique and something has fucked up.
        const semesters = await InstitutionalAccount
            .find({budgetID: budgetID})
            .select(["semester", "inStateTuitionRate", "outOfStateTuitionRate", "tuitionIncrease", "facultyFBR", "studentFBR", "postDocFBR", "travelProfile", "overheadCharge"])
            .lean()

        // console.log(studentAccIds)
        // console.log(studentAccIds[0].studentAccounts)

        if (semesters.length > 0) {
            const studentIDs = await StudentAccount
                .find({})
                .where('_id').in(semesters[0].studentAccounts)
                .lean()

            // console.log(studentIDs.map(x => x.student_id))

            const students = await Student
                .find({})
                .where('_id').in(studentIDs.map(x => x.student_id))
                .lean()

            console.log(students)


            const individuals = await Individual
                .find({})
                .where('_id').in(students.map(x => x.indID))
                .lean()

            return <main className="two-col">
                <div className="items">
                    {individuals.map((x, idx) => {
                        return <a key={idx} href={"/dashboard/" + budgetID + "/Rates/" + x._id.toString()}>{x.name}</a>
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