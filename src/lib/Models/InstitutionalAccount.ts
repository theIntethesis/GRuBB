import mongoose from "mongoose"

export interface InstitutionalAccount extends mongoose.Document {
    semester: string,
    name: string,
    id: string,
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
    studentAccounts: string[],
    salaryAccounts: string[]
}

const InstitutionalAccountSchema = new mongoose.Schema<InstitutionalAccount>({
    semester: String,
    name: String,
    id: mongoose.Types.ObjectId,
    inStateTuitionRate: Number,
    outOfStateTuitionRate: Number,
    tuitionIncrease: Number,
    facultyFBR: Number,
    studentFBR: Number,
    postDocFBR: Number,
    studentAccounts: [mongoose.Types.ObjectId],
    salaryAccounts: [mongoose.Types.ObjectId]
})
export default mongoose.models.InstitutionalAccount || mongoose.model<InstitutionalAccount>("InstitutionalAccount", InstitutionalAccountSchema)
