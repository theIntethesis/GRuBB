import React from "react";
import { BudgetAPI, SemesterAccountAPI } from "@/lib/models";
import { I_Budget } from "@/lib/models/budget";
import { fetchAndCalculateSemesterOverview } from "@/lib/utils";



export default async  function ExportCSV() {

    const budgets = (await BudgetAPI.getAll()).filter(x => x != undefined)

    const csvString = (await Promise.all(budgets.map(async (budget) => {
        if (budget._id == undefined) {
            return []
        }

        const semesters = (await SemesterAccountAPI.getAll({budgetID: budget._id})).map((x) => {return {semester: x.semesterAccount.semester, year: x.semesterAccount.year}})

        const semOverviews = (await Promise.all(semesters.map(async (x) => { return fetchAndCalculateSemesterOverview(budget._id, x.semester, x.year)}))).filter(x => x != undefined)
        return [
            [ budget.name, `${budget.type} Budget` ],
            [ "Primary Investigator", `${budget.pi}` ],
            [ "Co-PIs", ...budget.coPI || []],
            [],
            [ "Semester", "", "Number of Students", "", "Number of Employees", "", "Income", "", "", "Expenditure", "", "", "", "", "Balance"],
            [
                "Semester", "Year",
                "In State", "Out of State" ,
                "Faculty", "Student",
                "In State Tuition", "Out Of State Tuition", "Total",
                "Salary", "Fringe Benefits", "Financial Aid", "Overhead", "Total",
                "Balance"
            ],
            ...semOverviews.map(x => [
                x.semester, x.year,
                x.numInStateStudents, x.numOutOfStateStudents,
                x.numFacultyEmployees, x.numStudentEmployees,
                x.income.fromInStateTuition, x.income.fromOutOfStateTuition, x.income.total,
                x.expenditure.fromSalary, x.expenditure.fringeBenefits.total, x.expenditure.fromFinancialAid, x.expenditure.fromOverhead, x.expenditure.total,
                x.balance
            ]),
            [ "" ]
        ]
        .map(row => row.join(","))
        .join("\n")

    }))).join("\n")


    const blob = new Blob([csvString], {type: 'text/csv'})

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = "download.csv";
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}