"use client"
import { SemesterCombo } from "@/lib/_common";
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function RatesSidebar({semesters, budgetID}: {semesters: SemesterCombo[], budgetID: string}) {

    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        {semesters != null ? semesters.map(x => {
            const path = `/dashboard/${budgetID}/SemesterRates/${x.year}/${x.semester}`
            if (path == currPath) {
                anyActive = true
                return <Link href={path} key={JSON.stringify(x)} className="active">{x.semester} {x.year}</Link>
            }
            else {
                return <Link href={path} key={JSON.stringify(x)}>{x.semester} {x.year}</Link>
            }

        }) : null}
        <Link href={`/dashboard/${budgetID}/SemesterRates/`} className={!anyActive ? "active" : undefined}>Add New Semester</Link>
    </div>
}