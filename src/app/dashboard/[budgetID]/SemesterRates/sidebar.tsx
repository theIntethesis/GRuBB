"use client"
import { SemesterCombo, sortBySemester } from "@/lib/common";
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function RatesSidebar({semesters, budgetID}: {semesters: SemesterCombo[], budgetID: string}) {
    // console.log(semesters)
    const currPath = usePathname()
    let anyActive: boolean = false

    return <div className="items">
        <table>
            <tbody>
                {semesters != null ? (sortBySemester(semesters)).map(x => {
                    const path = `/dashboard/${budgetID}/SemesterRates/${x.year}/${x.semester}`
                    if (path == currPath) {
                        anyActive = true
                        return <tr key={JSON.stringify(x)}><td><Link href={path}  className="active">{x.semester} {x.year}</Link></td></tr>
                    }
                    else {
                        return <tr key={JSON.stringify(x)}><td><Link href={path} >{x.semester} {x.year}</Link></td></tr>
                    }

                }) : null}
                <tr><td><Link href={`/dashboard/${budgetID}/SemesterRates/`} className={!anyActive ? "active" : undefined}>Add New Semester</Link></td></tr>
            </tbody>

        </table>
    </div>
}