import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, InstitutionalAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"
import Link from "next/link";



async function getStudents(budgetID) {
    const studentAccIds = await InstitutionalAccount
        .find({budgetID: budgetID})
        .select("studentAccounts")
        .lean()


    if (studentAccIds.length > 0) {
        const studentIDs = await StudentAccount
            .find({})
            .where('_id').in(studentAccIds[0].studentAccounts)
            .lean()


        const students = await Student
            .find({})
            .where('_id').in(studentIDs.map(x => x.student_id))
            .lean()



        const individuals = await Individual
            .find({})
            .where('_id').in(students.map(x => x.indID))
            .lean()

        return individuals
    }
    return null
}

export default async function Page({ params, children }) {
    await dbConnect()
    const { budgetID } = await params


    const individuals = await getStudents(budgetID)

    return <main className="two-col">
        <div className="items">
            {individuals != null ? individuals.map((x, idx) => {
                return <Link key={idx} href={"/dashboard/" + budgetID + "/Student/" + x._id.toString()}>{x.name}</Link>
            }) : null}
            <Link href={`/dashboard/${budgetID}/Student/`}>Add New Student</Link>
        </div>
        <div>
            {children}
        </div>
    </main>
}