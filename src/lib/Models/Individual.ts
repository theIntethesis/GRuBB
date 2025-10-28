import mongoose from "mongoose"

export interface Individual extends mongoose.Document {
    id: string // uniqueness handled by mongodb
    name: string
}

const IndividualSchema = new mongoose.Schema<Individual>({
    id: mongoose.Types.ObjectId,
    name: {type: String}
})

export default mongoose.models.Individual || mongoose.model<Individual>("Individual", IndividualSchema)
