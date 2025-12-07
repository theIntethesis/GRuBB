import { DashboardSlugs } from "@/lib/common";
import { BudgetAPI, FacultyAPI, SalaryAccountAPI, SemesterAccountAPI, StudentAccountAPI } from "@/lib/models";
import { StudentAPI } from "@/lib/models";
import { I_Budget } from "@/lib/models/budget";
import { FacultyIndividual } from "@/lib/models/faculty";
import { I_SalaryAccount } from "@/lib/models/salaryAccount";
import { SemesterAccountCombo } from "@/lib/models/semesterAccount";
import { StudentIndividual } from "@/lib/models/student";
import { I_StudentAccount } from "@/lib/models/studentAccount";

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    // this is for a single institution. to do this for all institutions basically do the same thing but over all budgetIDs
    const {budgetID} = await params

    const budget: I_Budget | undefined = await BudgetAPI.getOne({_id: budgetID})

    const students: StudentIndividual[] = await StudentAPI.getAll({budgetID})
    const faculty: FacultyIndividual[] = await FacultyAPI.getAll({budgetID})

    const semesterAccounts: SemesterAccountCombo[] = await SemesterAccountAPI.getAll({budgetID})

    const studentAccounts: I_StudentAccount[] = []
    const salaryAccounts: I_SalaryAccount[] = []

    for (let i = 0; i < students.length; i++) {
        const id = students[i].student.individualID
        if (id != undefined) {
            const accs = await StudentAccountAPI.getAll({individualID: id})
            studentAccounts.push(...accs)
        }
    }


    for (let i = 0; i < students.length; i++) {
        const id = students[i].student.individualID
        if (id != undefined) {
            const accs = await SalaryAccountAPI.getAll({individualID: id})
            salaryAccounts.push(...accs)
        }
    }


    for (let i = 0; i < faculty.length; i++) {
        const id = faculty[i].faculty.individualID
        if (id != undefined) {
            const accs = await SalaryAccountAPI.getAll({individualID: id})
            salaryAccounts.push(...accs)
        }
    }

    console.log(budget)
    console.log(studentAccounts)
    console.log(salaryAccounts)
    console.log(semesterAccounts)


    // to get the FBR, tuition rate, you can match against semester, year on all three of these

    return <main>

    </main>
}