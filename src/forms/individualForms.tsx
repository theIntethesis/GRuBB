"use client"
import { createNewStudent, createNewFaculty, deleteFaculty, deleteStudent, modifyStudent, modifyFaculty } from "@/api/individuals"
import { StudentAccount } from "@/lib/models"
import { redirect } from "next/navigation"
import Form from "next/form"
import { useEffect, useState } from "react"

function IndividualLine({individual}: {individual?: any}) {
    return <tr>
        <td colSpan={2} style={{
            textAlign: "center"
        }}>
            <input
                type="text"
                placeholder="Name"
                defaultValue={individual != null ? individual.name : ""}
                name="name"
                style={{
                    fontSize: "20pt",
                    fontWeight: "bold"
                }}
            />
        </td>

    </tr>
}

function StudentLine({student}: {student?: any}) {
    return <tr>
        <td colSpan={2} style={{textAlign: "center"}}>
            <input type="checkbox" name="outOfState" defaultChecked={student != null ? student.outOfState : false}/> Out of State

        </td>

    </tr>
}

function FacultyLine({faculty}: {faculty?: any}) {
    const [role, setRole] = useState(undefined)

    // when you gotta pull out the useEffect you know shits fucked
    useEffect(() => {
        console.log(faculty?.role || "Faculty")
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



function SalaryAccountSection({salaryAccount}: {salaryAccount?: any}) {
    // salary stuff
    const calculatePayment = () => {
        const rate = (document.getElementById("rate") as HTMLInputElement).valueAsNumber;
        const rateUnit = (document.getElementById("rateUnit") as HTMLSelectElement).value;
        const percentFTE = (document.getElementById("percentFTE") as HTMLInputElement).valueAsNumber;
        console.log("Rate:", rate, "Rate Unit:", rateUnit, "Percent FTE:", percentFTE);
        (document.getElementById("payment") as HTMLInputElement).value = (Number(rate) * (rateUnit === "Hour" ? 2080 : 1) * (Number(percentFTE) / 100)).toString()
    }

    return <>
        <tr>
            <td>
                <label htmlFor="rate">Rate:</label>
            </td>
            <td>
                <div className="inputOuterLeft" style={{width: "45%"}}>
                    $<input type="float" id="rate" name="rate" onChange={calculatePayment} defaultValue={salaryAccount != null ? salaryAccount.rate : 0}/>
                </div>
                <div style={{display: "inline-block", width: "10%", textAlign: "center"}}>/</div>
                <select id="rateUnit" style={{width: "45%", height: "2em"}} onChange={calculatePayment} defaultValue={salaryAccount != null ? salaryAccount.rate : "Hour"}><option>Hour</option><option>Year</option></select>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
            </td>
            <td>
                <div className="inputOuterRight">
                <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} onChange={calculatePayment} defaultValue={salaryAccount != null ? salaryAccount.percentFTE * 100 : 100}/>%
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="payment">Payment:</label>
            </td>
            <td>
                <div className="inputOuterLeft">
                    $<input type="number" id="payment" name="payment" disabled={true} defaultValue={salaryAccount != null ? salaryAccount.rate * (salaryAccount.rateUnit === "Hour" ? 2080 : 1) * salaryAccount.percentFTE : 0}/>

                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="FBR">Fringe Benefits Rate:</label>
            </td>
            <td>
                <div className="inputOuterRight">
                <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
                </div>
                {/* This needs to be updated when the Faculty type is updated. */}

            </td>
        </tr>
    </>
}

// where basepath = /dashboard/${budgetID}/${Student || Faculty}/${individualID}/
function SemesterDropdown({basePath, semesters}: {basePath: string, semesters?: {semester: "Fall" | "Spring", year: number}[]}) {
    const handleOnChange = (e) => {
        // probably e.target.value or smth
    }

    return <tr>
        <td colSpan={2}>
            <select onChange={handleOnChange}>
                {semesters?.map(x => {
                    return <option value={`${x.semester}/${x.year}`}>{x.semester} {x.year}</option>
                })}
                <option>Add New Semester</option>
            </select>
        </td>
    </tr>
}

function OptionalSalaryAccountSection({salaryAccount}: {salaryAccount?: any}) {
    // some sort of usestate that when a button is pressed it reveals salary account section
    // only if salary account is null
    const [showSalary, setShowSalary] = useState(salaryAccount != undefined)

    const onShowSalary = () => {
        setShowSalary(true)
    }

    return <>
        {!showSalary ? <tr>
            <td colSpan={2}>
                <button formAction={onShowSalary} className="actionButton" >Add Salary Account</button>
            </td>
        </tr> : <SalaryAccountSection salaryAccount={salaryAccount}/>}

    </>
}

function StudentAccountSection({studentAccount}: {studentAccount?: any}) {
    // student account stuff

    return <>
        <tr>
            <td>
                <label htmlFor="tuition">Tuition:</label>
            </td>
            <td>
                <div className="inputOuterLeft">
                    $<input type="number" id="tuition" name="tuition" defaultValue={studentAccount != null ? studentAccount.tuition : 0}/>

                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="aid">Aid Received:</label>
            </td>
            <td>
                <div className="inputOuterLeft">
                    $<input type="number" id="aid" name="aid" defaultValue={studentAccount != null ? studentAccount.aidReceived : 0}/>

                </div>
            </td>
        </tr>
    </>
}

// individual == null implies everything else is null
export function StudentForm(
    {budgetID,  student, studentAccount, salaryAccount, semesters}:
    {budgetID: string, student?: any, studentAccount?: any, salaryAccount?: any, semesters?: {semester: "Fall" | "Spring", year: number}[]}
) {
    const onSubmit = (formData: FormData) => {
        // console.log(formData)
        // outOfState == undefined or "on"
        if (student == null) {
            createNewStudent(
                formData.get("name")?.toString() || "unnamed",
                formData.get("outOfState") == "on" || false,
                budgetID
            )
        }
        else {
            modifyStudent(
                formData.get("name")?.toString() || student.name,
                formData.get("outOfState") == "on",
                student.individual_id
            )
            /*
            modifyStudentAccount(
                formData.get("tuition")?.toString() || studentAccount.tuition,
                formData.get("aid")?.toString() || studentAccount.aidReceived,
                student.individual_id
            )
            modifySalaryAccount(
                formData.get("rate")?.toString() || salaryAccount.rate,
                formData.get("rateUnit")?.toString() || salaryAccount.rateUnit,
                formData.get("percentFTE")?.toString() || salaryAccount.percentFTE,
                student.individual_id
            )
            */
        }

    }
    const onDelete = () => {
        if (student != null) {
            deleteStudent(student.individual_id, budgetID)
        }

    }
    return <Form action={onSubmit}>
        <table>
            <tbody>
                <IndividualLine individual={student}/>
                <StudentLine student={student}/>

                {student != null ? <>
                    <SemesterDropdown basePath={`dashboard/${budgetID}/Student/${student.individual_id}`} semesters={semesters}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentAccountSection/>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <OptionalSalaryAccountSection salaryAccount={salaryAccount}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                </> : undefined}

                <tr>
                    {student != null ? <td><button formAction={onDelete} className="warning actionButton">Delete</button></td> : undefined}

                    <td><button className="actionButton submitButton">Submit</button></td>

                </tr>
            </tbody>
        </table>
    </Form>
}

/*
    individual is the POJO returned from mongo
    faculty is Faculty from mongo
    salaryAccount ^
*/
export function FacultyForm(
    {budgetID,  faculty, salaryAccount, semesters}:
    {
        budgetID: string,
        faculty?: any,
        salaryAccount?: any,
        semesters?: {semester: "Fall" | "Spring", year: number}[], // all semesters that currently exist

    }
) {
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
            /*
            modifySalaryAccount(
                formData.get("rate")?.toString() || salaryAccount.rate,
                formData.get("rateUnit")?.toString() || salaryAccount.rateUnit,
                formData.get("percentFTE")?.toString() || salaryAccount.percentFTE,
                faculty.individual_id
            )
            */
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
                    <SemesterDropdown basePath={`dashboard/${budgetID}/Faculty/${faculty.individual_id}`} semesters={semesters}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <SalaryAccountSection/>
                    <tr><td colSpan={2}><hr/></td></tr>
                 </> : undefined}

                 <tr>
                    {faculty != null ? <td><button formAction={onDelete} className="warning actionButton">Delete</button></td> : undefined}

                    <td><button className="actionButton submitButton">Submit</button></td>

                </tr>
            </tbody>
        </table>

    </Form>
}