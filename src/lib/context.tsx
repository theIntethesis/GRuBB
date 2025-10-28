'use client'
import { createContext, useState, useRef } from "react"
import { Budget } from "./entities";

export const UserContext = createContext({})

export default function SetupContext({ children }: Readonly<{ children: React.ReactNode; }>) {

    const [institutions, setInstitutions]  = useState<Budget[]>([])
    const [selectedInstitution, setSelectedInstitution] = useState<Budget | null>(null)



    const addInstitution = (budget: Budget) => {
        setInstitutions([...institutions, budget])
    }

    const userContext = {
        institutions,
        selectedInstitution,
        setSelectedInstitution,
        addInstitution,
    }

    return <UserContext value={userContext}>
        {children}
    </UserContext>
}
