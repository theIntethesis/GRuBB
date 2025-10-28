import dbConnect from "@/lib/mongodb"

export default async function Page({ params }) {
    const { budgetID } = await params
    await dbConnect()




    return <main className="two">
        <div className="two-column">
            <button>Add New Faculty Member</button>
        </div>
        <div>

        </div>
    </main>
}