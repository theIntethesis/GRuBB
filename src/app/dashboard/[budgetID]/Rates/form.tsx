"use client"
import { createInstitutionalAccount, deleteInstitutionalAccount } from '@/lib/api'
import { refresh } from 'next/cache'
import Form from 'next/form'
import { redirect, RedirectType } from 'next/navigation'


export default function SemesterSetupForm({ semesterID, budgetID }: { semesterID?: string, budgetID: string }) {
    // if semesterID not null set default values

    const onDelete = async () => {
        await deleteInstitutionalAccount(budgetID, semesterID)
        redirect(`/dashboard/${budgetID}/Rates`)
    }

    const onSubmit = async (formData: FormData) => {

        // call the various api functions to do shit in here
        /*
            semester, year
            inStateTuitionRate
            outOfStateTuitionRate
            tuitionIncrease
            facultyFBR
            studentFBR
            postDocFBR
            perdiem
            airfare
            lodging
            overheadCharge
        */
        const acc_id = await createInstitutionalAccount(
            budgetID,
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

        redirect(`/dashboard/${budgetID}/Rates/${acc_id}`)
    }
    const onSemesterChange = (e: string) => {
        console.log("changing semester to " + e)
    }

    return <div>
            <Form action={onSubmit}>
                <table style={{
                    padding: "10px",
                    margin: "auto"
                }}>
                    <tbody>
                        <tr>
                            {
                                semesterID ? <>
                                    <td colSpan={2} style = {{
                                        textAlign: "center",
                                        fontSize: "15pt",
                                        fontWeight: "bold"
                                    }}>
                                        Semester {/* Get Semester Here*/}
                                    </td>
                                </> : 
                                <>
                                    <td style={{ textAlign: "center" }}>
                                        <label htmlFor="semester" style={{
                                            fontSize: "15pt",
                                            textAlign: "center"
                                        }}>Semester:</label>
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                        <select name="semester">
                                            <option>Fall</option>
                                            <option>Spring</option>
                                        </select>
                                        <input name="year" type="number" min="2024" max="2040"/>
                                    </td>
                                </>
                            }
                        </tr>
                        <tr>
                            <td colSpan={2}><hr/></td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="inStateTuitionRate">In-State Tuition Rate:</label>
                            </td>
                            <td className="rightside">
                                $<input name="inStateTuitionRate" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="outOfStateTuitionRate">Out-of-State Tuition Rate:</label>
                            </td>
                            <td className="rightside">
                                $<input name="outOfStateTuitionRate" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="tuitionIncrease">Tuition Increase (%):</label>
                            </td>
                            <td className="rightside">
                                <input name="tuitionIncrease" type="number" min="0" max="100" className="rightside"/>%
                            </td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="facultyFBR">Faculty Fringe Benefits Rate (%):</label>
                            </td>
                            <td className="rightside">
                                <input name="facultyFBR" type="number" min="0" max="100" className="rightside"/>%
                            </td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="studentFBR">Student Fringe Benefits Rate (%):</label>
                            </td>
                            <td className="rightside">
                                <input name="studentFBR" type="number" min="0" max="100" className="rightside"/>%
                            </td>
                        </tr>
                        <tr>
                            <td className="leftside">
                                <label htmlFor="postDocFBR">Post-Doc Fringe Benefits Rate (%):</label>
                            </td>
                            <td className="rightside">
                                <input name="postDocFBR" type="number" min="0" max="100" className="rightside"/>%
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
                            <td className='leftside'>
                                <label htmlFor="perdiem">Per Diem:</label>
                            </td>
                            <td className='rightside'>
                                $<input name="perdiem" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td className='leftside'>
                                <label htmlFor="airfare">Airfare:</label>
                            </td>
                            <td className='rightside'>
                                $<input name="airfare" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td className='leftside'>
                                <label htmlFor="lodging">Lodging:</label>
                            </td>
                            <td className='rightside'>
                                $<input name="lodging" type="number" min="0" className="rightside"/>
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
                            <td className='leftside'>
                                <label htmlFor="overheadCharge">Charge Amount:</label>
                            </td>
                            <td className='rightside'>
                                $<input name="overheadCharge" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ textAlign: "center" }}>
                                <button className='px-2 py-1 rounded' style={{
                                    width: '50%'
                                }}>Submit</button>
                                {semesterID != null ? <button formAction={onDelete} className='px-2 py-1 rounded' style={{
                                    width: '50%'
                                }}>
                                    Delete
                                </button> : null}
                            <hr/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
}