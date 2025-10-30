import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, InstitutionalAccount, SalaryAccount, StudentAccount, Student } from "@/lib/models"

// Student
export default async function Page({ params, children }) {
    await dbConnect()
    const { budgetID } = await params

        // if this returns more than one institutional account then budgetID is not unique1
        const studentAccIds = await InstitutionalAccount
            .find({budgetID: budgetID})
            .select("studentAccounts")
            .lean()

        // console.log(studentAccIds)
        // console.log(studentAccIds[0].studentAccounts)

        const studentIDs = await StudentAccount
            .find({})
            .where('_id').in(studentAccIds[0].studentAccounts)
            .lean()

        // console.log(studentIDs.map(x => x.student_id))

        const students = await Student
            .find({})
            .where('_id').in(studentIDs.map(x => x.student_id))
            .lean()

        // console.log(students)


        const individuals = await Individual
            .find({})
            .where('_id').in(students.map(x => x.indID))
            .lean()

        // console.log(individuals)

    return <main className="two-col">
        <div className="items">
            {individuals.map((x, idx) => {
                return <a key={idx} href={"/dashboard/" + budgetID + "/Student/" + x._id}>{x.name}</a>
            })}
            <button>Add New Student</button>
        </div>
        <div>
            {children}
        </div>
    </main>
}