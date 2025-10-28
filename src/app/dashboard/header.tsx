'use client'
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Header({budgets, current_budget}: {budgets: [any], current_budget: any}) {
    const path = usePathname()

    const handleOnChange = (e) => {
        const ret = budgets.filter((x) => x.name == e.target.value)
        if (ret.length == 1) {
            console.log(ret[0])
            redirect("/dashboard/" + ret[0]._id + "/Student")
        }
        else {
            redirect ("/dashboard")
        }


    }

    // we'lll actually want to create a new budget here...
    let selected = current_budget != null ? current_budget.name : "Add new Institution"

    return <header>
        <select className="institution-dropdown" onChange={handleOnChange} value={selected}>
                {budgets.map((x, idx) => {
                    console.log(x.pi)
                    return <option key={idx}>{x.name}</option>
                })}
                <option>Add new Institution</option>
        </select>
        {current_budget != null ?
            <nav className="tabNav">
                <Link href="Student" className={"tab " + (path.endsWith("Student") ? "active" : "")}>Student</Link>
                <Link href="Faculty" className={"tab " + (path.endsWith("Faculty") ? "active" : "")}>Faculty</Link>
                <Link href="Rates" className={"tab " + (path.endsWith("Rates") ? "active" : "")}>Rates</Link>
                <Link href="Account" className={"tab " + (path.endsWith("Account") ? "active" : "")}>Account</Link>
            </nav>
        : <></>}

    </header>
}