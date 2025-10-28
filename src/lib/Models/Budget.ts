import mongoose from "mongoose"

export interface Budget extends mongoose.Document {
    budgetID: string,
    name: string,
    pi: string,
    coPI: string[],
    type: "primary" | "secondary" | "parallel"
}
const BudgetSchema = new mongoose.Schema<Budget>({
    budgetID: mongoose.Types.ObjectId,
    name: {type: String},
    pi: {type: String},
    coPI: {type: [String]},
    type: {type: String}
})

export default mongoose.models.Budget || mongoose.model<Budget>("Budget", BudgetSchema)
