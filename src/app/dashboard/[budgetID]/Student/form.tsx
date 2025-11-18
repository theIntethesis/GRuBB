"use client"
import Form from "next/form"

export function StudentForm() {
    // call the various api functions to do shit in here
    /*
        name
        outOfState
        semesters (list of all semesters for this student)
        tuition (current semester)
        aid (current semester)
        Change parameters to BudgetID and IndividualID(?)
    */
    const onSubmit = () => {

    }
    const deleteMe = () => {

    }
    const onNewSemester = (newsemester: string) => {
        console.log("Changing semester to " + newsemester)
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
                            }}>{name}</p>
                            <hr/>
                            <select onChange={(e) => onNewSemester(e.target.value)}>
                                {semesters.map((x, idx) => {
                                    return <option key={idx}>{x}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <input type="checkbox" checked={outOfState} disabled={true}/>Out of State
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="tuition">Tuition:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="tuition" name="tuition" defaultValue={tuition}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="aid">Aid Received:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="aid" name="aid" defaultValue={aid}/>
                        </td>
                    </tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}} formAction={onSubmit}>Save</button>
                    </td></tr>
                    <tr><td colSpan={2} style={{textAlign: "center"}}>
                        <button style={{width: "100%"}} formAction={deleteMe}>Delete</button>
                    </td></tr>
                </tbody>
            </table>
        </Form>
    </div>
}