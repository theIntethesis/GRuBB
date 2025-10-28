import mongoose from "mongoose"



export interface StudentAccount extends mongoose.Document {
    // tuition - to be calculated
    semester: string, // i'll type this later
    id: string,
    aidRecieved: number,
}

const StudentAccountSchema = new mongoose.Schema<StudentAccount>({
    semester: String,
    id: mongoose.Types.ObjectId,
    aidRecieved: Number
})

export default mongoose.models.StudentAccount || mongoose.model<StudentAccount>("StudentAccount", StudentAccountSchema)
