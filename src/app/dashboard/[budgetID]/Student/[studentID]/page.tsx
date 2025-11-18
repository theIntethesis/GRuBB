import { Individual, Student, StudentAccount } from "@/lib/models"
import {StudentForm} from "../form"
export default async function page({params}) {
    const { studentID } = await params


    const individual = await Individual
        .findById(studentID)
        .lean()


    const student = await Student
        .find({
            indID: individual._id
        })
        .lean()

    const accounts = await StudentAccount
        .find({
            id: individual.id,
        })
        .lean()

    return <StudentForm
        name={individual.name}
        outOfState={student[0].outOfState}
        semesters={accounts.map(x => x.semester)}
        tuition={accounts[0]?.tuition || 0}
        aid={accounts[0]?.aid_received || 0}
    />
    return <div>
        <div>
            name: {individual.name}
            <br/>
            outOfState: {student[0].outOfState ? "true" : "false"}
        </div>

        {accounts.map((x, idx) => {
            return <div key={idx}>
                semester: {x.semester}
                <br/>
                tuition: {x.tuition}
                <br/>
                aid recieved: {x.aid_received}
            </div>
        })}
    </div>
}