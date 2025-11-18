import dbConnect from "@/lib/mongodb"
import { Faculty, Individual, InstitutionalAccount, SalaryAccount } from "@/lib/models"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Page({ params, children }: {params: {budgetID: string, facultyID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    // if this returns more than one institutional account then budgetID is not unique1
    const salaryAccIds = await InstitutionalAccount
        .find({budgetID: budgetID})
        .select("salaryAccounts")
        .lean()

    if (salaryAccIds.length > 0) {
        const facultyIDs = await SalaryAccount
            .find({})
            .where('_id').in(salaryAccIds[0].salaryAccounts)
            .lean()

        const faculty = await Faculty
            .find({})
            .where('_id').in(facultyIDs.map(x => x.id))
            .lean()


        const individuals = await Individual
            .find({})
            .where('_id').in(faculty.map(x => x.indID))
            .lean()
        return <main className="two-col">
            <div className="items">

                {individuals.map((x, idx) => {
                    return <a key={idx} href={"/dashboard/" + budgetID + "/Faculty/" + x._id.toString()}>{x.name}</a>
                })}
                <Link href={`/dashboard/${budgetID}/Faculty/`}>Add New Faculty Member</Link>
            </div>
            <div>
                {children}
            </div>
        </main>
    }

    return <main className="two-col">
        <div className="items">
            <Link href={`/dashboard/${budgetID}/Faculty/`}>Add New Faculty Member</Link>
        </div>
        <div>
            {children}
        </div>
    </main>
}