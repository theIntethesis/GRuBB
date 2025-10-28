import mongoose from "mongoose"

export interface SalaryAccount extends mongoose.Document {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage
    semester: string, // i'll type this later
    id: string
    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}
const SalaryAccountSchema = new mongoose.Schema<SalaryAccount>({
    rate: Number,
    rateTimeUnit: String,
    percentFTE: Number,
    semester: String,
    id: mongoose.Types.ObjectId
})
export default mongoose.models.SalaryAccount || mongoose.model<SalaryAccount>("SalaryAccount", SalaryAccountSchema)
