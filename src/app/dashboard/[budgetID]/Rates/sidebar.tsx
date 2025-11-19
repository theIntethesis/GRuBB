"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function RatesSidebar({semesters, budgetID}) {

    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        {semesters != null ? semesters.map(x => {
            const path = `/dashboard/${budgetID}/Rates/${x.year}/${x.semester}`
            if (path == currPath) {
                anyActive = true
                return <Link href={path} key={x._id} className="active">{x.semester} {x.year}</Link>
            }
            else {
                return <Link href={path} key={x._id}>{x.semester} {x.year}</Link>
            }

        }) : null}
        <Link href={`/dashboard/${budgetID}/Rates/`} className={!anyActive ? "active" : undefined}>Add New Semester</Link>
    </div>
}