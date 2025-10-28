export interface Individual {
    ID: string // uniqueness handled by mongodb
    name: string
}
export interface Student extends Individual {
    outOfState: boolean
}
export interface Faculty extends Individual {
    role: "faculty" | "staff" | "postdoc"
}
export interface Account {
    semester: string // i'll type this later
    ID: string
}
export interface StudentAccount extends Account {
    // tuition - to be calculated
    aidRecieved: number,
}
export interface SalaryAccount extends Account {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage

    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}

export interface OverheadCharges {
    charge: number
    description: string
}

export interface TravelProfile {
    perDiem: number
    airfare: number
    lodging: number
}

export interface InstitutionalAccount {
    semester: string,
    budgetID: any,
    // incoming,
    // outgoing,
    inStateTuitionRate: number,
    outOfStateTuitionRate: number,
    tuitionIncrease: number,
    facultyFBR: number,
    studentFBR: number,
    postDocFBR: number,
    // incomingTuition - calculated,
    // aidAllocated - calculated
}

export interface Budget {
    budgetID: any,
    institutionName: string,
    primaryInvestigator: string,
    coPIs: string[],
    type: "primary" | "secondary" | "parallel"
}