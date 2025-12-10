import {BudgetAPI, SalaryAccountAPI, StudentAccountAPI, StudentAPI} from '@/lib/models'
import SemesterForm from '@/forms/SemesterSetupForm'
import { DashboardSlugs, semesterEq } from '@/lib/common'
import {SemesterAccountAPI} from '@/lib/models'
import { redirect } from 'next/navigation'
import { calculatePayment, fetchAndCalculateSemesterOverview } from '@/lib/utils'

export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    const { budgetID, semester, year } = await params

    const budget = await BudgetAPI.getOne({_id: budgetID})

    const semesterAcc = await SemesterAccountAPI.getAll({budgetID})

    const semOverview = await fetchAndCalculateSemesterOverview(budgetID, semester, year)

    if (semOverview == undefined) {
        return
    }

    if (budget != undefined) {

        return <>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <h1>{semester} {year}</h1>
                        </td>
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <tr><td colSpan={2}><h2>Overview</h2></td></tr>
                    <tr>
                        <td><label>Number of Students:</label></td>
                        <td>{semOverview.numInStateStudents + semOverview.numOutOfStateStudents} ({semOverview.numInStateStudents} In State), ({semOverview.numOutOfStateStudents} Out of State)</td>
                    </tr>
                    <tr>
                        <td><label>Number of Employees:</label></td>
                        <td>{semOverview.numStudentEmployees + semOverview.numFacultyEmployees} ({semOverview.numStudentEmployees}  Students), ({semOverview.numFacultyEmployees} Faculty)</td>
                    </tr>
                    <tr><td colSpan={2}><h3>Expenditure</h3></td></tr>
                    <tr>
                        <td><label>From Salary:</label></td>
                        <td>$ {semOverview.expenditure.fromSalary}</td>
                    </tr>
                    <tr>
                        <td><label>From Fringe Benefits:</label></td>
                        <td>$ {semOverview.expenditure.fringeBenefits.total} (Faculty: $ {semOverview.expenditure.fringeBenefits.fromFaculty}, PostDoc: $ {semOverview.expenditure.fringeBenefits.fromPostDoc}, Student: $ {semOverview.expenditure.fringeBenefits.fromStudent})</td>
                    </tr>
                    <tr>
                        <td><label>From Financial Aid:</label></td>
                        <td>$ {semOverview.expenditure.fromFinancialAid}</td>
                    </tr>
                    <tr>
                        <td><label>From Overhead:</label></td>
                        <td>$ {semOverview.expenditure.fromOverhead}</td>
                    </tr>
                    <tr><td colSpan={2}><h3>Income</h3></td></tr>
                    <tr>
                        <td><label>From Tuition:</label></td>
                        <td>$ {semOverview.income.fromInStateTuition + semOverview.income.fromOutOfStateTuition} $ ({semOverview.income.fromInStateTuition} In State), ($ {semOverview.income.fromOutOfStateTuition} Out of State)</td>
                    </tr>
                    <tr><td colSpan={2}><h3>Summary</h3></td></tr>
                    <tr>
                        <td><label>Expenditure:</label></td>
                        <td>$ {semOverview.expenditure.total}</td>
                    </tr>
                    <tr>
                        <td><label>Income:</label></td>
                        <td>$ {semOverview.income.total}</td>
                    </tr>
                    <tr>
                        <td><label>Balance:</label></td>
                        <td>$ {semOverview.balance}</td>
                    </tr>
                </tbody>
            </table>
            <SemesterForm budget={budget} semesters={semesterAcc} selectedSemester={{semester, year}}/>
        </>
    }
    else {
        redirect("/dashboard")
    }


}