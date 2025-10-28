import mongoose from "mongoose"

export interface OverheadCharges extends mongoose.Document {
    charge: number
    description: string
}


const OverheadChargesSchema = new mongoose.Schema<OverheadCharges>({
    charge: {type: Number},
    description: {type: String}
})

export default mongoose.models.OverheadCharges || mongoose.model<OverheadCharges>("OverheadCharges", OverheadChargesSchema)
