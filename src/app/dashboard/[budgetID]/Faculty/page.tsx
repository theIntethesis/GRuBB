import dbConnect from "@/lib/mongodb"
import { InstitutionalAccount } from "@/lib/models"

export default async function Page({ params }) {
    let conn = await dbConnect()
    const { budgetID } = await params

    try {
        const shit = await InstitutionalAccount
        .find({})
        .lean()

        console.log(conn.modelNames())
        console.log(shit)


    }
    catch (e) {
        console.log(e)
    }


    return <main className="two">
        <div className="two-column">
            <button>Add New Faculty Member</button>
        </div>
        <div>

        </div>
    </main>
}