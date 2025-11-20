"use client"
import { createNewStudent, createNewFaculty, deleteFaculty, deleteStudent } from "@/api/individuals"
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
    {budgetID,  student, studentAccount, salaryAccount, semesters}: {budgetID: string, student?: any, studentAccount?: any, salaryAccount?: any, semesters?: {semester: "Fall" | "Spring", year: number}[]}
) {
    const onSubmit = (formData: FormData) => {
        // console.log(formData)
        // outOfState == undefined or "on"
        if (student == null) {
            createNewStudent(formData.get("name")?.toString() || "unnamed", formData.get("outOfState") == "on" || false, budgetID)
        }

    }
    const onDelete = () => {
        if (student != null) {
            deleteStudent(student.individual_id, budgetID)
        }

    }
    return <Form action={onSubmit}>
        <table style={{ margin: "auto" }}>
            <tbody>
                <IndividualLine individual={student}/>
                <StudentLine student={student}/>
                {/* semester switcher, uses redirects */}

                <StudentAccountSection/>
                <OptionalSalaryAccountSection/>
                <tr>
                    {student != null ? <td colSpan={2} style={{width: "100%"}}><button formAction={onDelete}>Delete</button></td> : undefined}
                    <td colSpan={2} style={{width: "100%"}}><button>Submit</button></td>
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
    {budgetID,  faculty, salaryAccount, semesters}: {budgetID: string, faculty?: any, salaryAccount?: any, semesters?: {semester: "Fall" | "Spring", year: number}[]}
) {
    const onSubmit = (formData: FormData) => {
        if (faculty == null) {
            createNewFaculty(formData.get("name")?.toString() || "unnamed", formData.get("facultyType")?.toString() || "Faculty", budgetID)
        }

    }
    const onDelete = () => {
        if (faculty != null) {
            deleteFaculty(faculty.individual_id, budgetID)
        }
    }
    return <Form action={onSubmit}>
        <table style={{ margin: "auto" }}>
            <tbody>
                <IndividualLine individual={faculty}/>
                <FacultyLine/>
                 {/* semester switcher, uses redirects */}
                 <SalaryAccountSection/>
                 <tr>
                    {faculty != null ? <td><button formAction={onDelete}>Delete</button></td> : undefined}
                    <td><button>Submit</button></td>
                </tr>
            </tbody>
        </table>

    </Form>
}