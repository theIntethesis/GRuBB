import mongoose from "mongoose"

export interface Student extends mongoose.Document {
    outOfState: boolean
}
const StudentSchema = new mongoose.Schema<Student>({
    outOfState: {type: Boolean}
})
export default mongoose.models.Student || mongoose.model<Student>("Student", StudentSchema)
