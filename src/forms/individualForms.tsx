"use client"
import { createNewStudent, createNewFaculty } from "@/api/individuals"
import { StudentAccount } from "@/lib/models"
import { redirect } from "next/navigation"
import Form from "next/form"

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
            <input type="checkbox" name="outOfState"/> Out of State
            <hr/>
        </td>

    </tr>
}

function FacultyLine({faculty}: {faculty?: any}) {
    return <tr>
        <td colSpan={2} style={{textAlign: "center"}}>
            <select name="facultyType">
                <option>Faculty</option>
                <option>Staff</option>
                <option>Post-Doc</option>
            </select>
            <hr/>
        </td>
    </tr>
}

function SalaryAccountSection({salaryAccount}: {salaryAccount?: any}) {
    // salary stuff
    return<></>
}

function OptionalSalaryAccountSection({salaryAccount}: {salaryAccount?: any}) {
    // some sort of usestate that when a button is pressed it reveals salary account section
    // only if salary account is null
    return<></>
}

function StudentAccountSection({studentAccount}: {studentAccount?: any}) {
    // student account stuff
    return<></>
}

// individual == null implies everything else is null
export function StudentForm(
    {budgetID, individual, student, studentAccount, salaryAccount, semesters}: {budgetID: string, individual?: any, student?: any, studentAccount?: any, salaryAccount?: any, semesters?: string[]}
) {
    const onSubmit = (formData: FormData) => {
        console.log(formData)
        // outOfState == undefined or "on"
        let studentID = createNewStudent(formData.get("name")?.toString() || "unnamed", formData.get("outOfState") == "on" || false, budgetID)
        //redirect(`/dashboard/${budgetID}/Student/${studentID}`)
    }
    return <Form action={onSubmit}>
        <table style={{ margin: "auto" }}>
            <tbody>
                <IndividualLine individual={individual}/>
                <StudentLine student={student}/>
                {/* semester switcher, uses redirects */}

                <StudentAccountSection/>
                <OptionalSalaryAccountSection/>
                <tr>
                    {individual != null ? <td><button>Delete</button></td> : undefined}
                    <td><button>Submit</button></td>
                </tr>

            </tbody>
        </table>
    </Form>
}

/*
    individual is the POJO returned from mongo
    faculty is Faculty from mongo
    salaryAccount ^
    semesters is an array of strings that are valid slugs
*/
export function FacultyForm(
    {individual, faculty, salaryAccount, semesters}: {individual?: any, faculty?: any, salaryAccount?: any, semesters?: string[]}
) {
    const onSubmit = (formData: FormData) => {

    }
    return <Form action={onSubmit}>
        <table style={{ margin: "auto" }}>
            <tbody>
                <IndividualLine individual={individual}/>
                <FacultyLine/>
                 {/* semester switcher, uses redirects */}
                 <SalaryAccountSection/>
                 <tr>
                    {individual != null ? <td><button>Delete</button></td> : undefined}
                    <td><button>Submit</button></td>
                </tr>
            </tbody>
        </table>

    </Form>
}