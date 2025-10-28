'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({budgets}) {
    const path = usePathname()
    return <header>
        <select className="institution-dropdown">
                <option>Select a Institution</option>
                <option>Add new Institution</option>
        </select>
        <nav className="tabNav">
                <Link href="Student" className={"tab " + (path.endsWith("Student") ? "active" : "")}>Student</Link>
                <Link href="Faculty" className={"tab " + (path.endsWith("Faculty") ? "active" : "")}>Faculty</Link>
                <Link href="Rates" className={"tab " + (path.endsWith("Rates") ? "active" : "")}>Rates</Link>
                <Link href="Account" className={"tab " + (path.endsWith("Account") ? "active" : "")}>Account</Link>
        </nav>
    </header>
}