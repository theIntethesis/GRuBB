import { FacultyForm } from "@/forms/individualForms"
import { DashboardSlugs } from "@/lib/_common"
import {SalaryAccountAPI} from "@/lib/models"
import {SemesterAccountAPI} from "@/lib/models"
import {FacultyAPI} from "@/lib/models"


// new semester
export default async function page({params}: {params: Promise<DashboardSlugs>}) {
    const {budgetID, individualID, year, semester} = await params
    const faculty = await FacultyAPI.getOne({individualID})

    const salaryAccounts = await SalaryAccountAPI.getAll({individualID})
    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})

    // add new semester - need to fetch all semesters they are in
    return <FacultyForm
        budgetID={budgetID}
        faculty={faculty}
        semesterAccounts={semesterAccounts}
        salaryAccounts={salaryAccounts}
        inputSemester={{semester: semester, year: Number(year)}}
    />
}