"use client"
import { SemesterAccountCombo } from "@/lib/models/semesterAccount"
import { SemesterCombo, semesterEq } from "@/lib/common"
import { I_Student, StudentIndividual } from "@/lib/models/student"
import { I_StudentAccount } from "@/lib/models/studentAccount"
import { useState, useEffect, Dispatch } from "react"
import { getSemesterData, ChooseSemesterDropdown, IndividualLine, SalaryAccountSection, SelectSemesterDropdown } from "./common"
import { redirect } from "next/navigation"
import Form from "next/form"
import { I_SalaryAccount } from "@/lib/models/salaryAccount"
import { castFormDataToObject } from "@/lib/utils"
import { StudentAccountAPI, StudentAPI } from "@/lib/models"
import { I_StudentPK } from "@/lib/models/student"
import { SalaryAccountAPI } from "@/lib/models"

function StudentLine({student}: {student?: I_Student}) {
    return <tr>
        <td>
            <label>Out of State:</label>
        </td>
        <td>
            <input type="checkbox" name="outOfState" style={{height: "unset", width: "unset"}} defaultChecked={student != null ? student.outOfState : false}/>
        </td>
    </tr>
}

function StudentSalaryAccountSection(
    {semesterAccounts, currentSemester, salaryAccounts,  showSalary, setShowSalary }:
    {semesterAccounts: any[], currentSemester: SemesterCombo, salaryAccounts?: I_SalaryAccount[], showSalary: boolean, setShowSalary: Dispatch<any>}) {
    // some sort of usestate that when a button is pressed it reveals salary account section
    // only if salary account is null

    const onShowSalary = () => {
        setShowSalary(true)
    }
    const onHideSalary = () => {
        setShowSalary(false)
    }

    return <>
        {!showSalary ? <tr>
            <td>
                <button type="button" onClick={onShowSalary} className="actionButton submitButton" >Add Salary</button>
            </td>
        </tr> : <>
            <SalaryAccountSection role={"Student"} salaryAccounts={salaryAccounts} semesterAccounts={semesterAccounts} currentSemester={currentSemester}/>
            <tr><td><button onClick={onHideSalary} className="actionButton warning">Remove Salary</button></td></tr>
        </>}

    </>
}

function StudentAccountSection(
    {student, studentAccounts, semesterAccounts, currentSemester }:
    {student: I_Student, studentAccounts?: I_StudentAccount[], semesterAccounts: SemesterAccountCombo[], currentSemester: SemesterCombo}
) {
    // student account stuff
    const [tuitionRate, setTuitionRate] = useState(0)

    useEffect(() => {
        const account = semesterAccounts.map(x => x.semesterAccount).find((val) => semesterEq(val, currentSemester))
        if (account != undefined) {
            setTuitionRate(student.outOfState ? account.outOfStateTuitionRate : account.inStateTuitionRate)
        }
        // console.log(account)

    }, [currentSemester, semesterAccounts])

    const studentAccount = studentAccounts?.find((val) => semesterEq(val, currentSemester))

    return <>
        <tr><td colSpan={2}><h2>Tuition</h2></td></tr>
        <tr>
            <td><label>Tuition:</label></td>
            <td><div className="inputOuterLeft">$ <p>{tuitionRate}</p></div></td>
        </tr>
        <tr>
            <td><label htmlFor="aidRecieved">Aid Received:</label></td>
            <td><div className="inputOuterLeft">$<input type="number" id="aidRecieved" name="aidRecieved" defaultValue={studentAccount?.aidRecieved || 0}/></div></td>
        </tr>
    </>
}


