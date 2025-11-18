"use client"
import Form from "next/form"
export function StudentSetupForm() {
    const onSubmit = () => {

    }
    return <div>
        <Form action={onSubmit}>
            <table style={{
                margin: "auto",
            }}>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{
                            textAlign: "center"
                        }}>
                            <input type="text" placeholder="Student Name" style={{
                                fontSize: "20pt",
                                fontWeight: "bold"
                            }}/>
                            <hr/>
                            <select>
                                <option>Fall</option>
                                <option>Spring</option>
                            </select>
                            <input type="number" placeholder="Year" min="2024" max="2040"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <input type="checkbox"/> Out of State
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="tuition">Tuition:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="tuition" name="tuition"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="aid">Aid Received:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="aid" name="aid"/>
                        </td>
                    </tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}}>Submit</button>
                    </td></tr>
                </tbody>
            </table>
        </Form>
    </div>
}

export function StudentForm({studentID} : {studentID?: string}) {
    const onSubmit = () => {

    }
    return <div>
        <Form action={onSubmit}>
            <table style={{
                margin: "auto",
            }}>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{
                            textAlign: "center"
                        }}> 
                            <p style={{
                                fontSize: "20pt",
                                fontWeight: "bold"
                            }}>{/* Student Name */}</p>
                            <hr/>
                            <select>
                                {/* Semesters Here */}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <input type="checkbox" disabled={true}/> Out of State
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="tuition">Tuition:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="tuition" name="tuition"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="aid">Aid Received:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="aid" name="aid"/>
                        </td>
                    </tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}}>Save</button>
                    </td></tr>
                </tbody>
            </table>
        </Form>
    </div>
}