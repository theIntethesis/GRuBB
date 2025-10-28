import mongoose from "mongoose"

export interface TravelProfile extends mongoose.Document {
    perDiem: number
    airfare: number
    lodging: number
}
const TravelProfileSchema = new mongoose.Schema<TravelProfile>({
    perDiem: {type: Number},
    airfare: {type: Number},
    lodging: {type: Number}
})
export default mongoose.models.TravelProfile || mongoose.model<TravelProfile>("TravelProfile", TravelProfileSchema)
