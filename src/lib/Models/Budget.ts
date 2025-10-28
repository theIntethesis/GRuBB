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
    name: String,
    pi: String,
    coPI: [String],
    type: String
})

export default mongoose.models.Budget || mongoose.model<Budget>("Budget", BudgetSchema)
