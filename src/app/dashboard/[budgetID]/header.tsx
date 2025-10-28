'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const path = usePathname()
    return <header>
        <select className="institution-dropdown">
                <option>Select a Institution</option>
                <option>Add new Institution</option>
        </select>
        <nav className="tabNav">
                <Link href="/Student" className={"tab " + (path == "/Student" ? "active" : "")}>Student</Link>
                <Link href="/Faculty" className={"tab " + (path == "/Faculty" ? "active" : "")}>Faculty</Link>
                <Link href="/Rates" className={"tab " + (path == "/Rates" ? "active" : "")}>Rates</Link>
                <Link href="/Institution" className={"tab " + (path == "/Institution" ? "active" : "")}>Institution</Link>
        </nav>
    </header>
}