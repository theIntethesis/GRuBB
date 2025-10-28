import mongoose from "mongoose"
import * as entities from "./entities"

export const IndividualSchema = new mongoose.Schema<entities.Individual>({
    name: {type: String}
})

export const StudentSchema = new mongoose.Schema<entities.Student>({
    outOfState: {type: Boolean},
    indID: {type: mongoose.Types.ObjectId}
})

export const FacultySchema = new mongoose.Schema<entities.Faculty>({
    role: {type: String},
    indID: {type: mongoose.Types.ObjectId}
})

export const StudentAccountSchema = new mongoose.Schema<entities.StudentAccount>({
    semester: {type: String},
    student_id: {type: mongoose.Types.ObjectId}
})

export const SalaryAccountSchema = new mongoose.Schema<entities.SalaryAccount>({
    rate: {type: Number},
    rateTimeUnit: {type: String},
    percentFTE: {type: Number},
    faculty_id: {type: mongoose.Types.ObjectId}
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
    budgetID: {type: mongoose.Types.ObjectId},
    inStateTuitionRate: {type: Number},
    outOfStateTuitionRate: {type: Number},
    tuitionIncrease: {type: Number},
    facultyFBR: {type: Number},
    studentFBR: {type: Number},
    postDocFBR: {type: Number}
})

export const BudgetSchema = new mongoose.Schema<entities.Budget>({
    institutionName: {type: String},
    primaryInvestigator: {type: String},
    coPIs: {type: [String]},
    type: {type: String}
})
