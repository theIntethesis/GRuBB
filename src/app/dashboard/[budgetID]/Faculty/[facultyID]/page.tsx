import { Individual, Faculty, SalaryAccount } from "@/lib/models"
import {FacultyForm} from "../form"

export default async function page({params}) {
    const { facultyID } = await params



    const individual = await Individual
        .findById(facultyID)
        .lean()



    const faculty = await Faculty
        .find({
            indID: individual._id
        })
        .lean()


    const accounts = await SalaryAccount
        .find({
            id: faculty[0]._id
        })
        .lean()

    // Need to get FBR and pass in.
    return <FacultyForm
        name={individual.name}
        role={faculty[0].role}
        semesters={accounts.map(x => x.semester)}
        rate={accounts[0]?.rate || 0}
        rateUnit={accounts[0]?.rateTimeUnit || "Hour"}
        percentFTE={accounts[0]?.percentFTE || 0}
    />
    return <div>
        <div>
            name: {individual.name}
            <br/>
            role: {faculty[0].role}
        </div>
        {accounts.map((x, idx) => {

            return <div key={idx}>
                {x.semester}
                <br/>
                rate: {x.rate}/{x.rateTimeUnit}
                <br/>
                {x.percentFTE * 40} hours/week
            </div>
        })}
    </div>
}