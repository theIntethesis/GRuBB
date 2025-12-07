"use client"

import { I_Budget } from '@/lib/models/budget'
import { SemesterAccountAPI } from '@/lib/models'
import { castFormDataToObject } from '@/lib/utils'

import Form from 'next/form'
import { redirect } from 'next/navigation'

type SemesterAccountCombo = SemesterAccountAPI.SemesterAccountCombo
type I_SemesterAccountPK = SemesterAccountAPI.I_SemesterAccountPK
type I_SemesterAccountFK = SemesterAccountAPI.I_SemesterAccountFK

export default function SemesterSetupForm({ semester, budget }: { semester?: SemesterAccountCombo, budget: I_Budget }) {

    if (budget._id == undefined) {
        redirect("/dashboard")
    }

    const initialValues: SemesterAccountCombo = semester != null ? semester : {
        semesterAccount: {
            budgetID: budget._id, // this should in theory never happen
            semester: "Fall",
            year: 2025,
            inStateTuitionRate: 0,
            outOfStateTuitionRate: 0,
            tuitionIncrease: 0,
            facultyFBR: 0,
            studentFBR: 0,
            postDocFBR: 0,
        },
        travelProfile: {
            perDiem: 0,
            airfare: 0,
            lodging: 0
        },
        overheadCharge: {
            charge: 0,
            description: ""
        }
    }


    const onDelete = async () => {
        if (semester == undefined) {
            return
        }
        await SemesterAccountAPI.del(
            semester.semesterAccount as I_SemesterAccountPK,
            semester.semesterAccount as I_SemesterAccountFK
        )
    }

    const onCreate = async (formData: FormData) => {
        if (budget._id == undefined) {
            redirect("/dashboard")
        }
        const vals = castFormDataToObject(formData)

        console.log(vals)

        // make sure semester hasn't been used before!!!

        SemesterAccountAPI.create({
            overheadCharge: {
                charge: vals.overheadCharge,
                description: ""
            },
            travelProfile: {
                perDiem: vals.perdiem,
                airfare: vals.airfare,
                lodging: vals.lodging
            },
            semesterAccount: {
                budgetID: budget._id,
                semester: vals.semester,
                year: vals.year,
                facultyFBR: vals.facultyFBR,
                postDocFBR: vals.postDocFBR,
                studentFBR: vals.studentFBR,
                inStateTuitionRate: vals.inStateTuitionRate,
                outOfStateTuitionRate: vals.outOfStateTuitionRate,
                tuitionIncrease: vals.tuitionIncrease
            }
        }, {budgetID: budget._id})

    }
    const onModify = async (formData: FormData) => {
        if (budget._id == undefined || semester == undefined) {
            redirect("/dashboard")
        }

        const vals = castFormDataToObject(formData)

        SemesterAccountAPI.modify({
            overheadCharge: {
                charge: vals.overheadCharge,
                description: ""
            },
            travelProfile: {
                perDiem: vals.perdiem,
                airfare: vals.airfare,
                lodging: vals.lodging
            },
            semesterAccount: {
                ...(semester.semesterAccount as I_SemesterAccountPK),
                facultyFBR: vals.facultyFBR,
                postDocFBR: vals.postDocFBR,
                studentFBR: vals.studentFBR,
                inStateTuitionRate: vals.inStateTuitionRate,
                outOfStateTuitionRate: vals.outOfStateTuitionRate,
                tuitionIncrease: vals.tuitionIncrease
            }
        })
    }

    return <div>
            <Form action={semester == null ? onCreate : onModify}>
                <table style={{
                    padding: "10px",
                    margin: "auto"
                }}>
                    <tbody>
                        <tr>
                            {
                                semester ? <>
                                    <td colSpan={2} style = {{
                                        textAlign: "center",
                                        fontSize: "15pt",
                                        fontWeight: "bold"
                                    }}>
                                        {initialValues.semesterAccount.semester} {initialValues.semesterAccount.year}
                                    </td>
                                </> :
                                <>
                                    <td>
                                        <label htmlFor="semester">Semester:</label>
                                    </td>
                                    <td>
                                        <select name="semester" defaultValue={initialValues.semesterAccount.semester} style={{height: "2em"}}>
                                            <option>Fall</option>
                                            <option>Spring</option>
                                        </select>
                                        <input name="year" type="number" min="2024" max="2040" defaultValue={initialValues.semesterAccount.year}/>
                                    </td>
                                </>
                            }
                        </tr>
                        <tr>
                            <td colSpan={2}><hr/></td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="inStateTuitionRate">In-State Tuition Rate:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">


                                $<input name="inStateTuitionRate" type="number" min="0" defaultValue={initialValues.semesterAccount.inStateTuitionRate}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="outOfStateTuitionRate">Out-of-State Tuition Rate:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="outOfStateTuitionRate" type="number" min="0" defaultValue={initialValues.semesterAccount.outOfStateTuitionRate}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="tuitionIncrease">Tuition Increase (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="tuitionIncrease" type="number" min="0" max="100" defaultValue={initialValues.semesterAccount.tuitionIncrease}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="facultyFBR">Faculty Fringe Benefits Rate (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="facultyFBR" type="number" min="0" max="100" defaultValue={initialValues.semesterAccount.facultyFBR}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="studentFBR">Student Fringe Benefits Rate (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="studentFBR" type="number" min="0" max="100" defaultValue={initialValues.semesterAccount.studentFBR}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <label htmlFor="postDocFBR">Post-Doc Fringe Benefits Rate (%):</label>

                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="postDocFBR" type="number" min="0" max="100" defaultValue={initialValues.semesterAccount.postDocFBR}/>%
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} style={{
                                fontSize: "15pt",
                                textAlign: "center"
                            }}>
                                <hr/>Travel
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="perdiem">Per Diem:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="perdiem" type="number" min="0" defaultValue={initialValues.travelProfile.perDiem}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="airfare">Airfare:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="airfare" type="number" min="0" defaultValue={initialValues.travelProfile.airfare}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lodging">Lodging:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="lodging" type="number" min="0" defaultValue={initialValues.travelProfile.lodging}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{
                                fontSize: "15pt",
                                textAlign: "center"
                            }}>
                                <hr/>
                                Overhead Charges
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="overheadCharge">Charge Amount:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="overheadCharge" type="number" min="0" defaultValue={initialValues.overheadCharge.charge}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className='actionButton submitButton'>{semester == null ? "Submit" : "Update"}</button>
                            </td>
                            <td>
                                {semester != null ? <button formAction={onDelete}  className="warning actionButton">
                                    Delete
                                </button> : null}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
}