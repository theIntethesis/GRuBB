"use client"
import { StudentIndividual } from "@/lib/models/student";
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function StudentSidebar({students, budgetID}: {students: StudentIndividual[], budgetID: string}) {

    const currPath = usePathname()
    let anyActive: boolean = false
    // console.log(students)

    return <div className="items">
        <table>
            <tbody>
                {students != null ? students.map(x => {
                const path = `/dashboard/${budgetID}/Student/${x.student.individualID.toString()}`


                if (currPath.startsWith(path)) {
                    anyActive = true
                    return <tr key={x.student.individualID}><td><Link  href={path} className="active">{x.individual.name}</Link></td></tr>
                }
                else {
                    return <tr key={x.student.individualID}><td><Link  href={path}>{x.individual.name}</Link></td></tr>
                }

            }) : null}
            <tr><td><Link href={`/dashboard/${budgetID}/Student/`} className={!anyActive ? "active" : undefined}>Add New Student</Link></td></tr>

            </tbody>
        </table>

    </div>
}