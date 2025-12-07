import StudentForm from "@/forms/individualForms/student"
import { DashboardSlugs } from "@/lib/common"
import {StudentAPI} from "@/lib/models"
import {StudentAccountAPI} from "@/lib/models"
import {SalaryAccountAPI} from "@/lib/models"
import {SemesterAccountAPI} from "@/lib/models"

// add new semester
export default async function page({params}: {params: Promise<DashboardSlugs>}) {
    const {budgetID, individualID} = await params

    const student = await StudentAPI.getOne({individualID})

    const studentAccounts = await StudentAccountAPI.getAll({individualID})
    const salaryAccounts = await SalaryAccountAPI.getAll({individualID})
    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})


    // fetch individual and all a list of all the semesters applicable
    return <StudentForm
        budgetID={budgetID}
        student={student}
        studentAccounts={studentAccounts}
        salaryAccounts={salaryAccounts}
        semesterAccounts={semesterAccounts}
    />
}
