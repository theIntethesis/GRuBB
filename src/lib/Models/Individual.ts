import mongoose from "mongoose"

export interface Individual extends mongoose.Document {
    ID: string // uniqueness handled by mongodb
    name: string
}

const IndividualSchema = new mongoose.Schema<Individual>({
    ID: {type: String},
    name: {type: String}
})

export default mongoose.models.Individual || mongoose.model<Individual>("Individual", IndividualSchema)
