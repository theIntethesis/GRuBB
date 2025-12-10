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
        const account = await  SalaryAccountAPI.getOne({individualID: x, semester: semester, year: year})
        const faculty = await FacultyAPI.getOne({individualID: x})

        if (account != undefined && faculty != undefined) {
            return {
                account: account,
                role: faculty?.faculty.role
            }
        }
    }) || [])).filter(n => n != undefined)


    const salaryAccounts = [...salaryFacultyAccounts.map(x => x.account), ...salaryStudentAccounts]

    const facultyStaffSalaryAccs = salaryFacultyAccounts.filter((x) => x.role == "Faculty" || x.role == "Staff")
    const postDocSalaryAccs = salaryFacultyAccounts.filter((x) => x.role == "Post-Doc")

    const fringeBenefits = {
        fromStudent: -1 * salaryStudentAccounts.map((x) => calculatePayment(x) * semesterAcc.semesterAccount.studentFBR / 100).reduce((accumulator, val) => accumulator + val, 0),
        fromFaculty: -1 * facultyStaffSalaryAccs.map((x) =>  calculatePayment(x.account) * semesterAcc.semesterAccount.facultyFBR / 100).reduce((accumulator, val) => accumulator + val, 0),
        fromPostDoc: -1 * postDocSalaryAccs.map((x) => calculatePayment(x.account) * semesterAcc.semesterAccount.postDocFBR / 100).reduce((accumulator, val) => accumulator + val, 0),
        total: 0
    }
    fringeBenefits.total = fringeBenefits.fromFaculty + fringeBenefits.fromStudent + fringeBenefits.fromPostDoc

    const expenditure = {
        fromSalary: -1 * salaryAccounts.map((x) => calculatePayment(x)).reduce((accumulator, val) => accumulator + val, 0),
        fromFinancialAid: -1 * studentAccounts.map((x) => x.account?.aidRecieved).reduce((accumulator, val) => accumulator + val, 0),
        fromOverhead: -1 * semesterAcc.overheadCharge.charge,
        fringeBenefits,
        total: 0
    }
    expenditure.total = expenditure.fromFinancialAid + expenditure.fromSalary + expenditure.fromOverhead + expenditure.fringeBenefits.total

    const income = {
        fromInStateTuition: studentAccounts.filter(x => !x.outOfState).map((x) => semesterAcc.semesterAccount.inStateTuitionRate).reduce((accumulator, val) => accumulator + val, 0),
        fromOutOfStateTuition: studentAccounts.filter(x => x.outOfState).map((x) => semesterAcc.semesterAccount.outOfStateTuitionRate).reduce((accumulator, val) => accumulator + val, 0),
        total: 0
    }
    income.total = income.fromInStateTuition + income.fromOutOfStateTuition



    return {
        expenditure,
        income,
        balance: income.total + expenditure.total,
        numInStateStudents: studentAccounts.filter(x => !x.outOfState).length,
        numOutOfStateStudents: studentAccounts.filter(x => x.outOfState).length,
        numStudentEmployees: salaryStudentAccounts.length,
        numFacultyEmployees: salaryFacultyAccounts.length,
        semester: semester,
        year: year
    }
}
