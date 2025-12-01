"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function StudentSidebar({students, budgetID}) {
    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        {students != null ? students.map(x => {
            const path = `/dashboard/${budgetID}/Student/${x.individual_id.toString()}`


            if (currPath.startsWith(path)) {
                anyActive = true
                return <Link key={x.individual_id} href={path} className="active">{x.name}</Link>
            }
            else {
                return <Link key={x.individual_id} href={path}>{x.name}</Link>
            }

        }) : null}
        <Link href={`/dashboard/${budgetID}/Student/`} className={!anyActive ? "active" : undefined}>Add New Student</Link>
    </div>
}