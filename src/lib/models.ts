import mongoose from "mongoose"

export interface I_Budget extends mongoose.Document {
    budgetID: string,
    name: string,
    pi: string,
    coPI: string[],
    type: "primary" | "secondary" | "parallel"
}
export interface I_Faculty extends mongoose.Document  {
    role: "faculty" | "staff" | "postdoc"
}
export interface I_Individual extends mongoose.Document {
    id: string // uniqueness handled by mongodb
    name: string
}
export interface I_InstitutionalAccount extends mongoose.Document {
    semester: string,
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
    studentAccounts: string[],
    salaryAccounts: string[],
    travelProfile: string,
    overheadCharge: string
}
export interface I_OverheadCharge extends mongoose.Document {
    charge: number
    description: string
}
export interface I_SalaryAccount extends mongoose.Document {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage
    semester: string, // i'll type this later
    id: string
    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}
export interface I_Student extends mongoose.Document {
    outOfState: boolean
}
export interface I_StudentAccount extends mongoose.Document {
    // tuition - to be calculated
    semester: string, // i'll type this later
    id: string,
    aidRecieved: number,
}
export interface I_TravelProfile extends mongoose.Document {
    perDiem: number
    airfare: number
    lodging: number
}

const BudgetSchema = new mongoose.Schema<I_Budget>({
    budgetID: mongoose.Types.ObjectId,
    name: String,
    pi: String,
    coPI: [String],
    type: String
})
const FacultySchema = new mongoose.Schema<I_Faculty>({
    role: String
})
const IndividualSchema = new mongoose.Schema<I_Individual>({
    id: mongoose.Types.ObjectId,
    name: String
})
const InstitutionalAccountSchema = new mongoose.Schema<I_InstitutionalAccount>({
    semester: String,
    budgetID: mongoose.Types.ObjectId,
    inStateTuitionRate: Number,
    outOfStateTuitionRate: Number,
    tuitionIncrease: Number,
    facultyFBR: Number,
    studentFBR: Number,
    postDocFBR: Number,
    studentAccounts: [mongoose.Types.ObjectId],
    salaryAccounts: [mongoose.Types.ObjectId],
    travelProfile: mongoose.Types.ObjectId,
    overheadCharge: mongoose.Types.ObjectId
})
const OverheadChargesSchema = new mongoose.Schema<I_OverheadCharge>({
    charge: Number,
    description: String
})
const SalaryAccountSchema = new mongoose.Schema<I_SalaryAccount>({
    rate: Number,
    rateTimeUnit: String,
    percentFTE: Number,
    semester: String,
    id: mongoose.Types.ObjectId
})
const StudentSchema = new mongoose.Schema<I_Student>({
    outOfState: Boolean
})
const StudentAccountSchema = new mongoose.Schema<I_StudentAccount>({
    semester: String,
    id: mongoose.Types.ObjectId,
    aidRecieved: Number
})
const TravelProfileSchema = new mongoose.Schema<I_TravelProfile>({
    perDiem: Number,
    airfare: Number,
    lodging: Number
})

export const Budget = mongoose.models.Budget || mongoose.model<I_Budget>("Budget", BudgetSchema, "budgets")
export const Faculty =  mongoose.models.Faculty || mongoose.model<I_Faculty>("Faculty", FacultySchema, "facultys")
export const Individual = mongoose.models.Individual || mongoose.model<I_Individual>("Individual", IndividualSchema, "individuals")
export const InstitutionalAccount =  mongoose.models.InstitutionalAccount || mongoose.model<I_InstitutionalAccount>("InstitutionalAccount", InstitutionalAccountSchema, "institutionalaccounts")
export const OverheadCharge = mongoose.models.OverheadCharge || mongoose.model<I_OverheadCharge>("OverheadCharge", OverheadChargesSchema, "overheadcharges")
export const SalaryAccount = mongoose.models.SalaryAccount || mongoose.model<I_SalaryAccount>("SalaryAccount", SalaryAccountSchema, "salarys")
export const Student = mongoose.models.Student || mongoose.model<I_Student>("Student", StudentSchema, "students")
export const StudentAccount = mongoose.models.StudentAccount || mongoose.model<I_StudentAccount>("StudentAccount", StudentAccountSchema, "studentaccounts")
export const TravelProfile =  mongoose.models.TravelProfile || mongoose.model<I_TravelProfile>("TravelProfile", TravelProfileSchema, "travelprofiles")
