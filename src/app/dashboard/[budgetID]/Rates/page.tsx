// Rates
"use client"
import Form from 'next/form'

export default function Page() {
    const onSubmit = () => {

    }
    return<div>
            <Form action={onSubmit}>
                <table style={{
                    padding: "10px",
                    margin: "auto"
                }}>
                    <tbody>
                        <tr>
                            <td className="rightside">
                                <label htmlFor="semester" style={{
                                    fontSize: "15pt"
                                }}>Semester:</label>
                            </td>
                            <td className="leftside">
                                <select name="semester">
                                    <option>Fall</option>
                                    <option>Spring</option>
                                </select>
                                <input name="year" type="number" min="2024" max="2040"/>
                            </td>
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
                                <hr/>
                                Travel
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
                                <label htmlFor="description">Description:</label>
                            </td>
                            <td className='rightside'>
                                <input name="description" type="text" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td className='leftside'>
                                <label htmlFor="charge">Charge Amount:</label>
                            </td>
                            <td className='rightside'>
                                $<input name="charge" type="number" min="0" className="rightside"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ textAlign: "center" }}><button className='px-2 py-1 rounded' style={{
                                width: '50%'
                            }}>Submit</button><hr/></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
}