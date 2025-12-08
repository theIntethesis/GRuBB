"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { getSemesterData, ChooseSemesterDropdown, IndividualLine, SalaryAccountSection, SelectSemesterDropdown } from "./common"
import { SemesterCombo, FacultyRole } from "@/lib/common"
import { castFormDataToObject } from "@/lib/utils"
import Form from "next/form"
import { FacultyIndividual, I_Faculty } from "@/lib/models/faculty"
import { I_SalaryAccount } from "@/lib/models/salaryAccount"
import { SemesterAccountCombo } from "@/lib/models/semesterAccount"
import { FacultyAPI, SalaryAccountAPI } from "@/lib/models"
import { I_Faculty_PK } from "@/lib/models/faculty"

function FacultyLine({faculty}: {faculty?: I_Faculty}) {
    const [role, setRole] = useState<FacultyRole>("Faculty")

    // when you gotta pull out the useEffect you know shits fucked
    useEffect(() => {
        if (faculty != null) setRole(faculty.role)
    }, [faculty])

    return <tr>
        <td><label>Role:</label></td>
        <td>
            <select name="role"  defaultValue={role} key={role}>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
                <option value="Post-Doc">Post-Doc</option>
            </select>
        </td>
    </tr>
}

export default function FacultyForm(
    {budgetID, faculty, salaryAccounts, semesterAccounts, inputSemester}:
    {budgetID: string, faculty?: FacultyIndividual, salaryAccounts?: I_SalaryAccount[], semesterAccounts: SemesterAccountCombo[], inputSemester?: SemesterCombo}
) {

    const [semesterData, setSemesterData] = useState<{semesters: SemesterCombo[], absentSemesters: SemesterCombo[]}>(() => {
        return getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], [])
    })

    const [currentSemester, setCurrentSemester] = useState(inputSemester || semesterData.absentSemesters[0])

    useEffect(() => {

        const res = getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], [])
        console.log(res)
        setSemesterData(res)
        setCurrentSemester(inputSemester || res.absentSemesters[0])

    }, [budgetID, semesterAccounts, salaryAccounts, inputSemester])



    if (inputSemester == undefined && semesterData.absentSemesters.length == 0 && faculty != undefined) {
        redirect(`/dashboard/${budgetID}/Faculty/${faculty.faculty.individualID}/${semesterData.semesters[0].year}/${semesterData.semesters[0].semester}`)
    }

    const onSubmit = (formData: FormData) => {
        if (faculty != undefined) {
            return
        }

        const vals = castFormDataToObject(formData)

        FacultyAPI.create({
            faculty: {
                role: vals.role
            },
            individual: {
                name: vals.name
            }
        }, {budgetID})
    }


    console.log(currentSemester)

    const onUpdate = (formData: FormData) => {
        if (faculty == undefined || faculty?.faculty.individualID == undefined) {
            return
        }

        const vals = castFormDataToObject(formData)

        FacultyAPI.modify({
            faculty: {
                individualID: faculty.faculty.individualID,
                role: vals.role
            },
            individual: {
                name: vals.name
            }
        })

        if (inputSemester == null) {
            SalaryAccountAPI.create({
                individualID: faculty.faculty.individualID,
                percentFTE: vals.percentFTE,
                rate: vals.rate,
                rateTimeUnit: vals.rateTimeUnit,
                ...currentSemester
            }, {individualID: faculty.faculty.individualID})
        }
        else {
            SalaryAccountAPI.modify({
                individualID: faculty.faculty.individualID,
                percentFTE: vals.percentFTE,
                rate: vals.rate,
                rateTimeUnit: vals.rateTimeUnit,
                ...currentSemester
            })
        }
    }

    const onDelete = () => {
        if (faculty == undefined || faculty?.faculty.individualID == undefined) {
            return
        }
        if (confirm("Are you sure about this")) {
            FacultyAPI.del({individualID: faculty.faculty.individualID}, {budgetID})
        }
    }
    const deleteCurrentSemester = () => {
        if (faculty == undefined || faculty?.faculty.individualID == undefined) {
            return
        }

        if (confirm("Are you sure about this")) {
            SalaryAccountAPI.del({individualID: faculty.faculty.individualID, ...currentSemester}, {individualID: faculty.faculty.individualID})
        }
    }

    return <Form action={faculty == undefined ? onSubmit : onUpdate} type="submit">
        <table>
            <tbody>
                <IndividualLine individual={faculty?.individual}/>
                <FacultyLine faculty={faculty?.faculty}/>

                 {faculty != null ? <>
                   <tr>
                        <SelectSemesterDropdown
                            basePath={`/dashboard/${budgetID}/Faculty/${faculty.faculty.individualID}/`}
                            semesters={semesterData.semesters}
                            currentSemester={inputSemester}
                            displayAddNew={semesterData.absentSemesters.length > 0}
                        />
                        {inputSemester == null
                            ? <ChooseSemesterDropdown semesters={semesterData.absentSemesters} setSemester={setCurrentSemester}/>
                            : <td><button className="warning" formAction={deleteCurrentSemester}>Delete Semester</button></td>
                        }
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <SalaryAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} salaryAccounts={salaryAccounts} role={faculty.faculty.role}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                 </> : undefined}

                 <tr>
                    <td><button className="actionButton submitButton">{faculty != undefined ? "Update" : "Create"}</button></td>
                    {faculty != null
                        ? <td><button formAction={onDelete} className="warning actionButton">Remove {faculty.individual.name}</button></td>
                        : undefined
                    }

                </tr>
            </tbody>
        </table>

    </Form>
}