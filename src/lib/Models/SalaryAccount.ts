import mongoose from "mongoose"

export interface SalaryAccount extends mongoose.Document {
    rate: number,
    rateTimeUnit: "hour" | "year",
    percentFTE: number, // Percentage
    semester: string, // i'll type this later
    ID: string
    // payment - calculated (payment)
    // fringe benefits rate - calculated, (fringeRate)
}
const SalaryAccountSchema = new mongoose.Schema<SalaryAccount>({
    rate: {type: Number},
    rateTimeUnit: {type: String},
    percentFTE: {type: Number},
    semester: {type: String},
    ID: {type: String}
})
export default mongoose.models.SalaryAccount || mongoose.model<SalaryAccount>("SalaryAccount", SalaryAccountSchema)
