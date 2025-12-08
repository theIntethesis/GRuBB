import { DashboardSlugs } from "@/lib/common";
import { BudgetAPI, FacultyAPI, SalaryAccountAPI, SemesterAccountAPI, StudentAccountAPI } from "@/lib/models";

import { I_Budget } from "@/lib/models/budget";
import { fetchAndCalculateSemesterOverview } from "@/lib/utils";


export default async function Page({params}: {params: Promise<DashboardSlugs>}) {
    // this is for a single institution. to do this for all institutions basically do the same thing but over all budgetIDs
    const {budgetID} = await params

    const budget: I_Budget | undefined = await BudgetAPI.getOne({_id: budgetID})

    const semesters = (await SemesterAccountAPI.getAll({budgetID})).map((x) => {return {semester: x.semesterAccount.semester, year: x.semesterAccount.year}})

    const semOverviews = (await Promise.all(semesters.map(async (x, idx) => { return fetchAndCalculateSemesterOverview(budgetID, x.semester, x.year)}))).filter(x => x != undefined)

    return <main>
        <table className="overview-table">
            <thead className="major-cats">
                <tr>
                    <td colSpan={2}>Semester</td>
                    <td colSpan={2}>Number of Students</td>
                    <td colSpan={2}>Number of Employees</td>
                    <td colSpan={3}>Income</td>
                    <td colSpan={4}>Expenditure</td>
                    <td>Balance</td>
                </tr>

            </thead>

            <thead className="minor-cats">
                <tr>
                    <td>Semester</td>
                    <td>Year</td>
                    <td>In State</td>
                    <td>Out of State</td>
                    <td>Faculty</td>
                    <td>Student</td>
                    <td>In State Tuition</td>
                    <td>Out of State Tuition</td>
                    <td>Total</td>
                    <td>Salary</td>
                    <td>Financial Aid</td>
                    <td>Overhead</td>
                    <td>Total</td>
                    <td></td>
                </tr>

            </thead>

            <tbody>

                {semOverviews.map((x, idx) => {
                    return <tr key={idx}>
                        <td>{x.semester}</td>
                        <td>{x.year}</td>
                        <td>{x.numInStateStudents}</td>
                        <td>{x.numOutOfStateStudents}</td>
                        <td>{x.numFacultyEmployees}</td>
                        <td>{x.numStudentEmployees}</td>
                        <td>{x.income.fromInStateTuition}</td>
                        <td>{x.income.fromOutOfStateTuition}</td>
                        <td>{x.incomeTotal}</td>
                        <td>{x.expenditure.fromSalary}</td>
                        <td>{x.expenditure.fromFinancialAid}</td>
                        <td>{x.expenditure.fromOverhead}</td>
                        <td>{x.expenditureTotal}</td>
                        <td>{x.balance}</td>
                    </tr>
                })}
            </tbody>

        </table>
    </main>
}