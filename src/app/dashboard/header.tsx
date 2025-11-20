'use client'
import dbConnect from "@/lib/mongodb";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Header({budgets, current_budget}: {budgets: [any], current_budget: any}) {
    const path = usePathname()

    const handleOnChange = (e) => {
        const ret = budgets.filter((x) => x.name == e.target.value)
        if (ret.length == 1) {
            redirect("/dashboard/" + ret[0]._id + "/Student")
        }
        else {
            redirect ("/dashboard")
        }
    }

    // we'lll actually want to create a new budget here...
    let selected = current_budget != null ? current_budget.name : "Add new Institution"

    return <header>
        <div style={{display: "flex", flexDirection: "row", columnGap: "10px"}}>
            <select className="institution-dropdown" onChange={handleOnChange} value={selected}>
                {budgets.map((x, idx) => {
                    return <option key={idx}>{x.name}</option>
                })}
                <option>Add new Institution</option>
            </select>
            <button>Export Full Budget</button>
        </div>

        {current_budget != null ?
            <nav className="tabNav">
                <Link href={"/dashboard/"  + current_budget._id + "/Student"} className={"tab " + (path.includes("Student") ? "active" : "")}>Student</Link>
                <Link href={"/dashboard/"  + current_budget._id + "/Faculty"} className={"tab " + (path.includes("Faculty") ? "active" : "")}>Faculty</Link>
                <Link href={"/dashboard/"  + current_budget._id + "/SemesterRates"} className={"tab " + (path.includes("SemesterRates") ? "active" : "")}>Per Semester Rates</Link>
                <Link href={"/dashboard/"  + current_budget._id + "/Account"} className={"tab " + (path.includes("Account") ? "active" : "")}>Account</Link>
            </nav>
        : <nav className="tabNav"></nav>}

    </header>
}