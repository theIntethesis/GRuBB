"use client"
import { redirect } from "next/navigation"
import Form from "next/form"
import { useEffect, useState } from "react"



interface Semester {
    semester: "Fall" | "Spring",
    year: number
}

function IndividualLine({individual}: {individual?: any}) {
    console.log(individual)
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

// select a semester for which the indiviudal has an account in
function SelectSemesterDropdown({basePath, semesters, currentSemester, displayAddNew}: {basePath: string, semesters?: Semester[], currentSemester?: Semester, displayAddNew: boolean}) {
    const handleOnChange = (e) => {
        // probably e.target.value or smth
        // console.log(e.target.id)
        // console.log(basePath + e.target.value)
        redirect(basePath + e.target.value)
    }

    return <td>
        <select onChange={handleOnChange} defaultValue={currentSemester == null ? "" : `${currentSemester.year}/${currentSemester.semester}`}>
            {semesters?.map(x => {
                return <option value={`${x.year}/${x.semester}`} key={`${x.year}/${x.semester}`}>{x.semester} {x.year}</option>
            })}
            {displayAddNew ? <option value="">Add New Semester</option> : undefined}

        </select>
    </td>
}


// define a new semester
function ChooseSemesterDropdown({semesters, setSemester} : {semesters: Semester[], setSemester: (value) => undefined}) {
    const handleOnChange = (e) => {
        // console.log(e.target.value)
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

function SalaryAccountSection({salaryAccounts, semesterAccounts, currentSemester,  role}: {semesterAccounts: any[], salaryAccounts?: any[], currentSemester: Semester, role: "faculty" | "staff" | "postdoc" | "student"}) {


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
                <select name="rateUnit" defaultValue={salaryAccount != null ? salaryAccount.rate : "hour"}><option value={"hour"}>Hour</option><option value={"year"}>Year</option></select>

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


function StudentSalaryAccountSection({semesterAccounts, currentSemester, showSalary, setShowSalary}: {semesterAccounts: any[], currentSemester: Semester, showSalary: boolean, setShowSalary: (value) => undefined}) {
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
        </tr> : <SalaryAccountSection role={"student"} semesterAccounts={semesterAccounts} currentSemester={currentSemester}/> }

    </>
}

function StudentAccountSection({student, studentAccounts, semesterAccounts, currentSemester }: {student: any, studentAccounts?: any[], semesterAccounts: any[], currentSemester: Semester}) {
    // student account stuff
    const [tuitionRate, setTuitionRate] = useState(undefined)

    useEffect(() => {
        const account = semesterAccounts.find((val) => val.semester == currentSemester.semester && val.year == currentSemester.year)
        // console.log(account)
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
            <td><div className="inputOuterLeft">$<input type="number" id="aid" name="aid" defaultValue={studentAccount?.aidRecieved || 0}/></div></td>
        </tr>
    </>
}


function getSemesterData(budgetID : string, semesterAccounts: any[], salaryAccounts: any[], studentAccounts: any[]): {semesters: Semester[], absentSemesters: Semester[]} {

    const allSemesters = semesterAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    if (allSemesters.length == 0) {
        redirect(`/dashboard/${budgetID}/SemesterRates/`)
    }

    const studentSemesters = studentAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const salarySemesters = salaryAccounts?.map(x => {
        return {
            semester: x.semester,
            year: x.year
        }
    }) || []

    const semesters = studentSemesters

    // studentSemesters union salarySemesters
    salarySemesters.forEach(({semester, year}) => {
        if (!semesters.find(x => x.semester == semester && x.year == year)) {
            semesters.push({semester, year})
        }
    })

    // allSemesters intersection semesters
    const absentSemesters = allSemesters.filter(({semester, year}) => {
        if (semesters.find(x => x.semester == semester && x.year == year)) {
            return false;
        }
        return true;
    })


    return {

        semesters: semesters,
        absentSemesters: absentSemesters
    }
}

// individual == null implies everything else is null
export function StudentForm(
    {budgetID,  student, studentAccounts, salaryAccounts, semesterAccounts, inputSemester}:
    {budgetID: string, student?: any, studentAccounts?: any[], salaryAccounts?: any[], semesterAccounts: any[], inputSemester?: Semester}
) {
    const {semesters, absentSemesters} = getSemesterData(budgetID, semesterAccounts, salaryAccounts || [], studentAccounts || [])

    if (inputSemester == undefined && absentSemesters.length == 0 && student != undefined) {
        redirect(`/dashboard/${budgetID}/Student/${student.individual_id}/${semesters[0].year}/${semesters[0].semester}`)
    }

    const [currentSemester, setCurrentSemester] = useState(inputSemester || absentSemesters[0])

    const initialShowSalary = false
    const [showSalary, setShowSalary] = useState(initialShowSalary)


    // debug - remove in future
    // useEffect(() => {
    //     console.log(currentSemester)
    // }, [currentSemester])


    const onSubmit = (formData: FormData) => {
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

    }
    const onDelete = () => {
        if (student != null) {
            deleteStudent(student.individual_id, budgetID)
        }

    }
    const deleteCurrentSemester = () => {

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
                            displayAddNew={absentSemesters.length > 0}
                        />
                        {inputSemester == null
                            ? <ChooseSemesterDropdown semesters={absentSemesters} setSemester={setCurrentSemester}/>
                            : <td><button className="warning" formAction={deleteCurrentSemester}>Delete Semester</button></td>
                        }
                    </tr>
                    <tr><td colSpan={2}><hr/></td></tr>
                    <StudentAccountSection currentSemester={currentSemester} semesterAccounts={semesterAccounts} student={student} studentAccounts={studentAccounts}/>
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