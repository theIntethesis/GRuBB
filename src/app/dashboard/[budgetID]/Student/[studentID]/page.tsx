import { Student } from "@/lib/models"

export default async function page({params}) {
    const { studentID } = await params
    console.log(studentID)

    const student = await Student
        .find({})
        .where('_id').in([studentID])
        .lean()

    console.log(student)


    return <div>
        {student[0].outOfState}
    </div>
}