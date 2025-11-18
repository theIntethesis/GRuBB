import { Individual, Faculty, SalaryAccount } from "@/lib/models"
import {FacultyForm} from "../form"

export default async function page({params}: {params: {budgetID: string, facultyID: string}}) {
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
}