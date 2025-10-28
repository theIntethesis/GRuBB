import mongoose from "mongoose"



export interface StudentAccount extends mongoose.Document {
    // tuition - to be calculated
    semester: string, // i'll type this later
    ID: string,
    aidRecieved: number,
}

const StudentAccountSchema = new mongoose.Schema<StudentAccount>({
    semester: {type: String},
    ID: {type: String},
    aidRecieved: {type: Number}
})

export default mongoose.models.StudentAccount || mongoose.model<StudentAccount>("StudentAccount", StudentAccountSchema)
