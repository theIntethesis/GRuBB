"use client"
import { createNewStudent, createNewFaculty, deleteFaculty, deleteStudent, modifyStudent, modifyFaculty } from "@/api/individuals"
import { redirect } from "next/navigation"
import Form from "next/form"
import { useEffect, useState } from "react"
import { createSalaryAccount, createStudentAccount } from "@/api/accounts"


interface Semester {
    semester: "Fall" | "Spring",
    year: number
}

function IndividualLine({individual}: {individual?: any}) {
    return <tr>
        <td colSpan={2} style={{
            textAlign: "center"
        }}>
            <input
                type="text"
                placeholder="Name"
                defaultValue={individual != null ? individual.name : ""}
                required={true}
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

// select a semester for which the indiviudal has an account in
function SelectSemesterDropdown({basePath, semesters, currentSemester}: {basePath: string, semesters?: Semester[], currentSemester?: Semester}) {
    const handleOnChange = (e) => {
        // probably e.target.value or smth
        console.log(e.target.id)
        console.log(basePath + e.target.value)
        redirect(basePath + e.target.value)
    }

    return <td>
        <select onChange={handleOnChange} defaultValue={currentSemester == null ? "" : `${currentSemester.year}/${currentSemester.semester}`}>
            {semesters?.map(x => {
                return <option value={`${x.year}/${x.semester}`} key={`${x.year}/${x.semester}`}>{x.semester} {x.year}</option>
            })}
            <option value="">Add New Semester</option>
        </select>
    </td>
}


// define a new semester
function ChooseSemesterDropdown({semesters, setSemester} : {semesters: Semester[], setSemester: (value) => undefined}) {
    const handleOnChange = (e) => {
        console.log(e.target.value)
        setSemester(semesters[e.target.value])

    }

    return <td>
        <select name="semester-year" id="semester-year" onChange={handleOnChange}>
            {semesters?.map((x, idx) => {
                return <option value={idx} key={idx}>{x.semester} {x.year}</option>
            })}
        </select>
    </td>
}


function SalaryAccountSection({semesterAccounts, currentSemester, salaryAccounts,  role}: {salaryAccount?: any, semesterAccounts: any[], salaryAccounts?: any[], currentSemester: Semester, role: "faculty" | "staff" | "postdoc" | "student"}) {

    useEffect(() => {

        const account = semesterAccounts.find((val) => val.semester == currentSemester.semester && val.year == currentSemester.year)

    }, [currentSemester, semesterAccounts])

    const salaryAccount = salaryAccounts?.find((val) => val.semester == currentSemester.semester && val.year == currentSemester.year)


    return <>
        <tr>
            <td>
                <label htmlFor="rate">Rate:</label>
            </td>
            <td>
                <div className="inputOuterLeft" style={{width: "45%"}}>
                    $<input type="float" id="rate" name="rate" defaultValue={salaryAccount != null ? salaryAccount.rate : 0}/>
                </div>
                <div style={{display: "inline-block", width: "10%", textAlign: "center"}}>/</div>
                <div className="inputOuterRight"  style={{width: "45%", height: "100%", padding: "0.25em"}}>
                <select id="rateUnit" defaultValue={salaryAccount != null ? salaryAccount.rate : "Hour"}><option>Hour</option><option>Year</option></select>

                </div>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
            </td>
            <td>
                <div className="inputOuterRight">
                    {/* this needs to be limited if they're a student */}
                    <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} defaultValue={salaryAccount != null ? salaryAccount.percentFTE * 100 : 100}/>%
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
                {/* This needs to be updated when the Faculty type is updated.
                    FBROverride ? getFBR(semester, FBROverride) : getFBR(semester, faculty?.role) */}
                <div className="inputOuterRight">
                <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
                </div>
            </td>
        </tr>
    </>
}


function OptionalSalaryAccountSection({salaryAccount, semesterAccounts}: {salaryAccount?: any, semesterAccounts: any[], currentSemester: Semester}) {
    // some sort of usestate that when a button is pressed it reveals salary account section
    // only if salary account is null
    const [showSalary, setShowSalary] = useState(salaryAccount != undefined)

    const onShowSalary = () => {
        setShowSalary(true)
    }

    return <>
        {!showSalary ? <tr>
            <td colSpan={2}>
                <button type="button" onClick={onShowSalary} className="actionButton" >Add Salary Account</button>
            </td>
        </tr> : <SalaryAccountSection salaryAccount={salaryAccount} FBROverride={"Staff"}/>}

    </>
}

function StudentAccountSection({student, studentAccounts, semesterAccounts, currentSemester }: {student: any, studentAccounts?: any[], semesterAccounts: any[], currentSemester: Semester}) {
    // student account stuff

    const [tuitionRate, setTuitionRate] = useState(undefined)

    useEffect(() => {
        const account = semesterAccounts.find((val) => val.semester == currentSemester.semester && val.year == currentSemester.year)
        console.log(account)
        setTuitionRate(student.outOfState ? account.outOfStateTuitionRate : account.inStateTuitionRate)
    }, [currentSemester, semesterAccounts])

    const studentAccount = studentAccounts?.find((val) => val.semester == currentSemester.semester && val.year == currentSemester.year)

    return <>
        <tr>
            <td><label htmlFor="tuition">Tuition:</label></td>
            <td><div className="inputOuterLeft">$ <p>{tuitionRate}</p></div></td>
        </tr>
        <tr>
            <td><label htmlFor="aid">Aid Received:</label></td>
            <td><div className="inputOuterLeft">$<input type="number" id="aid" name="aid" defaultValue={studentAccount?.aidReceived || 0}/></div></td>
        </tr>
    </>
}

// individual == null implies everything else is null
export function StudentForm(
    {budgetID,  student, studentAccounts, salaryAccounts, semesterAccounts, inputSemester}:
    {budgetID: string, student?: any, studentAccounts?: any[], salaryAccounts?: any[], semesterAccounts: any[], inputSemester?: Semester}
) {
    const allSemesters = semesterAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const semesters = studentAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const [currentSemester, setCurrentSemester] = useState(inputSemester || allSemesters[0])

    // debug - remove in future
    // useEffect(() => {
    //     console.log(currentSemester)
    // }, [currentSemester])


    const onSubmit = (formData: FormData) => {
        console.log(formData)

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
                //use 'currentSemester' instead of "semester-year" because of useState stuff

                // create student account

                // check if salary account is needed
                // check salary account
            }
            else {
                // modify values

                // create salary account if needed
            }
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
                    <tr>
                        <SelectSemesterDropdown
                            basePath={`/dashboard/${budgetID}/Student/${student.individual_id}/`}
                            semesters={semesters}
                            currentSemester={inputSemester}
                        />
                        {inputSemester == null ? <ChooseSemesterDropdown semesters={allSemesters} setSemester={setCurrentSemester}/> : undefined}
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} student={student}/>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <OptionalSalaryAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} />
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

/*
    individual is the POJO returned from mongo
    faculty is Faculty from mongo
    salaryAccount ^
*/
export function FacultyForm(
    {budgetID, faculty, salaryAccounts, semesterAccounts, inputSemester}:
    {
        budgetID: string,
        faculty?: any,
        salaryAccounts?: any[]
        semesterAccounts: any[],
        inputSemester?: Semester
    }
) {
    const allSemesters = semesterAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const semesters = salaryAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const [currentSemester, setCurrentSemester] = useState(inputSemester || allSemesters[0])


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
                            currentSemester={currentSemester}
                        />
                        {inputSemester == null ? <ChooseSemesterDropdown semesters={allSemesters} setSemester={setCurrentSemester}/> : undefined}
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