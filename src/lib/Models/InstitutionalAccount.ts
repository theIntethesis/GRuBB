import mongoose from "mongoose"

export interface InstitutionalAccount extends mongoose.Document {
    semester: string,
    name: string,
    budgetID: string,
    // incoming,
    // outgoing,
    inStateTuitionRate: number,
    outOfStateTuitionRate: number,
    tuitionIncrease: number,
    facultyFBR: number,
    studentFBR: number,
    postDocFBR: number,
    // incomingTuition - calculated,
    // aidAllocated - calculated
}

const InstitutionalAccountSchema = new mongoose.Schema<InstitutionalAccount>({
    semester: {type: String},
    name: {type: String},
    budgetID: {type: String},
    inStateTuitionRate: {type: Number},
    outOfStateTuitionRate: {type: Number},
    tuitionIncrease: {type: Number},
    facultyFBR: {type: Number},
    studentFBR: {type: Number},
    postDocFBR: {type: Number}
})
export default mongoose.models.InstitutionalAccount || mongoose.model<InstitutionalAccount>("InstitutionalAccount", InstitutionalAccountSchema)
