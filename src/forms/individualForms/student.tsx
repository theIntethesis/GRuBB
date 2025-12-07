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

function StudentLine({student}: {student?: I_Student}) {
    return <tr>
        <td colSpan={2} style={{textAlign: "center"}}>
            <input type="checkbox" name="outOfState" defaultChecked={student != null ? student.outOfState : false}/> Out of State
        </td>
    </tr>
}

function StudentSalaryAccountSection(
    {semesterAccounts, currentSemester, salaryAccounts,  showSalary, setShowSalary}:
    {semesterAccounts: any[], currentSemester: SemesterCombo, salaryAccounts?: I_SalaryAccount[], showSalary: boolean, setShowSalary: Dispatch<any>}) {
    // some sort of usestate that when a button is pressed it reveals salary account section
    // only if salary account is null

    const onShowSalary = () => {
        setShowSalary(true)
    }

    return <>
        {!showSalary ? <tr>
            <td colSpan={2}>
                <button type="button" onClick={onShowSalary} className="actionButton" >Add Salary Account</button>
            </td>
        </tr> : <SalaryAccountSection role={"Student"} salaryAccounts={salaryAccounts} semesterAccounts={semesterAccounts} currentSemester={currentSemester}/> }

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
export function StudentForm(
    {budgetID,  student, studentAccounts, salaryAccounts, semesterAccounts, inputSemester}:
    {budgetID: string, student?: StudentIndividual, studentAccounts?: I_StudentAccount[], salaryAccounts?: I_SalaryAccount[], semesterAccounts: SemesterAccountCombo[], inputSemester?: SemesterCombo}
) {
    const {semesters, absentSemesters} = getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], studentAccounts || [])

    if (inputSemester == undefined && absentSemesters.length == 0 && student != undefined) {
        redirect(`/dashboard/${budgetID}/Student/${student.student.individualID}/${semesters[0].year}/${semesters[0].semester}`)
    }

    const [currentSemester, setCurrentSemester] = useState(inputSemester || absentSemesters[0])

    const initialShowSalary = false
    const [showSalary, setShowSalary] = useState(initialShowSalary)


    // debug - remove in future
    // useEffect(() => {
    //     console.log(currentSemester)
    // }, [currentSemester])


    const onSubmit = (formData: FormData) => {
        /*
        console.log(formData)
        console.log(currentSemester)

        // outOfState == undefined or "on"
        if (student == null) {
            createNewStudent(
                formData.get("name")?.toString() || "unnamed",
                formData.get("outOfState") == "on",
                budgetID
            )
        }
        else {

            modifyStudent(
                formData.get("name")?.toString() || student.name,
                formData.get("outOfState") == "on",
                student.individual_id
            )

            if (inputSemester == undefined) {
                createStudentAccount(student.individual_id, currentSemester.semester, currentSemester.year, Number(formData.get("aid") || '0'))

                //use 'currentSemester' instead of "semester-year" because of useState stuff

                // create salary account if needed

                if (showSalary) {
                    createSalaryAccount(student.individual_id, currentSemester.semester, currentSemester.year, Number(formData.get("rate")), formData.get("rateUnit"), formData.get("percentFTE"))
                }

                redirect(`/dashboard/${budgetID}/Student/${student.individual_id}/${currentSemester.year}/${currentSemester.semester}`)

            }
            else {
                modifyStudentAccount(student.individual_id, currentSemester.semester, currentSemester.year, Number(formData.get("aid") || '0'))

                // create salary account if needed
            }

        }
        */
    }
    const onDelete = () => {
        if (student != null) {
            // deleteStudent(student.individual_id, budgetID)
        }

    }
    const deleteCurrentSemester = () => {

    }

    return <Form action={onSubmit}>
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
                    <StudentAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} student={student.student} studentAccounts={studentAccounts}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentSalaryAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} showSalary={showSalary} setShowSalary={setShowSalary}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                </> : undefined}

                <tr>
                    <td><button className="actionButton submitButton">Submit</button></td>
                    {student != null ? <td><button type="button" onClick={onDelete} className="warning actionButton">Delete</button></td> : undefined}
                </tr>
            </tbody>
        </table>
    </Form>
}
