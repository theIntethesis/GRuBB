import { Semester, semesterEq } from "./common";
import { BudgetAPI, SemesterAccountAPI, FacultyAPI, SalaryAccountAPI, StudentAPI, StudentAccountAPI } from "./models";
import {  } from "./models";
import { I_SalaryAccount } from "./models/salaryAccount";

export function castFormDataToObject(formData: FormData) {
    const obj: Object =  Object.fromEntries(formData.entries())

    return JSON.parse(JSON.stringify(obj))
}

export function calculatePayment(acc: I_SalaryAccount) {
    switch (acc.rateTimeUnit) {
        case "Hour":
            return (acc.rate * ((acc.percentFTE / 100) * 40) * 15) // assuming 15 weeks in a semester and that they don't get paid over the summer. this is probably a gross miscalculation but I don't care.

        case "Year":
            return (acc.rate)

    }
}

export async function fetchAndCalculateSemesterOverview(budgetID: string, semester: Semester, year: number) {

    const budget = await BudgetAPI.getOne({_id: budgetID})
    const semesterAcc = await SemesterAccountAPI.getOne({budgetID, semester, year})

    if (semesterAcc == undefined) {
        return undefined
    }

    const studentAccounts = (await Promise.all(budget?.students?.map(async (x) => {
        // console.log(x)
        // console.log(semester)
        // console.log(year)
        const student = await StudentAPI.getOne({individualID: x})
        const account = await StudentAccountAPI.getOne({individualID: x, semester: semester, year: year})

        if (student != undefined && account != undefined) {
            return  {
                outOfState: student?.student.outOfState,
                account: account
            }
        }
        return undefined

    }) || [])).filter(n => n != undefined)

    const salaryStudentAccounts = (await Promise.all(budget?.students?.map(async (x) => {
        return await SalaryAccountAPI.getOne({individualID: x, semester: semester, year: year})
    }) || [])).filter(n => n != undefined)

    const salaryFacultyAccounts = (await Promise.all(budget?.faculty?.map(async (x) => {
        return await SalaryAccountAPI.getOne({individualID: x, semester: semester, year: year})
    }) || [])).filter(n => n != undefined)

    const salaryAccounts = [...salaryFacultyAccounts, ...salaryStudentAccounts]

    const expenditure = {
        fromSalary: salaryAccounts.map((x) => calculatePayment(x)).reduce((accumulator, val) => accumulator + val, 0),
        fromFinancialAid: studentAccounts.map((x) => x.account?.aidRecieved).reduce((accumulator, val) => accumulator + val, 0),
        fromOverhead: semesterAcc.overheadCharge.charge
    }
    const income = {
        fromInStateTuition: studentAccounts.filter(x => !x.outOfState).map((x) => semesterAcc.semesterAccount.inStateTuitionRate).reduce((accumulator, val) => accumulator + val, 0),
        fromOutOfStateTuition: studentAccounts.filter(x => x.outOfState).map((x) => semesterAcc.semesterAccount.outOfStateTuitionRate).reduce((accumulator, val) => accumulator + val, 0)
    }

    const expenditureTotal = expenditure.fromFinancialAid + expenditure.fromSalary + expenditure.fromOverhead
    const incomeTotal =  income.fromInStateTuition + income.fromOutOfStateTuition

    return {
        expenditure,
        income,
        expenditureTotal,
        incomeTotal,
        balance: incomeTotal - expenditureTotal,
        numInStateStudents: studentAccounts.filter(x => !x.outOfState).length,
        numOutOfStateStudents: studentAccounts.filter(x => x.outOfState).length,
        numStudentEmployees: salaryStudentAccounts.length,
        numFacultyEmployees: salaryFacultyAccounts.length,
        semester: semester,
        year: year
    }
}