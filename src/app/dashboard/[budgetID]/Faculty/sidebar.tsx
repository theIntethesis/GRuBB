"use client"
import { FacultyIndividual } from "@/lib/models/faculty";
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function FacultySidebar({faculty, budgetID}: {faculty: FacultyIndividual[], budgetID: string}) {
    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        <table>
            <tbody>
                {faculty != null ? faculty.map(x => {
                    const path = `/dashboard/${budgetID}/Faculty/${x.faculty.individualID}`
                    if (currPath.startsWith(path)) {
                        anyActive = true
                        return <tr><td><Link key={x.faculty.individualID} href={path} className="active">{x.individual.name}</Link></td></tr>
                    }
                    else {
                        return <tr><td><Link key={x.faculty.individualID} href={path}>{x.individual.name}</Link></td></tr>
                    }
                }) : null}
                <tr><td><Link href={`/dashboard/${budgetID}/Faculty/`} className={!anyActive ? "active" : undefined}>Add New Faculty</Link></td></tr>
            </tbody>
        </table>
    </div>
}