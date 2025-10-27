export interface Individual {
    ID: any // unique
    name: string
}
export interface Student extends Individual {
    outOfState: boolean
}
export interface Faculty extends Individual {
    type: "faculty" | "staff" | "postdoc"
}
export interface Account {
    semester: string // i'll type this later
    ID: any
}
export interface StudentAccount extends Account {
    // tuition - to be calculated
    aidRecieved: number,
}
export interface SalaryAccount extends Account {
    rate: number,
    rateTimeUnit: "hour" | "yearly",
    fullTimeEquiv: number,

    // payment - calculated
    // fringe benefits rate - calculated,
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
    primaryInvestigator: string,
    coPIs: string[],
    type: "primary" | "secondary" | "parallel"
}