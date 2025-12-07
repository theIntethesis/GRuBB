"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { getSemesterData, ChooseSemesterDropdown, IndividualLine, SalaryAccountSection, SelectSemesterDropdown } from "./common"
import { SemesterCombo } from "@/lib/common"
import Form from "next/form"

function FacultyLine({faculty}: {faculty?: any}) {
    const [role, setRole] = useState(undefined)

    // when you gotta pull out the useEffect you know shits fucked
    useEffect(() => {
        // console.log(faculty?.role || "Faculty")
        setRole(faculty?.role || "Faculty")
    }, [faculty])

    return <tr>
        <td colSpan={2} style={{textAlign: "center"}}>
            <select name="facultyType"  defaultValue={role} key={role}>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
                <option value="Post-Doc">Post-Doc</option>
            </select>

        </td>
    </tr>
}

export function FacultyForm(
    {budgetID, faculty, salaryAccounts, semesterAccounts, inputSemester}:
    {
        budgetID: string,
        faculty?: any,
        salaryAccounts?: any[]
        semesterAccounts: any[],
        inputSemester?: SemesterCombo
    }
) {
    const {semesters, absentSemesters} = getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], [])

    if (inputSemester == undefined && absentSemesters.length == 0 && faculty != undefined) {
        redirect(`/dashboard/${budgetID}/Faculty/${faculty.individual_id}/${semesters[0].year}/${semesters[0].semester}`)
    }

    const [currentSemester, setCurrentSemester] = useState(inputSemester || absentSemesters[0])

    const deleteCurrentSemester = () => {

    }

    const onSubmit = (formData: FormData) => {
        if (faculty == null) {
            createNewFaculty(
                formData.get("name")?.toString() || "unnamed",
                formData.get("facultyType")?.toString() || "Faculty",
                budgetID
            )
        }
        else {
            modifyFaculty(
                formData.get("name")?.toString() || faculty.name,
                formData.get("facultyType")?.toString() || "Faculty",
                faculty.individual_id
            )

            if (inputSemester == undefined) {
                //use 'currentSemester' instead of "semester-year" because of useState stuff
                createSalaryAccount(faculty.individual_id, currentSemester.semester, currentSemester.year, Number(formData.get("rate")), formData.get("rateUnit"), formData.get("percentFTE"))

                redirect(`/dashboard/${budgetID}/Faculty/${faculty.individual_id}/${currentSemester.year}/${currentSemester.semester}`)
            }
            else {

            }
        }

    }
    const onDelete = () => {
        if (faculty != null) {
            deleteFaculty(faculty.individual_id, budgetID)
        }
    }
    return <Form action={onSubmit}>
        <table>
            <tbody>
                <IndividualLine individual={faculty}/>
                <FacultyLine faculty={faculty}/>

                 {faculty != null ? <>
                   <tr>
                        <SelectSemesterDropdown
                            basePath={`/dashboard/${budgetID}/Faculty/${faculty.individual_id}/`}
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
                    <SalaryAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} faculty={faculty} salaryAccounts={salaryAccounts}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                 </> : undefined}

                 <tr>
                    <td><button className="actionButton submitButton">Submit</button></td>
                    {faculty != null ? <td><button type="button" onClick={onDelete} className="warning actionButton">Delete</button></td> : undefined}

                </tr>
            </tbody>
        </table>

    </Form>
}