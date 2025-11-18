"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function RatesSidebar({semesters, budgetID}) {

    // const path = usePathname().split('/')


    return <div className="items">
        {semesters != null ? semesters.map(x => {
            return <Link href={`/dashboard/${budgetID}/Rates/${x._id}`} key={x._id}>{x.semester}</Link>
        }) : null}
        <Link href={`/dashboard/${budgetID}/Rates/`}>Add New Semester</Link>
    </div>
}