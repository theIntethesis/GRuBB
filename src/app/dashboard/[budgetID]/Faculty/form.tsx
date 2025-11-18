"use client"
import Form from "next/form"

const calculatePayment = () => {
    // Calculation logic here
    const rate = (document.getElementById("rate") as HTMLInputElement).valueAsNumber;
    const rateUnit = (document.getElementById("rateUnit") as HTMLSelectElement).value;
    const percentFTE = (document.getElementById("percentFTE") as HTMLInputElement).valueAsNumber;
    console.log("Rate:", rate, "Rate Unit:", rateUnit, "Percent FTE:", percentFTE);
    (document.getElementById("payment") as HTMLInputElement).value = (Number(rate) * (rateUnit === "Hour" ? 2080 : 1) * (Number(percentFTE) / 100)).toString()
}
const updateFBR = (role: string) => {
    console.log("Updating FBR role to " + role)
}
export function FacultySetupForm() {
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
                            <input type="text" placeholder="Faculty Name" style={{
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
                            <select onChange={(e) => updateFBR(e.target.value)}>
                                <option>Faculty</option>
                                <option>Staff</option>
                                <option>Post-Doc</option>
                            </select>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="rate">Rate:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="rate" name="rate" onChange={calculatePayment}/> / <select id="rateUnit" onChange={calculatePayment}><option>Hour</option><option>Year</option></select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} onChange={calculatePayment}/>%
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="payment">Payment:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="payment" name="payment" disabled={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="FBR">Fringe Benefits Rate:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
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

export function FacultyForm({name, role, semesters, rate, rateUnit, percentFTE}) {
    const onSubmit = () => {

    };
    const deleteMe = () => {
        console.log("Deleting " + name);
    };
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
                            <input type="text" style={{
                                fontSize: "20pt",
                                fontWeight: "bold",
                                textAlign: "center"
                            }} defaultValue={name}/>
                            <hr/>
                            <select>
                                {semesters.map((x, idx) => {
                                    return <option key={idx}>{x}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>
                            <select defaultValue={role} onChange={(e) => updateFBR(e.target.value)}>
                                <option>Faculty</option>
                                <option>Staff</option>
                                <option>Post-Doc</option>
                            </select>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="rate">Rate:</label>
                        </td>
                        <td className="rightside">
                            $<input type="float" id="rate" name="rate" onChange={calculatePayment} defaultValue={rate}/> / <select id="rateUnit" onChange={calculatePayment} defaultValue={rateUnit}><option>Hour</option><option>Year</option></select>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="percentFTE">Percent of Full Time Equivalent:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="percentFTE" name="percentFTE" min={0} max={100} onChange={calculatePayment} defaultValue={percentFTE * 100}/>%
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="payment">Payment:</label>
                        </td>
                        <td className="rightside">
                            $<input type="number" id="payment" name="payment" disabled={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftside">
                            <label htmlFor="FBR">Fringe Benefits Rate:</label>
                        </td>
                        <td className="rightside">
                            <input type="number" id="FBR" name="FBR" min={0} max={100} disabled={true}/>%
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