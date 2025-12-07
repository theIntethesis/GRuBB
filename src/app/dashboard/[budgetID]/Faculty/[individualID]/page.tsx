import FacultyForm from "@/forms/individualForms/faculty"
import { DashboardSlugs } from "@/lib/common"
import {SalaryAccountAPI} from "@/lib/models"
import {SemesterAccountAPI} from "@/lib/models"
import {FacultyAPI} from "@/lib/models"

// new semester
export default async function page({params}: {params: Promise<DashboardSlugs>}) {
    const {budgetID, individualID} = await params
    const faculty = await FacultyAPI.getOne({individualID})

    const salaryAccounts = await SalaryAccountAPI.getAll({individualID})
    const semesterAccounts = await SemesterAccountAPI.getAll({budgetID})

    // [TODO] if semesterAccounts is null then do something

    // add new semester - need to fetch all semesters they are in
    return <FacultyForm
        budgetID={budgetID}
        faculty={faculty}
        semesterAccounts={semesterAccounts}
        salaryAccounts={salaryAccounts}
    />
}