// individual == null implies everything else is null
export default function StudentForm(
    {budgetID,  student, studentAccounts, salaryAccounts, semesterAccounts, inputSemester}:
    {budgetID: string, student?: StudentIndividual, studentAccounts?: I_StudentAccount[], salaryAccounts?: I_SalaryAccount[], semesterAccounts: SemesterAccountCombo[], inputSemester?: SemesterCombo}
) {
    const {semesters, absentSemesters} = getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], studentAccounts || [])

    if (inputSemester == undefined && absentSemesters.length == 0 && student != undefined) {
        redirect(`/dashboard/${budgetID}/Student/${student.student.individualID}/${semesters[0].year}/${semesters[0].semester}`)
    }

    const [currentSemester, setCurrentSemester] = useState(inputSemester || absentSemesters[0])

    const initialShowSalary = inputSemester != undefined ? (salaryAccounts?.find(x => semesterEq(x, inputSemester)) != undefined) : false

    const [showSalary, setShowSalary] = useState(initialShowSalary)


    const onSubmit = (formData: FormData) => {
        if (student != undefined) {
            return
        }

        const vals = castFormDataToObject(formData)

        StudentAPI.create({
            student: {
                outOfState: vals.outOfState == "on"
            },
            individual: {
                name: vals.name
            }
        }, {budgetID})
    }

    const onUpdate = (formData: FormData) => {
        if (student == undefined || student.student.individualID == undefined) {
            return
        }

        const vals = castFormDataToObject(formData)

        console.log(vals)

        StudentAPI.modify({
            student: {
                ...(student.student as I_StudentPK),
                outOfState: vals.outOfState == "on"
            },
            individual: {
                name: vals.name
            }
        })

        if (inputSemester == null) {
            StudentAccountAPI.create({
                aidRecieved: vals.aidRecieved,
                individualID: student.student.individualID,
                ...currentSemester
            }, {individualID: student.student.individualID})

            if (showSalary) {
                SalaryAccountAPI.create({
                    individualID: student.student.individualID,
                    percentFTE: vals.percentFTE,
                    rate: vals.rate,
                    rateTimeUnit: vals.rateTimeUnit,
                    ...currentSemester
                }, {individualID: student.student.individualID})
            }
        }
        else {
            StudentAccountAPI.modify({
                aidRecieved: vals.aidRecieved,
                individualID: student.student.individualID,
                ...currentSemester
            })

            if (showSalary) {
                if (!initialShowSalary) {
                    SalaryAccountAPI.create({
                        individualID: student.student.individualID,
                        percentFTE: vals.percentFTE,
                        rate: vals.rate,
                        rateTimeUnit: vals.rateTimeUnit,
                        ...currentSemester
                    }, {individualID: student.student.individualID})
                }
                else {
                    SalaryAccountAPI.modify({
                        individualID: student.student.individualID,
                        percentFTE: vals.percentFTE,
                        rate: vals.rate,
                        rateTimeUnit: vals.rateTimeUnit,
                        ...currentSemester
                    })
                }
            }
            else {
                if (initialShowSalary) {
                    SalaryAccountAPI.del({individualID: student.student.individualID, ...currentSemester}, {individualID: student.student.individualID})
                }
                else {
                    // do nothing? !initialShowSalary and !showSalary
                    // this is left blank intentionally
                }
            }
        }

    }

    const onDelete = () => {
        if (student != null) {
            if (student == undefined || student.student.individualID == undefined) {
                return
            }

            // delete all student and salary accounts - done on the server side
            // delete student

            StudentAPI.del({individualID: student.student.individualID}, {budgetID})
        }
    }
    const deleteCurrentSemester = () => {
        if (student == undefined || student.student.individualID == undefined) {
            return
        }

        if (initialShowSalary) {
            SalaryAccountAPI.del({individualID: student.student.individualID, ...currentSemester}, {individualID: student.student.individualID})
        }
        StudentAccountAPI.del({individualID: student.student.individualID, ...currentSemester}, {individualID: student.student.individualID})
    }

    return <Form action={student == undefined ? onSubmit : onUpdate} >
        <table>
            <tbody>
                <IndividualLine individual={student?.individual}/>
                <StudentLine student={student?.student}/>

                {student != null ? <>
                    <tr>
                        <SelectSemesterDropdown
                            basePath={`/dashboard/${budgetID}/Student/${student.student.individualID}/`}
                            semesters={semesters}
                            currentSemester={inputSemester}
                            displayAddNew={absentSemesters.length > 0}
                        />
                        {inputSemester == null
                            ? <ChooseSemesterDropdown semesters={absentSemesters} setSemester={setCurrentSemester}/>
                            : <td><button className="warning" formAction={deleteCurrentSemester}>Delete Semester</button></td>
                        }
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentAccountSection
                        currentSemester={currentSemester}
                        semesterAccounts={semesterAccounts}
                        student={student.student}
                        studentAccounts={studentAccounts}
                    />
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentSalaryAccountSection
                        currentSemester={currentSemester}
                        semesterAccounts={semesterAccounts}
                        showSalary={showSalary}
                        setShowSalary={setShowSalary}
                        salaryAccounts={salaryAccounts}
                    />
                    <tr><td colSpan={2}><hr/></td></tr>
                </> : undefined}

                <tr>
                    <td><button className="actionButton submitButton">{student != undefined ? "Update" : "Create"}</button></td>
                    {student != null
                        ? <td><button formAction={onDelete} className="warning actionButton">Remove {student.individual.name}</button></td>
                        : undefined
                    }
                </tr>
            </tbody>
        </table>
    </Form>
}
