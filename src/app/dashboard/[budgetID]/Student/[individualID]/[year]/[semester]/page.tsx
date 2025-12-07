import { StudentForm } from "@/forms/individualForms"

import { DashboardSlugs } from "@/lib/_common"
import {SalaryAccountAPI} from "@/lib/models"
import {SemesterAccountAPI} from "@/lib/models"
import {StudentAPI} from "@/lib/models"
import {StudentAccountAPI} from "@/lib/models"
// edit a semester
export default async function page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID, individualID, semester, year } = await params

    const student = await StudentAPI.getOne({individualID})

    const studentAccounts = await StudentAccountAPI.getAll({individualID})
    const salaryAccounts = await SalaryAccountAPI.getAll({individualID})
    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})

    // search these values for the selected semester/year

    /*
    map those values to {semester, year}[]
    */

    // fetch indiviudal and semester
    // will also need a list of all the semesters applicable


    return <StudentForm
        budgetID={budgetID}
        student={student}
        studentAccounts={studentAccounts}
        salaryAccounts={salaryAccounts}
        semesterAccounts={semesterAccounts}
        inputSemester={{semester: semester, year: Number(year)}}
    />
}
