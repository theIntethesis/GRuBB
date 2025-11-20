"use client"
import { createSemesterAccount, deleteSemesterAccount, getSemesterAccount, modifySemesterAccount } from '@/api/semesterAccount'

import Form from 'next/form'

export default function SemesterSetupForm({ semester, budget }: { semester?: any, budget: any }) {
    const initialValues = semester != null ? semester : {
        semester: "Fall",
        year: "2025",
        inStateTuitionRate: 0,
        outOfStateTuitionRate: 0,
        tuitionIncrease: 0,
        facultyFBR: 0,
        studentFBR: 0,
        postDocFBR: 0,
        perDiem: 0,
        airfare: 0,
        lodging: 0,
        overheadCharge: 0
    }


    const onDelete = async () => {
        if (semester == undefined) {
            return
        }
        await deleteSemesterAccount(budget._id, semester.semester, semester.year)
    }

    const onCreate = async (formData: FormData) => {
        await createSemesterAccount(
            budget._id,
            formData.get("semester") == "Fall" ? "Fall" : "Spring",
            parseFloat(formData.get("year")?.toString() || "0"),
            parseFloat(formData.get("inStateTuitionRate")?.toString() || "0"),
            parseFloat(formData.get("outOfStateTuitionRate")?.toString() || "0"),
            parseFloat(formData.get("tuitionIncrease")?.toString() || "0"),
            parseFloat(formData.get("facultyFBR")?.toString() || "0"),
            parseFloat(formData.get("studentFBR")?.toString() || "0"),
            parseFloat(formData.get("postDocFBR")?.toString() || "0"),
            parseFloat(formData.get("perdiem")?.toString() || "0"),
            parseFloat(formData.get("airfare")?.toString() || "0"),
            parseFloat(formData.get("lodging")?.toString() || "0"),
            parseFloat(formData.get("overheadCharge")?.toString() || "0")
        )
    }
    const onModify = async (formData: FormData) => {
        modifySemesterAccount(
            budget._id,
            semester.semester,
            semester.year,
            parseFloat(formData.get("inStateTuitionRate")?.toString() || "0"),
            parseFloat(formData.get("outOfStateTuitionRate")?.toString() || "0"),
            parseFloat(formData.get("tuitionIncrease")?.toString() || "0"),
            parseFloat(formData.get("facultyFBR")?.toString() || "0"),
            parseFloat(formData.get("studentFBR")?.toString() || "0"),
            parseFloat(formData.get("postDocFBR")?.toString() || "0"),
            parseFloat(formData.get("perdiem")?.toString() || "0"),
            parseFloat(formData.get("airfare")?.toString() || "0"),
            parseFloat(formData.get("lodging")?.toString() || "0"),
            parseFloat(formData.get("overheadCharge")?.toString() || "0")
        )
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
                                        {initialValues.semester} {initialValues.year}
                                    </td>
                                </> :
                                <>
                                    <td>
                                        <label htmlFor="semester">Semester:</label>
                                    </td>
                                    <td>
                                        <select name="semester" defaultValue={initialValues.semester} style={{height: "2em"}}>
                                            <option>Fall</option>
                                            <option>Spring</option>
                                        </select>
                                        <input name="year" type="number" min="2024" max="2040" defaultValue={initialValues.year}/>
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


                                $<input name="inStateTuitionRate" type="number" min="0" defaultValue={initialValues.inStateTuitionRate}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="outOfStateTuitionRate">Out-of-State Tuition Rate:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="outOfStateTuitionRate" type="number" min="0" defaultValue={initialValues.outOfStateTuitionRate}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="tuitionIncrease">Tuition Increase (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="tuitionIncrease" type="number" min="0" max="100" defaultValue={initialValues.tuitionIncrease}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="facultyFBR">Faculty Fringe Benefits Rate (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="facultyFBR" type="number" min="0" max="100" defaultValue={initialValues.facultyFBR}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="studentFBR">Student Fringe Benefits Rate (%):</label>
                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="studentFBR" type="number" min="0" max="100" defaultValue={initialValues.studentFBR}/>%
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <label htmlFor="postDocFBR">Post-Doc Fringe Benefits Rate (%):</label>

                            </td>
                            <td>
                                <div className="inputOuterRight">
                                <input name="postDocFBR" type="number" min="0" max="100" defaultValue={initialValues.postDocFBR}/>%
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
                                $<input name="perdiem" type="number" min="0" defaultValue={initialValues.perDiem}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="airfare">Airfare:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="airfare" type="number" min="0" defaultValue={initialValues.airfare}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lodging">Lodging:</label>
                            </td>
                            <td>
                                <div className="inputOuterLeft">
                                $<input name="lodging" type="number" min="0" defaultValue={initialValues.lodging}/>
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
                                $<input name="overheadCharge" type="number" min="0" defaultValue={initialValues.overheadCharge}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className='actionButton'>{semester == null ? "Submit" : "Update"}</button>
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