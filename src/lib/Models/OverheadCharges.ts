import mongoose from "mongoose"

export interface OverheadCharge extends mongoose.Document {
    charge: number
    description: string
}


const OverheadChargesSchema = new mongoose.Schema<OverheadCharge>({
    charge: Number,
    description: String
})

export default mongoose.models.OverheadCharge || mongoose.model<OverheadCharge>("OverheadCharge", OverheadChargesSchema)
