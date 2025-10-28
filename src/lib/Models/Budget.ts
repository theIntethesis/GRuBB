import mongoose from "mongoose"

export interface Budget extends mongoose.Document {
    budgetID: string,
    institutionName: string,
    primaryInvestigator: string,
    coPIs: string[],
    type: "primary" | "secondary" | "parallel"
}
const BudgetSchema = new mongoose.Schema<Budget>({
    budgetID: {type: String},
    institutionName: {type: String},
    primaryInvestigator: {type: String},
    coPIs: {type: [String]},
    type: {type: String}
})

export default mongoose.models.Budget || mongoose.model<Budget>("Budget", BudgetSchema)
