import mongoose from "mongoose"
import * as entities from "./entities"

export const IndividualSchema = new mongoose.Schema<entities.Individual>({
    ID: {type: String},
    name: {type: String}
})

export const StudentSchema = new mongoose.Schema<entities.Student>({
    outOfState: {type: Boolean}
})

export const FacultySchema = new mongoose.Schema<entities.Faculty>({
    role: {type: String}
})

export const StudentAccountSchema = new mongoose.Schema<entities.StudentAccount>({
    semester: {type: String},
    ID: {type: String}
})

export const SalaryAccountSchema = new mongoose.Schema<entities.SalaryAccount>({
    rate: {type: Number},
    rateTimeUnit: {type: String},
    percentFTE: {type: Number}
})

export const OverheadChargesSchema = new mongoose.Schema<entities.OverheadCharges>({
    charge: {type: Number},
    description: {type: String}
})

export const TravelProfileSchema = new mongoose.Schema<entities.TravelProfile>({
    perDiem: {type: Number},
    airfare: {type: Number},
    lodging: {type: Number}
})

export const InstitutionalAccountSchema = new mongoose.Schema<entities.InstitutionalAccount>({
    semester: {type: String},
    name: {type: String},
    budgetID: {type: String},
    inStateTuitionRate: {type: Number},
    outOfStateTuitionRate: {type: Number},
    tuitionIncrease: {type: Number},
    facultyFBR: {type: Number},
    studentFBR: {type: Number},
    postDocFBR: {type: Number}
})

export const BudgetSchema = new mongoose.Schema<entities.Budget>({
    budgetID: {type: String},
    institutionName: {type: String},
    primaryInvestigator: {type: String},
    coPIs: {type: [String]},
    type: {type: String}
})
