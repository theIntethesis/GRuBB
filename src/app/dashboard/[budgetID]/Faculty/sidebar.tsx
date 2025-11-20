"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function FacultySidebar({faculty, budgetID}: {faculty: any[], budgetID: string}) {
    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        {faculty != null ? faculty.map(x => {
            const path = `/dashboard/${budgetID}/Faculty/${x.individual_id.toString()}`
            if (path == currPath) {
                anyActive = true
                return <Link key={x.individual_id} href={path} className="active">{x.name}</Link>
            }
            else {
                return <Link key={x.individual_id} href={path}>{x.name}</Link>
            }

        }) : null}
        <Link href={`/dashboard/${budgetID}/Faculty/`} className={!anyActive ? "active" : undefined}>Add New Faculty</Link>
    </div>
}