'use client'

import { I_Budget } from "@/lib/models/budget";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Header({budgets, currentBudget}: {budgets: I_Budget[], currentBudget?: I_Budget}) {
    const path = usePathname()

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ret = budgets.filter((x) => x.name == e.target.value)
        if (ret.length == 1) {
            redirect("/dashboard/" + ret[0]._id)
        }
        else {
            redirect ("/dashboard")
        }
    }

    // we'lll actually want to create a new budget here...
    let selected = currentBudget != null ? currentBudget.name : "Add new Institution"

    const tabs = [{path: "SemesterRates", display: "Per Semester Rates"}, "Student", "Faculty", "Account", "Overview"]

    return <header>
        <div style={{display: "flex", flexDirection: "row", columnGap: "inherit"}}>
            <select className="institution-dropdown" onChange={handleOnChange} value={selected}>
                {budgets.map((x, idx) => {
                    return <option key={idx}>{x.name}</option>
                })}
                <option>Add new Institution</option>
            </select>
            <button className="submitButton">Export Full Budget</button>
        </div>

        {currentBudget != null ?
            <nav className="tabNav">
                {tabs.map((x) => {
                    return x instanceof Object
                        ? <Link key={x.path} href={`/dashboard/${currentBudget._id}/${x.path}`} className={`tab ${path.includes(x.path) ? "active" : ""}`}>{x.display}</Link>
                        : <Link key={x} href={`/dashboard/${currentBudget._id}/${x}`} className={`tab ${path.includes(x) ? "active" : ""}`}>{x}</Link>
                })}
            </nav>
        : <nav className="tabNav"></nav>}

    </header>
}