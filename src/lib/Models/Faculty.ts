import mongoose from "mongoose"

export interface Faculty extends mongoose.Document  {
    role: "faculty" | "staff" | "postdoc"
}
const FacultySchema = new mongoose.Schema<Faculty>({
    role: String
})

export default mongoose.models.Faculty || mongoose.model<Faculty>("Faculty", FacultySchema)
