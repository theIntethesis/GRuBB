import dbConnect from "@/lib/mongodb"
import FacultySidebar from "./sidebar"

import {FacultyAPI} from "@/lib/models"


export default async function Page({ params, children }: {params: {budgetID: string, facultyID: string}, children: any}) {
    await dbConnect()
    const { budgetID } = await params

    const individuals = await FacultyAPI.getAll({budgetID})

    return <main className="two-col">
            <FacultySidebar budgetID={budgetID} faculty={individuals}/>
            <div>
                {children}
            </div>
        </main>
}