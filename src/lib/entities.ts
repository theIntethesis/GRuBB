import mongoose from "mongoose"

export interface Individual extends mongoose.Document {
    name: string
}
export interface Student extends Individual {
    outOfState: boolean,
    indID: Individual['_id']
}
export interface Faculty extends Individual {
    role: "faculty" | "staff" | "postdoc",
    indID: Individual['_id']
}
export interface Account extends mongoose.Document {
    semester: string // i'll type this later
}
export interface StudentAccount extends Account {
    // tuition - to be calculated
    aidRecieved: number,
    student_id: Student['_id']
}
export interface SalaryAccount extends Account {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage
    faculty_id: Faculty['_id']
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
    budgetID: Budget['_id'],
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
    institutionName: string,
    primaryInvestigator: string,
    coPIs: string[],
    type: "primary" | "secondary" | "parallel"
}