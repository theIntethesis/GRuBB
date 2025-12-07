"use client"
import { StudentIndividual } from "@/lib/models/student";
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function StudentSidebar({students, budgetID}: {students: StudentIndividual[], budgetID: string}) {
    const currPath = usePathname()
    let anyActive: boolean = false

    console.log(students)

    return <div className="items">
        {students != null ? students.map(x => {
            const path = `/dashboard/${budgetID}/Student/${x.student.individualID.toString()}`


            if (currPath.startsWith(path)) {
                anyActive = true
                return <Link key={x.student.individualID} href={path} className="active">{x.individual.name}</Link>
            }
            else {
                return <Link key={x.student.individualID} href={path}>{x.individual.name}</Link>
            }

        }) : null}
        <Link href={`/dashboard/${budgetID}/Student/`} className={!anyActive ? "active" : undefined}>Add New Student</Link>
    </div>
}