import mongoose from "mongoose"

export interface OverheadCharges extends mongoose.Document {
    charge: number
    description: string
}


const OverheadChargesSchema = new mongoose.Schema<OverheadCharges>({
    charge: Number,
    description: String
})

export default mongoose.models.OverheadCharges || mongoose.model<OverheadCharges>("OverheadCharges", OverheadChargesSchema)
