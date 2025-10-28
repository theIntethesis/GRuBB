import mongoose from "mongoose"

export interface Individual extends mongoose.Document {
    ID: string // uniqueness handled by mongodb
    name: string
}
export interface Student extends Individual {
    outOfState: boolean
}
export interface Faculty extends Individual {
    role: "faculty" | "staff" | "postdoc"
}
export interface Account extends mongoose.Document {
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

export interface OverheadCharges extends mongoose.Document {
    charge: number
    description: string
}

export interface TravelProfile extends mongoose.Document {
    perDiem: number
    airfare: number
    lodging: number
}

export interface InstitutionalAccount extends mongoose.Document {
    semester: string,
    name: string,
    budgetID: string,
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

export interface Budget extends mongoose.Document {
    budgetID: string,
    institutionName: string,
    primaryInvestigator: string,
    coPIs: string[],
    type: "primary" | "secondary" | "parallel"
}